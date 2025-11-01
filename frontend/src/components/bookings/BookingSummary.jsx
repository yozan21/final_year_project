import styled from "styled-components";

const SummaryCard = styled.aside`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  border-radius: 12px;
  padding: 1.25rem;
  height: fit-content;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const Price = styled.span`
  font-weight: 700;
`;

function BookingSummary({ room, discount = 0 }) {
  const price = room?.price || 0;
  const appliedDiscount = Math.min(Math.max(discount, 0), price);
  const total = price - appliedDiscount;

  return (
    <SummaryCard>
      <Row>
        <span>{room?.name || "Room"}</span>
        <Price>${price}</Price>
      </Row>
      <Row>
        <span>Discount</span>
        <span>-${appliedDiscount}</span>
      </Row>
      <Row>
        <strong>Total</strong>
        <strong>${total}</strong>
      </Row>
    </SummaryCard>
  );
}

export default BookingSummary;
