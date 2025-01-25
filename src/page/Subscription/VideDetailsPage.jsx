import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleVideosQuery } from "../../redux/Api/videoApi";
import Loading from "../../loading/Loading";
import { imageUrl } from "../../redux/Api/baseApi";
import moment from "moment";

const VideoDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: videos, isLoading, isError } = useGetSingleVideosQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !videos?.data) {
    return <p>Error loading the videos. Please try again.</p>;
  }

  const {
    title,
    description,
    video,
    thumbnail_image,
    totalView,
    createdAt,
  } = videos.data;

  // Helper function to construct the full URL
  const constructUrl = (path) =>
    `${imageUrl.replace(/\/$/, "")}/${path.replace(/\\/g, "/")}`;

  const videoUrl = `${imageUrl}${video}`; 
  const thumbnailUrl = constructUrl(thumbnail_image); 

  return (
    <div>
      <h1 className="flex gap-4 mb-7 mt-4 text-[#2F799E]">
        <button className="" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Video</span>
      </h1>
      <div className="max-w-[900px] m-auto">
        <div className="relative">
          {/* Video Player */}
          <video
            src={videoUrl}
            poster={thumbnailUrl}
            className="w-full h-90 object-cover"
            controls
            autoPlay
          />
        </div>
        <h1 className="text-2xl text-[#2F799E] font-semibold mt-4">{title}</h1>
        <h1 className="text-[#636363] my-2">{description}</h1>
        <div className="flex gap-2 text-sm text-[#2F799E]">
          <p>{totalView} views</p>
          <p>{moment(createdAt).fromNow()}</p> {/* Display time in "x ago" format */}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsPage;
