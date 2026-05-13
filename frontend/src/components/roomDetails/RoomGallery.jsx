import React, { useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";

const GalleryWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

const ImageRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  grid-auto-rows: 180px;
  gap: 0.75rem;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 220px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid ${({ theme }) => theme.border};

  &:first-child {
    grid-row: span 2;
  }

  &:hover {
    transform: scale(1.01);
  }
`;

const Button = styled.button`
  padding: 10px 18px;
  height: 44px;
  align-self: center;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: ${({ top }) => (top ? "12px" : "0")};
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }
`;

const PreviewImage = styled.img`
  max-width: min(900px, 92vw);
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
`;

const getPhotoSrc = (photo) => (typeof photo === "string" ? photo : photo?.url);

const RoomGallery = ({ photos }) => {
  const { openModal } = useModal();
  const [showAll, setShowAll] = useState(false);
  const visiblePhotos = showAll ? photos : photos?.slice(0, 3);

  const handleClick = (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "img") {
      const src = e.target.getAttribute("src");
      openModal(<PreviewImage src={src} />);
    }
  };
  return (
    <GalleryWrapper>
      <ImageRow onClick={handleClick}>
        {visiblePhotos?.map((photo, idx) => (
          <Image key={idx} src={getPhotoSrc(photo)} alt={`Room photo ${idx + 1}`} />
        ))}

        {!showAll && photos?.length > 3 && (
          <Button onClick={() => setShowAll(true)}>View More</Button>
        )}
      </ImageRow>

      {showAll && photos.length > 3 && (
        <Button top onClick={() => setShowAll(false)}>
          Show Less
        </Button>
      )}
    </GalleryWrapper>
  );
};

export default RoomGallery;
