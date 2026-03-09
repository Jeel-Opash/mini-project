import React from "react";
import { MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import "./viewtravelstory.css";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";
import { BASE_URL } from "../../utils/constant";

interface StoryInfo {
  _id: string;
  title: string;
  story: string;
  imageUrl: string;
  visitedLocation: string[];
  visitedDate: string;
  isFavourite: boolean;
}

type ViewTravelStoryProps = {
  storyInfo: StoryInfo | null;
  onClose: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const ViewTravelStory: React.FC<ViewTravelStoryProps> = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="action-box">
          <button className="btn-small" onClick={onEditClick}>
            <MdUpdate className="icon" />
            UPDATE STORY
          </button>

          <button className="btn-small" onClick={onDeleteClick}>
            <MdDeleteOutline className="icon" />
            Delete
          </button>

          <button className="close-btn" onClick={onClose}>
            <MdClose className="close-icon" />
          </button>
        </div>
      </div>
      <div>
        <div className="story-header">
          <h1 className="story-title">
            {storyInfo && storyInfo.title}
          </h1>

          <div className="story-date">
            <span>
              {storyInfo && moment(storyInfo.visitedDate).format("DD MMM YYYY")}
            </span>
          </div>

          <div className="story-location">
            <GrMapLocation className="location-icon" />
            {storyInfo &&
              storyInfo.visitedLocation.map((item: string, index: number) =>
                storyInfo.visitedLocation.length === index + 1 ? (
                  `${item}`
                ) : (
                  `${item}, `
                )
              )}
          </div>
        </div>
      </div>

      <img src={storyInfo ? (BASE_URL + storyInfo.imageUrl) : undefined} alt="selected" className="storyimagesurl" />
      <div className="storyinfomaion">
        <p className="stroierenedm">{storyInfo?.story}</p>
      </div>

    </div>
  );
};

export default ViewTravelStory;