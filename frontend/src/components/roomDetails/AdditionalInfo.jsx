import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  background: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  color: var(--text);
  font-family: var(--font-heading, sans-serif);
  font-weight: 700;
  line-height: 1.3;
`;
const InfoList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

const InfoItem = styled.li`
  background-color: var(--surface);
  border: 1px solid #bee3f8;
  border-radius: 8px;
  padding: 1rem;
  color: var(--text);
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  transition: all 0.3s 0.2s;

  &:hover {
    border-color: #2b6cb0;
    background-color: #2b6cb0;
    color: white;
  }
`;

const AdditionalInfo = ({ additionalInfo }) => {
  if (!additionalInfo?.length)
    return (
      <Wrapper style={{ color: "var(--mutedText)" }}>
        <p>No additional information provided</p>
      </Wrapper>
    );
  return (
    <Wrapper>
      <H3>Additional Information</H3>

      <InfoList>
        {additionalInfo.map((info, i) => {
          return <InfoItem key={i}>{info}</InfoItem>;
        })}
      </InfoList>
    </Wrapper>
  );
};

export default AdditionalInfo;
