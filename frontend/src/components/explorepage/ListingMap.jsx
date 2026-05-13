import { useEffect } from "react";
import styled from "styled-components";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import { NEPAL_CENTER } from "../../features/location/locationUtils";
import DetailsBtn from "../../ui/Details";

const MapWrap = styled.div`
  height: ${({ $height }) => $height || "100%"};
  min-height: ${({ $minHeight }) => $minHeight || "460px"};
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};

  .leaflet-container {
    height: 100%;
    width: 100%;
    font-family: ${({ theme }) => theme.fontBody};
  }
`;

const PopupCard = styled.div`
  min-width: 210px;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.35rem;
  }

  p {
    color: #74645c;
    margin-bottom: 0.45rem;
  }
`;

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:34px;height:34px;border-radius:999px;background:#FE6218;border:3px solid white;box-shadow:0 12px 24px rgba(254,98,24,.35);"></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const getRoomId = (room) => room.id || room._id;
const getRoomPosition = (room) => {
  const coordinates = room?.geoLocation?.coordinates;
  if (!coordinates || coordinates.length !== 2) return null;
  return [coordinates[1], coordinates[0]];
};

function BoundsReporter({ onBoundsChange }) {
  const map = useMapEvents({
    moveend() {
      const bounds = map.getBounds();
      onBoundsChange?.({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    },
  });

  useEffect(() => {
    const bounds = map.getBounds();
    onBoundsChange?.({
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
    });
  }, [map, onBoundsChange]);

  return null;
}

function Recenter({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center?.length === 2) map.setView(center, 13);
  }, [center, map]);

  return null;
}

function ListingMap({ rooms = [], center, onBoundsChange, height, minHeight }) {
  const navigate = useNavigate();
  const mapCenter = center || NEPAL_CENTER;

  return (
    <MapWrap $height={height} $minHeight={minHeight}>
      <MapContainer center={mapCenter} zoom={center ? 13 : 7} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsReporter onBoundsChange={onBoundsChange} />
        <Recenter center={center} />
        {rooms.map((room) => {
          const position = getRoomPosition(room);
          if (!position) return null;
          return (
            <Marker key={getRoomId(room)} position={position} icon={pinIcon}>
              <Popup>
                <PopupCard>
                  <h3>{room.title}</h3>
                  <p>
                    {room.structuredLocation?.localLevel || room.area},{" "}
                    {room.structuredLocation?.district || room.location}
                  </p>
                  <strong>{formatCurrency(room.price)} / month</strong>
                  <DetailsBtn onClick={() => navigate(`/room/${getRoomId(room)}`)}>
                    Details
                  </DetailsBtn>
                </PopupCard>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </MapWrap>
  );
}

export default ListingMap;
