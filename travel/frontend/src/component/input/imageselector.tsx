import React, { useRef, type ChangeEvent, useEffect } from "react";
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import './imageselector.css';
import { BASE_URL } from "../../utils/constant";

interface ImageSelectorProps {
  image: File | string | null;
  setImage: (file: File | null) => void;
  handleDeleteImg: () => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  image,
  setImage,
  handleDeleteImg,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getPreviewUrl = (): string | null => {
    if (!image) return null;
    if (typeof image === "string") return BASE_URL + image;
    return URL.createObjectURL(image);
  };

  const previewUrl = getPreviewUrl();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (image && typeof image !== "string") {
      const objectUrl = URL.createObjectURL(image);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [image]);

  const handleRemoveImage = () => {
    setImage(null);
    handleDeleteImg();
  };

  return (
    <div className="image-selector">
      <input type="file" accept="image/*"  ref={inputRef} onChange={handleImageChange}
        style={{ display: "none" }}/>

      {!previewUrl ? (
        <button type="button" className="upload-btn"
          onClick={() => inputRef.current?.click()}>
          <div>
            <FaRegFileImage size={24} />
          </div>
          <p>Browse image files to upload</p>
        </button>
      ) : (
        <div className="preview-container">
          <img src={previewUrl} alt="Preview" className="preview-image" />
          <button type="button" className="remove-image-btn"
            onClick={handleRemoveImage}>
            <MdDeleteOutline size={20} />
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;