import provinces from "../../data/nepal/provinces.json";
import districts from "../../data/nepal/districts.json";
import localLevels from "../../data/nepal/localLevels.json";
import localLevelTypes from "../../data/nepal/localLevelTypes.json";

export const NEPAL_CENTER = [27.7103, 85.3222];
export const NEPAL_BOUNDS = {
  south: 26.347,
  north: 30.447,
  west: 80.058,
  east: 88.202,
};

const typeById = new Map(
  localLevelTypes.map((type) => [type.local_level_type_id, type.name]),
);

export function isInsideNepal(lat, lng) {
  return (
    Number(lat) >= NEPAL_BOUNDS.south &&
    Number(lat) <= NEPAL_BOUNDS.north &&
    Number(lng) >= NEPAL_BOUNDS.west &&
    Number(lng) <= NEPAL_BOUNDS.east
  );
}

export function getProvinces() {
  return provinces;
}

export function getDistricts(provinceId) {
  if (!provinceId) return [];
  return districts.filter(
    (district) => district.province_id === Number(provinceId),
  );
}

export function getLocalLevels(districtId) {
  if (!districtId) return [];
  return localLevels
    .filter((level) => level.district_id === Number(districtId))
    .map((level) => ({
      ...level,
      type: typeById.get(level.local_level_type_id) || "Local Level",
    }));
}

export function getWards() {
  return Array.from({ length: 35 }, (_, index) => index + 1);
}

export function getLocationNameByIds(value) {
  const province = provinces.find(
    (item) => item.province_id === Number(value?.provinceId),
  );
  const district = districts.find(
    (item) => item.district_id === Number(value?.districtId),
  );
  const localLevel = localLevels.find(
    (item) => item.municipality_id === Number(value?.localLevelId),
  );

  return {
    province: province?.name || "",
    district: district?.name || "",
    localLevel: localLevel?.name || "",
    localLevelType: typeById.get(localLevel?.local_level_type_id) || "",
    ward: value?.ward || "",
    addressLine: value?.addressLine || "",
  };
}

export function formatStructuredLocation(location) {
  if (!location) return "";
  return [
    location.addressLine,
    location.ward ? `Ward ${location.ward}` : "",
    location.localLevel,
    location.district,
    location.province,
  ]
    .filter(Boolean)
    .join(", ");
}
