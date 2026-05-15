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
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z"
        fill="#FE6218" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

function RoomLocationMap({ room }) {
  const lat = room?.geoLocation?.coordinates?.[1];
  const lng = room?.geoLocation?.coordinates?.[0];

  if (!lat || !lng) return null;

  return (
    <MapWrap>
      <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={true}>
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
