import styled from "styled-components";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const MapWrap = styled.div`
  height: 360px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:34px;height:34px;border-radius:999px;background:#FE6218;border:3px solid white;box-shadow:0 12px 24px rgba(254,98,24,.35);"></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

function RoomLocationMap({ room }) {
  const lat = room?.geoLocation?.coordinates?.[1];
  const lng = room?.geoLocation?.coordinates?.[0];

  if (!lat || !lng) return null;

  return (
    <MapWrap>
      <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={pinIcon}>
          <Popup>{room.title}</Popup>
        </Marker>
      </MapContainer>
    </MapWrap>
  );
}

export default RoomLocationMap;
