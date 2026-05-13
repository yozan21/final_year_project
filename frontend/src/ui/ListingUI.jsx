import { motion } from "framer-motion";
import styled from "styled-components";

export const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

export const ListingCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 44px ${({ theme }) => theme.boxShadowHover};
  }
`;

export const ListingImage = styled.div`
  width: 100%;
  height: 210px;
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
  border-radius: 999px;
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
  padding: 1.1rem;
`;

export const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const ListingTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.08rem;
  font-weight: 800;
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
  display: grid;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

export const ListingPrice = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

export const ListingStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mutedText};
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${({ theme }) => theme.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  padding: 0.35rem 0.55rem;
  & svg {
    font-size: 1.3rem;
  }
`;

export const ListingActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  flex: 1 1 92px;
  padding: 0.62rem;
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
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
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
