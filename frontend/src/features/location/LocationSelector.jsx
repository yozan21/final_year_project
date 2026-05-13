import styled from "styled-components";
import {
  getDistricts,
  getLocalLevels,
  getLocationNameByIds,
  getProvinces,
  getWards,
} from "./locationUtils";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  color: ${({ theme }) => theme.text};
  font-weight: 800;
  font-size: 0.95rem;
`;

const Select = styled.select`
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const Input = styled.input`
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

function LocationSelector({ value, onChange, compact = false, required = false }) {
  const current = value || {};
  const provinceOptions = getProvinces();
  const districtOptions = getDistricts(current.provinceId);
  const localLevelOptions = getLocalLevels(current.districtId);
  const wardOptions = getWards();

  const update = (patch) => {
    const next = { ...current, ...patch };
    onChange?.({ ...next, ...getLocationNameByIds(next) });
  };

  return (
    <Grid>
      <Field>
        Province{required ? " *" : ""}
        <Select
          value={current.provinceId || ""}
          onChange={(event) =>
            update({
              provinceId: event.target.value,
              districtId: "",
              localLevelId: "",
              ward: "",
            })
          }
          required={required}
        >
          <option value="">Select province</option>
          {provinceOptions.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        District{required ? " *" : ""}
        <Select
          value={current.districtId || ""}
          onChange={(event) =>
            update({ districtId: event.target.value, localLevelId: "", ward: "" })
          }
          disabled={!current.provinceId}
          required={required}
        >
          <option value="">Select district</option>
          {districtOptions.map((district) => (
            <option key={district.district_id} value={district.district_id}>
              {district.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        Municipality / Rural Municipality{required ? " *" : ""}
        <Select
          value={current.localLevelId || ""}
          onChange={(event) => update({ localLevelId: event.target.value, ward: "" })}
          disabled={!current.districtId}
          required={required}
        >
          <option value="">Select local level</option>
          {localLevelOptions.map((level) => (
            <option key={level.municipality_id} value={level.municipality_id}>
              {level.name} {level.type ? `(${level.type})` : ""}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        Ward{required ? " *" : ""}
        <Select
          value={current.ward || ""}
          onChange={(event) => update({ ward: event.target.value })}
          disabled={!current.localLevelId}
          required={required}
        >
          <option value="">Select ward</option>
          {wardOptions.map((ward) => (
            <option key={ward} value={ward}>
              Ward {ward}
            </option>
          ))}
        </Select>
      </Field>

      {!compact && (
        <Field style={{ gridColumn: "1 / -1" }}>
          Landmark / street detail
          <Input
            value={current.addressLine || ""}
            onChange={(event) => update({ addressLine: event.target.value })}
            placeholder="Near chowk, tole, school, hospital, or landmark"
          />
        </Field>
      )}
    </Grid>
  );
}

export default LocationSelector;
