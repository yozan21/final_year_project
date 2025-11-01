import React, { useState } from "react";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";

const GalleryWrapper = styled.div`
  margin-bottom: 24px;
`;

const ImageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Image = styled.img`
  width: 270px;
  height: 260px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const Button = styled.button`
  padding: 10px 18px;
  height: 44px;
  align-self: center;
  background-color: ${({ theme }) => theme.primary || "#FF385C"};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-top: ${({ top }) => (top ? "12px" : "0")};
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover || "#e0314e"};
  }
`;

const PreviewImage = styled.img``;

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
        {visiblePhotos?.map((src, idx) => (
          <Image key={idx} src={src.url} alt={`Room photo ${idx + 1}`} />
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
