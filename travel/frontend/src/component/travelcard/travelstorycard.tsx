import React from "react";
import "./travelstorycard.css";
import { FaHeart } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment";
import { BASE_URL } from "../../utils/constant";

type Props = {
  imageUrl: string;
  title: string;
  date?: string;
  story: string;
  visitedLocation: string[];
  isFavourite: boolean;
  onFavouriteClick: () => void;
  onClick: () => void;
};

export const TravelStoryCard: React.FC<Props> = ({
  imageUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="TravelStorycard">
      <img
        src={BASE_URL + imageUrl}
        alt={title}
        className="travelstorycardimg"
        onClick={onClick}
      />

      <button onClick={onFavouriteClick}>
        <FaHeart color={isFavourite ? "red" : "gray"} />
      </button>

      <div className="dattravelstorycard">
        <h6 className="storycardtitle">{title}</h6>
        <span>{date ? moment(date).format("Do MMM YYYY") : "-"}</span>
      </div>

      <p>{story?.slice(0, 60)}</p>

      <div>
        <GrMapLocation />
        {visitedLocation.map((item, index) =>
          visitedLocation.length === index + 1 ? `${item}` : `${item}, `
        )}
      </div>
    </div>
  );
};