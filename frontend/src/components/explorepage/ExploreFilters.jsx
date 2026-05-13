import { motion } from "framer-motion";
import React from "react";
import { FiRotateCcw, FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { Button } from "../../styles/buttons";
import LocationSelector from "../../features/location/LocationSelector";

const FilterBar = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 12px 28px ${({ theme }) => theme.boxShadow};
  position: sticky;
  top: 80px;

  @media (max-width: 1060px) {
    position: static;
  }
`;

const FilterTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.25rem;

  h2 {
    font-size: 1.05rem;
    font-weight: 800;
    color: ${({ theme }) => theme.text};
  }

  span {
    color: ${({ theme }) => theme.mutedText};
    font-size: 0.85rem;
    font-weight: 700;
  }
`;

const Search = styled.input`
  padding: 0.85rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 1rem;
  transition: border 0.2s;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.85rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-size: 1rem;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const SearchWrap = styled.label`
  position: relative;
  display: block;
`;

const ResetButton = styled(Button)`
  min-height: 48px;
`;

const ExploreFilters = function ({ filters, setFilters }) {
  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const resetFilters = () =>
    setFilters({
      location: "",
      type: "",
      price: "",
      amenity: "",
      provinceId: "",
      districtId: "",
      localLevelId: "",
      ward: "",
    });

  return (
    <FilterBar onSubmit={(event) => event.preventDefault()}>
      <FilterTitle>
        <h2>Refine Search</h2>
        <span>Live filters</span>
      </FilterTitle>
      <SearchWrap>
        <Search
          as={motion.input}
          id="location"
          name="location"
          placeholder="Search city or area"
          value={filters.location}
          onChange={updateFilter}
        />
      </SearchWrap>
      <LocationSelector
        compact
        value={filters}
        onChange={(location) =>
          setFilters((current) => ({ ...current, ...location }))
        }
      />
      <Select name="type" value={filters.type} onChange={updateFilter}>
        <option value="">Room Type</option>
        <option value="studio">Studio/Single room</option>
        <option value="shared">Shared room</option>
        <option value="1bk">1 BK</option>
        <option value="2bk">2 BK</option>
        <option value="1bhk">1 BHK</option>
        <option value="2bhk">2 BHK</option>
        <option value="3bhk">3 BHK</option>
      </Select>
      <Select name="price" value={filters.price} onChange={updateFilter}>
        <option value="">Any Price</option>
        <option value="cheap">Below 10,000</option>
        <option value="middle">10,000 - 15,000</option>
        <option value="luxurious">Above 15,000</option>
      </Select>
      <Select name="amenity" value={filters.amenity} onChange={updateFilter}>
        <option value="">Any Amenity</option>
        <option value="wifi">WiFi</option>
        <option value="parking">Parking</option>
        <option value="water">24/7 Water</option>
        <option value="balcony">Balcony</option>
        <option value="security">Security</option>
        <option value="furnished">Furnished</option>
        <option value="kitchen">Kitchen</option>
        <option value="power">Backup Power</option>
      </Select>
      <ResetButton type="button" variant="outline" onClick={resetFilters}>
        <FiRotateCcw /> Reset
      </ResetButton>
    </FilterBar>
  );
};

export default ExploreFilters;
