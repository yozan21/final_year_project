import React, { useState } from "react";
import styled from "styled-components";
import Lightbox from "./LightBox";

const GalleryWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

const ImageRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  grid-template-rows: 240px;
  gap: 0.75rem;

  @media (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 180px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: 220px;
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

  &:hover {
    transform: scale(1.01);
  }
`;

const MoreOverlay = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border};
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "+ ${({ $count }) => $count} more";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const getPhotoSrc = (photo) => (typeof photo === "string" ? photo : photo?.url);

const RoomGallery = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const srcs = (photos || []).map(getPhotoSrc);
  const visible = srcs.slice(0, 3);
  const remaining = srcs.length - 3;

  return (
    <GalleryWrapper>
      <ImageRow>
        {visible.map((src, idx) => {
          const isLast = idx === 2 && remaining > 0;

          if (isLast) {
            return (
              <MoreOverlay
                key={idx}
                $count={remaining}
                onClick={() => setLightboxIndex(idx)}
              >
                <img src={src} alt="more photos" />
              </MoreOverlay>
            );
          }

          return (
            <Image
              key={idx}
              src={src}
              alt={`Room photo ${idx + 1}`}
              onClick={() => setLightboxIndex(idx)}
            />
          );
        })}
      </ImageRow>

      {lightboxIndex !== null && (
        <Lightbox
          photos={srcs}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </GalleryWrapper>
  );
};

export default RoomGallery;
