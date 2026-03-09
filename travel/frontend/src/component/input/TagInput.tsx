import React, { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import "./TagInput.css";

type TagInputProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() === "") return;
    setTags([...tags, inputValue.trim()]);
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tag-wrapper">
      {tags.length > 0 && (
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              <GrMapLocation className="location-icon" />
              {tag}
              <button
                className="remove-tag"
                onClick={() => handleRemoveTag(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="tag-input-container">
        <input
          type="text"
          value={inputValue}
          className="tag-input"
          placeholder="Add Location"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="add-button" onClick={addNewTag}>
          <MdAdd className="add-icon" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;