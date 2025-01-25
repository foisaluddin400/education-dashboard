import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  Progress,
  Select,
  message,
} from "antd";
import { usePostVideosMutation } from "../../redux/Api/videoApi";
import { useGetCategoryQuery } from "../../redux/Api/categoryApi";
import { uploadVideoChunks } from "../../utils/uploadVideoChunks";

const AddVideoModal = ({ openAddModal, setOpenAddModal }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileListImage, setFileListImage] = useState([]);
  const [video, setVideo] = useState(null);
  const [fileListVideo, setFileListVideo] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: categories, isLoading: isCategoryLoading } =
    useGetCategoryQuery();

  const [addVideo] = usePostVideosMutation();

  const onImageChange = ({ fileList }) => {
    setFileListImage(fileList);
  };

  const onVideoChange = ({ fileList }) => {
    setFileListVideo(fileList);
  };

  const handleVideoUpload = async ({ file }) => {
    setIsUploading(true);
    setUploadProgress(0); 
    setLoading(true);

    if (file) {
      setVideo(file);
    }
    setLoading(true);
    try {
      const result = await uploadVideoChunks(file, setUploadProgress);
      console.log("result", result);
      setVideoUrl(result);
      setIsUploading(false); 
      setFileListVideo([{ originFileObj: file }]); 
    } catch (error) {
      message.error("Failed to upload video. Please try again.");
      console.error("Video upload error:", error);
    } finally {
      setLoading(false);
    }
  };
  const onFinish = async (values) => {
    if (!fileListImage.length || !videoUrl) {
      message.error("Please upload both an image and a video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.categoryId);
    formData.append("thumbnail_image", fileListImage[0].originFileObj);
    formData.append("video", videoUrl);

    try {
      const response = await addVideo(formData).unwrap();
      message.success("Video added successfully!");
      setLoading(false);
      setOpenAddModal(false);
      setFileListImage([]);
      setFileListVideo([]);
    } catch (error) {
      message.error(
        error?.data?.message || "Failed to add video. Please try again."
      );
      console.error("Error adding video:", error);
    }
    
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <h2 className="text-center font-bold mb-11">+ Add Video</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="categoryId"
            label="Category Name"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select
              placeholder="Select Category"
              loading={isCategoryLoading}
              options={categories?.data?.map((category) => ({
                value: category._id,
                label: category.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Thumbs Image"
              rules={[{ required: true, message: "Please upload an image" }]}
            >
              <Upload
                listType="picture-card"
                fileList={fileListImage}
                onChange={onImageChange}
                accept="image/*"
                maxCount={1}
              >
                {fileListImage.length < 1 && "+ Upload Image"}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Add Video"
              rules={[{ required: true, message: "Please upload a video" }]}
            >
              <Upload
                listType="picture-card"
                fileList={fileListVideo}
                onChange={onVideoChange}
                customRequest={handleVideoUpload}
                accept="video/*"
                showUploadList={false} 
                maxCount={1}
              >
                {isUploading ? (
                  <div className="flex justify-center items-center h-full">
                    <Progress
                      type="circle"
                      percent={uploadProgress}
                      status={uploadProgress === 100 ? "success" : "active"}
                    />
                  </div>
                ) : fileListVideo.length > 0 ? (
                  <video
                    src={URL.createObjectURL(fileListVideo[0].originFileObj)}
                    className="w-full h-full object-cover relative"
                    controls
                  />
                ) : (
                  "+ Upload Video"
                )}
              </Upload>
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-[#2F799E] text-white"
            >
              Save
            </Button>
            <Button
              type="danger"
              onClick={() => setOpenAddModal(false)}
              className="bg-[#D9000A] text-white"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddVideoModal;
