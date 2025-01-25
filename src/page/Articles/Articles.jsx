import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button, Form, Input, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line, RiGalleryFill } from "react-icons/ri";
import AddArticleModal from "./AddArticleModal";
import {
  useDeleteArticleMutation,
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../../redux/Api/articleApi";
import { imageUrl } from "../../redux/Api/baseApi";
import Loading from "../../loading/Loading";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { ArrowRight } from "lucide-react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import UpdateAuctionModal from "./UpdateAuctionModel";
import noData from "../../assets/nodata.png";
import { NoData } from "../../NoData";
const Articles = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const [form] = Form.useForm();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [singleArticle, setSingleArticle] = useState({});
  const { data: article } = useGetArticleQuery();
  const [deleteArticle] = useDeleteArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  console.log("artilce,", article);
  const handleDelete = async (id) => {
    try {
      await deleteArticle(id).unwrap();
      message.success("Article deleted successfully!");
    } catch (error) {
      message.error("Failed to delete article.");
    }
  };

  const handleEdit = (articleData) => {
    setEditModal({
      isOpen: true,
      // id: articleData._id,
    });
    setSingleArticle(articleData);
    form.setFieldsValue({
      title: articleData.title,
      categoryId: articleData.category,
    });
    setContent(articleData.description);

    const existingImages = articleData.article_images.map((img, index) => ({
      uid: `${index}`,
      name: img.split("/").pop(),
      status: "done",
      url: `${imageUrl}/${img}`,
    }));
    setFileList(existingImages);
  };

  

  const calculateDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate - createdDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? `${differenceInDays} days ago` : "Today";
  };

  if (!article || !article.data || !article.data.result) {
    return <Loading />;
  }

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "fontsize",
      "brush",
      "align",
      "|",
      "image",
      "link",
    ],
  };
 
 

  return (
    <div className="mb-7 mt-4">
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4 text-[#2F799E]">
          <button className=" -mt-3" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Articles</span>
        </h1>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#2F799E] px-3 py-2 text-white rounded"
        >
          + Add Articles
        </button>
      </div>
  
      {article?.data?.result.length === 0 ? (
        <div className="">
          <NoData></NoData>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {article?.data?.result.map((item) => {
            const imageSrc =
              item.article_images && item.article_images.length > 0
                ? `${imageUrl.replace(
                    /\/$/,
                    ""
                  )}/${item.article_images[0].replace(/^\//, "")}`
                : "default-image-path.jpg";
  
            return (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-t-3xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={imageSrc}
                    alt="Article"
                    className="w-full h-[250px] object-cover"
                    onError={(e) => (e.target.src = "default-image-path.jpg")}
                  />
                </div>
                <div className="p-4 bg-[#2F799E] -mt-1 text-white">
                  <h2 className="text-lg font-bold truncate">{item.title}</h2>
                  <div className="flex justify-between gap-2">
                    <div className="text-sm text-gray-200 mt-2 flex gap-3">
                      <span className="text-lg">
                        {calculateDaysAgo(item.createdAt)}
                      </span>
                      <Link
                        to={`/dashboard/articles/articlesDetails/${item._id}`}
                      >
                        <span className="flex gap-2 mt-[6px]">
                          Read More{" "}
                          <ArrowRight className="text-xl text-yellow-300" />
                        </span>
                      </Link>
                    </div>
                    <div className="mt-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:underline"
                      >
                        <div className="w-[36px] h-[36px] flex justify-center items-center text-white cursor-pointer">
                          <MdOutlineModeEdit />
                        </div>
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <div className="w-[36px] h-[36px] flex justify-center items-center text-white cursor-pointer">
                          <RiDeleteBin6Line />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
  
      <AddArticleModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <UpdateAuctionModal
        isModalOpen={editModal.isOpen}
        setIsModalOpen={setEditModal}
        singleArticle={singleArticle}
      ></UpdateAuctionModal>
    </div>
  );
};

export default Articles;
