import { useEffect } from "react";
import styled from "styled-components";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { NEPAL_CENTER, isInsideNepal } from "./locationUtils";

const MapWrap = styled.div`
  height: ${({ $height }) => $height || "380px"};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};

  .leaflet-container {
    height: 100%;
    width: 100%;
    font-family: ${({ theme }) => theme.fontBody};
  }
`;

const Hint = styled.p`
  margin-top: 0.7rem;
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.92rem;
  line-height: 1.5;
`;

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:34px;height:34px;border-radius:999px;background:#FE6218;border:3px solid white;box-shadow:0 12px 24px rgba(254,98,24,.35);"></div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

function ClickHandler({ onChange }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      if (!isInsideNepal(lat, lng)) return;
      onChange?.({ lat, lng });
    },
  });
  return null;
}

function Recenter({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates?.lat && coordinates?.lng) {
      map.setView(
        [coordinates.lat, coordinates.lng],
        Math.max(map.getZoom(), 14),
      );
    }
  }, [coordinates, map]);

  return null;
}

function MapPicker({ value, onChange, height }) {
  const center =
    value?.lat && value?.lng ? [value.lat, value.lng] : NEPAL_CENTER;

  return (
    <>
      <MapWrap $height={height}>
        <MapContainer
          center={center}
          zoom={value?.lat ? 14 : 7}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onChange={onChange} />
          <Recenter coordinates={value} />
          {value?.lat && value?.lng && (
            <Marker position={[value.lat, value.lng]} icon={pinIcon}>
              <Popup>Exact room location</Popup>
            </Marker>
          )}
        </MapContainer>
      </MapWrap>
      <Hint>
        Click on the map to pin the exact room location. Pins are limited to
        Nepal.
      </Hint>
    </>
  );
}

export default MapPicker;
