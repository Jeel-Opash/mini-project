import type React from "react"
import { Navbar } from "../../component/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../utils/axiosinstance";
import type { IUser } from "../../utils/user.types";
import { AxiosError } from "axios";
import { TravelStoryCard } from "../../component/travelcard/travelstorycard";
import Modal from "react-modal"
import { ToastContainer, toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import { AddEditTravelStory } from "../Addedittravelstory/AddEditTravelStory";
import './home.css';
import ViewTravelStory from "../viewtravelstory/viewtravelstory";


interface TravelStory {
  _id: string;
  title: string;
  story: string;
  imageUrl: string;
  visitedLocation: string[];
  visitedDate: string;
  isFavourite: boolean;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const [userinfo, setuserinfo] = useState<IUser | null>(null);
  const [allstories, setallstories] = useState<TravelStory[]>([]);
  const [openAddEditModal, setOpenAddEditModal] = useState<{
    isShown: boolean;
    type: "add" | "edit";
    data: TravelStory | null;
  }>({
    isShown: false,
    type: "add",
    data: null
  })
  const [openviewmodal, setopenviewmodal] = useState<{
    isShown: boolean;
    data: TravelStory | null;
  }>({ isShown: false, data: null })

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const getUserInfo = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/api/auth/getuser");
      if (res.data && res.data.user) {
        setuserinfo(res.data.user);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);



  const getalltravelStories = async () => {
    try {
      const res = await axiosInstance.get("/api/travel/gettravel");
      if (res.data && res.data.stories) {
        setallstories(res.data.stories);
      }
    } catch (error) {
      console.error("Error fetching travel stories:", error);
    }
  }



  const handleEdit = (data: TravelStory) => {
    setOpenAddEditModal({
      isShown: true, type: "edit", data: data
    })
  }



  const handleViewStory = (data: TravelStory) => {
    setopenviewmodal({ isShown: true, data });
  };
  const updateIsFavourite = async (storyData: TravelStory) => {
    const storyId = storyData._id;
    try {
      const res = await axiosInstance.put(
        "/api/travel/favtravel/" + storyId,
        {
          isFavourite: !storyData.isFavourite,
        }
      );
      if (res.data && res.data.story) {
        toast.success("Story Update Successful");
        if (isSearch) {
          handleSearch(searchQuery);
        } else {
          getalltravelStories();
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  }

  const deleteTravelStory = async (data: TravelStory) => {
    const storyId = data._id;
    try {
      const res = await axiosInstance.delete("/api/travel/deletetravel/" + storyId);
      if (res.data && res.data.success) {
        toast.error("Story Deleted Successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        setopenviewmodal({ isShown: false, data: null });
        getalltravelStories();
      }
    } catch (error) {
      console.error("Error deleting travel story:", error);
    }
  }

  const handleSearch = async (query: string) => {
    if (!query) return;
    try {
      const res = await axiosInstance.get("/api/travel/search", {
        params: { query }
      });
      if (res.data && res.data.stories) {
        setIsSearch(true);
        setallstories(res.data.stories);
      }
    } catch (error) {
      console.error("Error searching travel stories:", error);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    setIsSearch(false);
    getalltravelStories();
  }


  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      await getUserInfo();
      await getalltravelStories();
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [getUserInfo])

  return (
    <>
      <Navbar
        userinfo={userinfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => handleSearch(searchQuery)}
        onClearSearch={onClearSearch}
      />

      <div>
        <div>
          {allstories.length > 0 ? (
            <div className="forstories">
              {allstories.map((item) => {
                return (
                  <TravelStoryCard key={item._id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}

                    onClick={() => handleViewStory(item)}
                    onFavouriteClick={() => updateIsFavourite(item)} />
                )
              })}
            </div>
          ) : (
            <>Empty Card here</>
          )}
        </div>
      </div>

      {/* //addeditTravel */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root") || undefined}
        className="model-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data || undefined}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTravelStories={getalltravelStories}
        />
      </Modal>



      <Modal
        isOpen={openviewmodal.isShown}
        onRequestClose={() => setopenviewmodal({ isShown: false, data: null })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root") || undefined}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openviewmodal.data || null}
          onClose={() => {
            setopenviewmodal((prevState) => ({ ...prevState, isShown: false }));
          }}
          onEditClick={() => {
            setopenviewmodal((prevState) => ({ ...prevState, isShown: false }));
            if (openviewmodal.data) handleEdit(openviewmodal.data);
          }}
          onDeleteClick={() => {
            if (openviewmodal.data) deleteTravelStory(openviewmodal.data);
          }}
        />
      </Modal>

      <button className="buttonforMD" onClick={() => setOpenAddEditModal({
        isShown: true,
        type: "add", data: null
      })}><MdAdd /> </button>
      <ToastContainer />
    </>
  )
}
