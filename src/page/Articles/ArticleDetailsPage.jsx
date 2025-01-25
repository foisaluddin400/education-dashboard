import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleArticleQuery } from "../../redux/Api/articleApi";
import { imageUrl } from "../../redux/Api/baseApi";
import Loading from "../../loading/Loading";

const ArticleDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: article, isLoading, isError } = useGetSingleArticleQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !article?.data) {
    return <p>Error loading the article. Please try again.</p>;
  }

  const { title, description, article_images } = article.data;

  // Helper function to construct the image URL
  const constructImageUrl = (path) =>
    `${imageUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  return (
    <div>
      <h1 onClick={() => navigate(-1)} className="flex gap-4 mb-7 mt-4 text-[#2F799E]">
        <button className="" >
          <FaArrowLeft />
        </button>
        <button className="text-lg font-semibold">Article</button>
      </h1>
      <div>
        {/* Main Section */}
        <div className=" gap-4">
          {/* First Article Image */}
          {article_images?.[0] && (
            <img
              className="w-full col-span-1 rounded-3xl"
              src={constructImageUrl(article_images[0])}
              alt="Article Thumbnail"
              onError={(e) => (e.target.src = "/path-to-placeholder.jpg")} // Fallback for broken images
            />
          )}
          <div className="col-span-2">
            <h3 className="text-xl font-bold mt-3">{title}</h3>
            {/* Render HTML Content */}
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="text-gray-700 mt-3"
            />
          </div>
        </div>

        {/* Additional Images */}
        <div className=" mt-11 gap-4">
          {article_images.slice(1).map((img, index) => (
            <img
              key={index}
              className="w-full rounded-3xl"
              src={constructImageUrl(img)}
              alt={`Article Image ${index + 2}`}
              onError={(e) => (e.target.src = "/path-to-placeholder.jpg")} // Fallback for broken images
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
