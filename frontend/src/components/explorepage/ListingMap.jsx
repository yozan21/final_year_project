import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
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

  img {
    width: 100%;
    height: 110px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 0.5rem;
  }

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
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z"
        fill="#FE6218" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `,
  iconSize: [32, 40],
  iconAnchor: [16, 40], // tip of the pin
  popupAnchor: [0, -40],
});

const userLocationIcon = L.divIcon({
  className: "",
  html: `
    <div style="position:relative; width:18px; height:18px;">
      <div id="user-pulse" style="
        position: absolute; inset: -6px; border-radius: 50%;
        background: rgba(254, 98, 24, 0.25);
        animation: pulse 1.4s ease-out 4;
      "></div>
      <div style="
        width: 18px; height: 18px; border-radius: 50%;
        background: #FE6218; border: 3px solid white;
        box-shadow: 0 2px 12px rgba(254,98,24,0.45);
        position: relative; z-index: 1;
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(2.8); opacity: 0; }
      }
    </style>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
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
      const pad = 0.3; // ~30% buffer outside viewport
      onBoundsChange?.({
        north: bounds.getNorth() + pad,
        south: bounds.getSouth() - pad,
        east: bounds.getEast() + pad,
        west: bounds.getWest() - pad,
      });
    },
  });

  useEffect(() => {
    const bounds = map.getBounds();
    const pad = 0.3; // ~30% buffer outside viewport
    onBoundsChange?.({
      north: bounds.getNorth() + pad,
      south: bounds.getSouth() - pad,
      east: bounds.getEast() + pad,
      west: bounds.getWest() - pad,
    });
  }, [map, onBoundsChange]);

  return null;
}

function Recenter({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center?.length === 2) map.setView(center, 10);
  }, [center, map]);

  return null;
}

function ListingMap({
  rooms = [],
  center,
  onBoundsChange,
  height,
  minHeight,
  userLocation,
}) {
  const navigate = useNavigate();
  const mapCenter = center || NEPAL_CENTER;

  const [visibleRooms, setVisibleRooms] = useState([]);

  useEffect(() => {
    if (rooms?.length) setVisibleRooms(rooms); // only replace when new data arrives
  }, [rooms]);
  // console.log(mapCenter);

  return (
    <MapWrap $height={height} $minHeight={minHeight}>
      <MapContainer center={mapCenter} zoom={center ? 13 : 7} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsReporter onBoundsChange={onBoundsChange} />
        <Recenter center={center} />
        {visibleRooms.map((room) => {
          const position = getRoomPosition(room);
          if (!position) return null;
          console.log(position);
          return (
            <Marker key={getRoomId(room)} position={position} icon={pinIcon}>
              <Popup>
                <PopupCard>
                  {room.thumbnail?.url && (
                    <img src={room.thumbnail.url} alt={room.title} />
                  )}
                  <h3>{room.title}</h3>
                  <p>
                    {room.structuredLocation?.localLevel || room.area},{" "}
                    {room.structuredLocation?.district || room.location}
                  </p>
                  <strong>{formatCurrency(room.price)} / month</strong>
                  <DetailsBtn
                    onClick={() => navigate(`/room/${getRoomId(room)}`)}
                  >
                    Details
                  </DetailsBtn>
                </PopupCard>
              </Popup>
            </Marker>
          );
        })}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}></Marker>
        )}
      </MapContainer>
    </MapWrap>
  );
}

export default ListingMap;
