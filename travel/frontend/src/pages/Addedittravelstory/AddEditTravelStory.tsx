import React, { useState } from "react";
import './AddEditTravelStory.css';
import { MdAdd, MdClose, MdUpdate } from "react-icons/md";
import ImageSelector from "../../component/input/imageselector";
import DateSelector from "../../component/cards/DateSelector";
import TagInput from "../../component/input/TagInput";
import axiosInstance from "../../utils/axiosinstance";
import moment from "moment";
import { toast } from "react-toastify";

interface StoryInfo {
  _id: string;
  title: string;
  story: string;
  imageUrl: string;
  visitedLocation: string[];
  visitedDate: string;
}

interface AddEditTravelStoryProps {
  storyInfo?: StoryInfo;
  type: "add" | "edit";
  onClose: () => void;
  getAllTravelStories: () => void;
}

export const AddEditTravelStory: React.FC<AddEditTravelStoryProps> = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {

  const [title, settitle] = useState<string>(storyInfo?.title || "");
  const [storyimg, setstoryimg] = useState<File | string | null>(storyInfo?.imageUrl || null);
  const [story, setstory] = useState<string>(storyInfo?.story || "");
  const [visitlocation, setvisitlocation] = useState<string[]>(storyInfo?.visitedLocation || []);
  const [visitedate, setvisitdate] = useState<Date | null>(storyInfo?.visitedDate ? new Date(storyInfo.visitedDate) : null);
  const [error, seterror] = useState<string>("");

  const handleDeleteImg = async () => {
    setstoryimg(null);
  }

  const addnewTravelStory = async () => {
    try {
      let imageUrl = "";
      if (storyimg && typeof storyimg !== 'string') {
        const formData = new FormData();
        formData.append('image', storyimg);
        const response = await axiosInstance.post('/api/images/upload', formData);
        imageUrl = response.data.imageUrl;
      }

      const response = await axiosInstance.post('/api/travel/addtravel', {
        title,
        story,
        imageUrl,
        visitedLocation: visitlocation,
        visitedDate: visitedate ? moment(visitedate).valueOf() : moment().valueOf(),
      });

      if (response.data) {
        toast.success("Story added successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        seterror(axiosError.response?.data?.message || "An unexpected error occurred");
      } else {
        seterror("An unexpected error occurred");
      }
    }
  }

  const updateTravelStory = async () => {
    try {
      let imageUrl = storyimg;
      if (storyimg && typeof storyimg !== 'string') {
        const formData = new FormData();
        formData.append('image', storyimg);
        const response = await axiosInstance.post('/api/images/upload', formData);
        imageUrl = response.data.imageUrl;
      }

      const response = await axiosInstance.patch(`/api/travel/edittravel/${storyInfo?._id}`, {
        title,
        story,
        imageUrl,
        visitedLocation: visitlocation,
        visitedDate: visitedate ? moment(visitedate).valueOf() : moment().valueOf(),
      });

      if (response.data) {
        toast.success("Story updated successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        seterror(axiosError.response?.data?.message || "An unexpected error occurred");
      } else {
        seterror("An unexpected error occurred");
      }
    }
  }



  const handleAddUpdateClick = () => {
    if (!title) {
      seterror("Please enter the title");
      return;
    }
    if (!story) {
      seterror("Please enter the story");
      return
    }
    seterror("");
    if (type === "edit") {
      updateTravelStory();
    } else {
      addnewTravelStory();
    }
  }


  const handleDeleteStoryImg = async () => {
    if (!storyInfo) return;
    
    try {
      const deleteImgRes = await axiosInstance.delete("/api/images/delete", {
        data: {
          imageUrl: storyInfo.imageUrl,
        },
      });

      if (deleteImgRes.data) {
        const storyId = storyInfo._id;

        const postData = {
          title,
          story,
          visitlocation,
          visitedDate: visitedate ? moment(visitedate).valueOf() : moment().valueOf(),
          imageUrl: "",
        };

        const response = await axiosInstance.patch("/api/travel/edittravel/" + storyId, postData);

        if (response.data) {
          setstoryimg(null);
          toast.success("Image deleted successfully");
          getAllTravelStories();
        }
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      seterror("Failed to delete image");
    }
  };

  return (
    <div className="add-edit-story-container">
      <div className="add-edit-header">
        <h5 className="modal-title">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div className="header-actions">
          {type === 'add' ? (<button className="btn-primary-small" onClick={handleAddUpdateClick}>
            <MdAdd />Add Story
          </button>) :
            (
              <>
                <button className="updatestory" onClick={handleAddUpdateClick}>
                  <MdUpdate />Update Story
                </button>

              </>
            )}

          <button className="close-btn" onClick={onClose}>
            <MdClose />
          </button>
        </div>
        {error && (
          <p className="erroreditadd">{error}</p>
        )}
      </div>


      <div>
        <div className="labelforaddeditstorydata">
          <label className="input-label">Title</label>
          <input type="text" className="inputtitle" placeholder="Input title"
            value={title} onChange={({ target }) => settitle(target.value)} />
          <div className="dateselecter">
            <DateSelector date={visitedate} setDate={setvisitdate} />
          </div>
          <ImageSelector image={storyimg} setImage={setstoryimg}
            handleDeleteImg={type === "edit" ? handleDeleteStoryImg : handleDeleteImg} />
          {error && <p className="error-message">{error}</p>}
          <div className="story-input-container">
            <label className="inputlabel">Story</label>
            <textarea className="story-textarea" placeholder="Your Story" rows={10}
              value={story}
              onChange={({ target }) => setstory(target.value)} />
          </div>
          <div>
            <label htmlFor="">Visited Location</label>
            <TagInput tags={visitlocation} setTags={setvisitlocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

