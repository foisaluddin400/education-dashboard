import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddVideoModal from "./AddVideoModal";
import UpdateVideoModal from "./UpdateVideoModal";
import { useDeleteVideosMutation, useGetSingleVideosQuery, useGetVideosQuery } from "../../redux/Api/videoApi";
import moment from "moment";
import { imageUrl } from "../../redux/Api/baseApi";
import Loading from "../../loading/Loading";
import toast from "react-hot-toast";
import { NoData } from "../../NoData";
import { message } from "antd";

const Videos = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();
  const { data: videoData, isLoading } = useGetVideosQuery();
  const videos = videoData?.data?.result || [];
const [deletVideo] =  useDeleteVideosMutation();

const {data:singleVideo} = useGetSingleVideosQuery();

const handleDelete = async (id) => {
  console.log(id)
  try {
    await deletVideo(id).unwrap();
    message.success("Video deleted successfully!");
  } catch (error) {
    message.error("Video to delete article.");
  }
};

const handleEdit = (video) => {
  console.log(video)
  setEditModal({
    isOpen: true,
    video, 
  });
};

return (
  <div className="mb-7 mt-4">
    <div className="flex justify-between mb-7 mt-4">
      <h1 className="flex gap-4 text-[#2F799E]">
        <button className="-mt-3" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Videos</span>
      </h1>
      <button
        onClick={() => setOpenAddModal(true)}
        className="bg-[#2F799E] px-3 py-2 text-white rounded"
      >
        + Add Video
      </button>
    </div>

    {isLoading ? (
      <Loading />
    ) : videos.length === 0 ? (
      <div className="">
        <NoData></NoData>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white shadow-md rounded-t-3xl overflow-hidden"
          >
            <Link to={`/dashboard/videos/videodetails/${video._id}`}>
              <div className="relative">
                <img
                  src={`${imageUrl}/${video.thumbnail_image}`}
                  alt={video.title}
                  className="w-full h-[300px] object-cover"
                />
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-5.197-3.482a1 1 0 00-1.555.832v6.964a1 1 0 001.555.832l5.197-3.482a1 1 0 000-1.664z"
                    />
                  </svg>
                </button>
              </div>
            </Link>
            <div className="p-4 bg-[#2F799E] text-white -mt-1">
              <Link to={`/dashboard/videos/videodetails/${video._id}`}>
                <h2 className="text-lg font-bold truncate">{video.title}</h2>
                <p className="text-sm text-gray-200 truncate">
                  {video.description}
                </p>
              </Link>
              <div className="flex justify-between gap-2">
                <div className="text-sm text-gray-200 mt-3 flex gap-2">
                  <span>{video.totalView} views</span>
                  <span>{moment(video.createdAt).fromNow()}</span>
                </div>
                <div className="flex gap-2">
                  <button>
                    <div
                      onClick={() => handleEdit(video)}
                      className="w-[36px] h-[36px] text-lg flex justify-center items-center text-white cursor-pointer"
                    >
                      <MdOutlineModeEdit />
                    </div>
                  </button>
                  <button>
                    <div
                      onClick={() => handleDelete(video._id)}
                      className="w-[36px] h-[36px] text-lg flex justify-center items-center text-white cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <AddVideoModal
      openAddModal={openAddModal}
      setOpenAddModal={setOpenAddModal}
    />
    <UpdateVideoModal
      isModalOpen={editModal.isOpen}
      setEditModal={setEditModal}
      video={editModal.video}
    />
  </div>
);

};

export default Videos;
