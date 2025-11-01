import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { Button } from "../../styles/buttons";

const FilterBar = styled.form`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Search = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  border: 1.5px solid var(--mutedText);
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
  padding: 0.6rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--mutedText);
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const ExploreFilters = function () {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onsubmit = (data) => {
    console.log(data);
  };
  return (
    <FilterBar onSubmit={handleSubmit(onsubmit)}>
      <Search
        as={motion.input}
        whileFocus={{
          width: "250px",
        }}
        id="location"
        placeholder="🔍 Search rooms in a city..."
        {...register("location")}
      />
      <Select defaultValue="" {...register("ratings")}>
        <option value="">Room Type</option>
        <option value="">Select room type</option>
        <option value="studio">Studio/Single room</option>
        <option value="shared">Shared room</option>
        <option value="1bk">1 BK</option>
        <option value="2bk">2 BK</option>
        <option value="1bhk">1 BHK</option>
        <option value="2bhk">2 BHK</option>
        <option value="3bhk">3 BHK</option>
      </Select>
      <Select defaultValue="" {...register("price")}>
        <option value="">Any Price</option>
        <option value="cheap">Below 10,000</option>
        <option value="middle">10,000 - 15,000</option>
        <option value="luxurious">Above 15,000</option>
      </Select>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Searching..." : "Search"}
      </Button>
    </FilterBar>
  );
};

export default ExploreFilters;
