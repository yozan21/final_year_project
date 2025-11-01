import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { FiUpload, FiX } from "react-icons/fi";
import {
  AmenitiesGrid,
  AmenityItem,
  Button,
  CustomAmenities,
  CustomAmenitiesGrid,
  CustomItem,
  ErrorMessage,
  Form,
  FormActions,
  FormGrid,
  FormGroup,
  FormSection,
  ImagePreview,
  ImagePreviewGrid,
  ImagePreviewImg,
  ImageUploadSection,
  Input,
  Label,
  RemoveImageButton,
  SectionTitle,
  Select,
  TextArea,
  UploadHint,
  UploadIcon,
  UploadText,
} from "../../ui/RoomForm";
import { useCreateRoom } from "./useCreateRoom";
import SpinnerMini from "../../ui/SpinnerMini";

const CreateRoomContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.1rem;
  margin: 0;
`;

const amenities = [
  "WiFi",
  "Kitchen",
  "Washing Machine",
  "Air Conditioning",
  "Heating",
  "TV",
  "Balcony",
  "Parking",
  "Gym",
  "Pool",
  "Garden",
  "Pet Friendly",
  "Furnished",
  "Security System",
  "Attached Bathrooms",
  "Seperate Bathroom",
];

const CreateRoom = () => {
  const [uploadedThumbnail, setUploadedThumbnail] = useState({
    id: null,
    file: null,
    preview: null,
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isOpenCustomAdder, setIsOpenCustomAdder] = useState(false);
  const [customTempAmenities, setCustomTempAmenities] = useState("");
  const [customAmenities, setCustomAmenities] = useState([]);

  const { createRoom, isPending } = useCreateRoom();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (
      event.target.id === "thumbnail-upload" &&
      !uploadedThumbnail?.file &&
      files?.[0]
    ) {
      const newThumbnail = {
        file: files[0],
        preview: URL.createObjectURL(files[0]),
      };
      console.log(newThumbnail);
      setUploadedThumbnail(newThumbnail);
      setValue("thumbnail", files[0], { shouldValidate: true });
    } else if (event.target.id === "image-upload" && files.length > 0) {
      const newImages = files.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
      }));
      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      setValue("images", updatedImages, { shouldValidate: true });
    }

    event.target.value = "";
  };

  const removeThumbnail = () => {
    setUploadedThumbnail((img) => {
      if (img.preview) URL.revokeObjectURL(img.preview);
      return {
        id: null,
        file: null,
        preview: null,
      };
    });
    setValue("thumbnail", null, { shouldValidate: true });
  };

  const removeImage = (imageId) => {
    const updated = uploadedImages.filter((img) => img.id !== imageId);
    const imageToRemove = uploadedImages.find((img) => img.id === imageId);
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setUploadedImages(updated);

    setValue("images", updated, { shouldValidate: true });
  };

  const handleAddAmenities = (e) => {
    const customAmini = customTempAmenities.trim().split(",");
    setCustomAmenities((prev) => [...prev, ...customAmini]);

    e.target.previousElementSibling.value = "";
  };

  const handleRemove = (e) => {
    const item = e.target.closest("span").textContent;
    console.log(item);
    setCustomAmenities((prev) => prev.filter((el) => el !== item));
  };

  const onSubmit = (data) => {
    // Convert to FormData
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("location", data.location);
    formData.append("area", data.area);
    formData.append("price", data.price);
    formData.append("type", data.type);
    formData.append("description", data.description);

    if (data.additionaInfo) {
      data.additionalInfo
        .split(",")
        .map((info) => formData.append("additionalInfo", info.trim()));
    }
    data.amenities.map((amenity) =>
      formData.append("amenities", amenity.trim())
    );
    customAmenities.map((amenity) =>
      formData.append("amenities", amenity.trim())
    );
    // Append thumbnail (if it's a File object)
    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }

    // Append images
    data.images.forEach((img) => {
      if (img.file instanceof File) {
        formData.append(`images`, img.file);
      }
    });

    console.log(formData);

    createRoom(formData);
  };

  useEffect(() => {
    register("thumbnail", {
      required: "Thumbnail is required!",
    });
    register("images", {
      validate: (value) =>
        value && value.length > 0 ? true : "At least one image is required",
    });
  }, [register]);

  return (
    <CreateRoomContainer>
      <FormHeader>
        <FormTitle>Create New Room Listing</FormTitle>
        <FormSubtitle>
          Add a new property to your portfolio and start attracting tenants.
        </FormSubtitle>
      </FormHeader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Room Title *</Label>
                <Input
                  {...register("title", { required: "Room title is required" })}
                  placeholder="e.g., Cozy Studio in Downtown"
                  hasError={!!errors.title}
                  disabled={isPending}
                />
                {errors.title && (
                  <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Location *</Label>
                <Input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="e.g., Kathmandu, Pokhara"
                  hasError={!!errors.location}
                  disabled={isPending}
                />
                {errors.location && (
                  <ErrorMessage>{errors.location.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Area *</Label>
                <Input
                  {...register("area", { required: "Area is required" })}
                  placeholder="e.g., Thamel, Lakeside"
                  hasError={!!errors.area}
                  disabled={isPending}
                />
                {errors.area && (
                  <ErrorMessage>{errors.area.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Price per Month (Rs)*</Label>
                <Input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                  placeholder="Rs 1200"
                  hasError={!!errors.price}
                  disabled={isPending}
                />
                {errors.price && (
                  <ErrorMessage>{errors.price.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Room Type *</Label>
                <Select
                  {...register("type", { required: "Room type is required" })}
                  hasError={!!errors.roomType}
                  disabled={isPending}
                >
                  <option value="">Select room type</option>
                  <option value="studio">Studio/Single room</option>
                  <option value="shared">Shared room</option>
                  <option value="1bk">1 Bedroom and Kitchen</option>
                  <option value="2bk">2 Bedrooms and Kitchen</option>
                  <option value="1bhk">1 Bedroom, Hall and Kitchen</option>
                  <option value="2bhk">2 Bedrooms, Hall and Kitchen</option>
                  <option value="3bhk">3 Bedrooms, Hall and Kitchen</option>
                </Select>
                {errors.roomType && (
                  <ErrorMessage>{errors.roomType.message}</ErrorMessage>
                )}
              </FormGroup>
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>Description</SectionTitle>
            <FormGroup>
              <Label>Detailed Description *</Label>
              <TextArea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters",
                  },
                })}
                placeholder="Describe your room, its features, and what makes it special..."
                hasError={!!errors.description}
                disabled={isPending}
              />
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Amenities</SectionTitle>
            <AmenitiesGrid>
              {amenities.map((amenity) => (
                <AmenityItem key={amenity}>
                  <input
                    type="checkbox"
                    value={amenity}
                    {...register("amenities")}
                  />
                  {amenity}
                </AmenityItem>
              ))}
            </AmenitiesGrid>
            <CustomAmenities>
              {customAmenities.length > 0 && (
                <CustomAmenitiesGrid>
                  {customAmenities.map((cust) => (
                    <CustomItem key={cust}>
                      {cust}
                      <button
                        type="button"
                        className="btn"
                        onClick={handleRemove}
                      >
                        <FiX />
                      </button>
                    </CustomItem>
                  ))}
                </CustomAmenitiesGrid>
              )}
              <Button
                style={{ alignSelf: "flex-start" }}
                type="button"
                className="secondary"
                onClick={() => setIsOpenCustomAdder((tog) => !tog)}
              >
                {isOpenCustomAdder ? "Cancel" : "+ Add Custom Amenities"}
              </Button>

              {isOpenCustomAdder && (
                <div style={{ display: "flex", gap: 8 }}>
                  <Input
                    style={{ width: 550 }}
                    type="text"
                    placeholder="Add amentites by comma seperated. e.g. private balcony, backup power"
                    onChange={(e) => {
                      setCustomTempAmenities(e.target.value);
                    }}
                  />
                  <Button
                    type="button"
                    className="primary"
                    onClick={handleAddAmenities}
                  >
                    Add
                  </Button>
                </div>
              )}
            </CustomAmenities>
          </FormSection>

          <FormSection>
            <SectionTitle>Thumbnail *</SectionTitle>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="thumbnail-upload"
            />
            <label htmlFor="thumbnail-upload">
              <ImageUploadSection
                hasError={!!errors.thumbnail}
                disabled={isPending}
              >
                <UploadIcon>
                  <FiUpload />
                </UploadIcon>
                <UploadText>Click to upload image or drag and drop</UploadText>
                <UploadHint>PNG, JPG up to 10MB</UploadHint>
              </ImageUploadSection>
            </label>
            {uploadedThumbnail?.file && (
              <ImagePreviewGrid>
                <ImagePreview>
                  <ImagePreviewImg
                    src={uploadedThumbnail.preview}
                    alt="Preview"
                  />
                  <RemoveImageButton onClick={removeThumbnail}>
                    <FiX />
                  </RemoveImageButton>
                </ImagePreview>
              </ImagePreviewGrid>
            )}
            {errors.thumbnail && (
              <ErrorMessage>{errors.thumbnail.message}</ErrorMessage>
            )}
          </FormSection>

          <FormSection>
            <SectionTitle>Listing Images</SectionTitle>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <ImageUploadSection
                hasError={!!errors.images}
                disabled={isPending}
              >
                <UploadIcon>
                  <FiUpload />
                </UploadIcon>
                <UploadText>Click to upload images or drag and drop</UploadText>
                <UploadHint>PNG, JPG up to 10MB each</UploadHint>
              </ImageUploadSection>
            </label>

            {uploadedImages.length > 0 && (
              <ImagePreviewGrid>
                {uploadedImages.map((image) => (
                  <ImagePreview key={image.id}>
                    <ImagePreviewImg src={image.preview} alt="Preview" />
                    <RemoveImageButton onClick={() => removeImage(image.id)}>
                      <FiX />
                    </RemoveImageButton>
                  </ImagePreview>
                ))}
              </ImagePreviewGrid>
            )}
            {errors.images && (
              <ErrorMessage>{errors.images.message}</ErrorMessage>
            )}
          </FormSection>

          <FormSection>
            <SectionTitle>Additional Info</SectionTitle>
            <FormGroup>
              <Label>Additonal Information (optional)</Label>
              <TextArea
                {...register("additionalInfo")}
                placeholder="Additional info about your listing like nearest hospital, school, highway, park etc. Add infos in comma seperated format..."
                hasError={!!errors.additionalInfo}
                disabled={isPending}
              />
              {errors.additionaInfo && (
                <ErrorMessage>{errors.additionalInfo.message}</ErrorMessage>
              )}
            </FormGroup>
          </FormSection>

          <FormActions>
            <Button
              type="button"
              className="secondary"
              onClick={() => {
                reset();
                setUploadedImages([]);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="primary" disabled={isPending}>
              {isPending ? <SpinnerMini /> : "Create Room"}
            </Button>
          </FormActions>
        </fieldset>
      </Form>
    </CreateRoomContainer>
  );
};

export default CreateRoom;
