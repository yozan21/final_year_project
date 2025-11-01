import { motion } from "framer-motion";
import styled from "styled-components";

export const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

export const ListingCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const ListingImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}20,
      ${({ theme }) => theme.accent}20
    ),
    url(${({ img }) => img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  font-size: 3rem;
  position: relative;
  & img {
    height: 100%;
    width: 100%;
  }
`;

export const StatusBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;

  &.active {
    background: rgba(22, 163, 74, 0.75);
    color: white;
  }
  &.inactive {
    background: rgba(107, 114, 128, 0.75);
    color: white;
  }
  &.booked {
    background: rgba(123, 97, 255, 0.75);
    color: white;
  }
  &.pending {
    background: rgba(245, 159, 11, 0.75);
    color: white;
  }
  &.book-pending {
    background: rgba(59, 131, 246, 0.75);
    color: white;
  }
  &.rejected {
    background: rgba(239, 68, 68, 0.75);
    color: white;
  }
`;

export const ListingContent = styled.div`
  padding: 1.5rem;
`;

export const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const ListingTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
  flex: 1;
`;

export const ListingLocation = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const ListingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ListingPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

export const ListingStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mutedText};
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  & svg {
    font-size: 1.3rem;
  }
`;

export const ListingActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  transition: all 0.3s;

  &.view {
    background: ${({ theme }) => `${theme.primary}20`};
    color: ${({ theme }) => theme.primary};

    &:hover {
      background: ${({ theme }) => theme.primary};
      color: white;
    }
  }

  &.edit {
    background: ${({ theme }) => `${theme.accent}20`};
    color: ${({ theme }) => theme.accent};

    &:hover {
      background: ${({ theme }) => theme.accent};
      color: white;
    }
  }

  &.chActive {
    background: #22a82239;
    color: #22a822;

    &:hover {
      background: #22a822;
      color: white;
    }
  }

  &.delete {
    background: ${({ theme }) => `${theme.danger}20`};
    color: ${({ theme }) => theme.danger};

    &:hover {
      background: ${({ theme }) => theme.danger};
      color: white;
    }
  }
`;

export const EmptyState = styled.div`
  grid-column: 1/-1;
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.mutedText};
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

export const EmptyText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;
