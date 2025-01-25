import { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button, message, Progress } from "antd";
import { imageUrl } from "../../redux/Api/baseApi";
import toast from "react-hot-toast";
import { useUpdateVideosMutation } from "../../redux/Api/videoApi";
import { uploadVideoChunks } from "../../utils/uploadVideoChunks";

const UpdateVideoModal = ({ isModalOpen, setEditModal, video }) => {
  const [form] = Form.useForm();
  const [fileListImage, setFileListImage] = useState([]);
  const [fileListVideo, setFileListVideo] = useState([]);
  const [updateVideo] = useUpdateVideosMutation();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (video) {
      const {
        title,
        description,
        category,
        thumbnail_image,
        video: videoPath,
      } = video;

      // Set default form values
      form.setFieldsValue({
        title,
        description,
        category: category?._id, // Set the ObjectId in the hidden input
      });

      if (thumbnail_image) {
        setFileListImage([
          {
            uid: "-1",
            name: "thumbnail",
            status: "done",
            url: `${imageUrl}/${thumbnail_image}`,
          },
        ]);
      }

      if (videoPath) {
        setFileListVideo([
          {
            uid: "-2",
            name: "video",
            status: "done",
            url: `${imageUrl}/${videoPath}`,
          },
        ]);
        setVideoUrl(videoPath); // Only store the video path, not the full URL
      }
    }
  }, [video, form]);
  

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
    try {
      const result = await uploadVideoChunks(file, setUploadProgress);
      console.log(result);
      setVideoUrl(result); // Save only the video path (result should be the relative path)
      setIsUploading(false);
      setFileListVideo([{ originFileObj: file }]);
    } catch (error) {
      message.error("Failed to upload video. Please try again.");
      console.error("Video upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
     // This should now be the ObjectId
  
    if (fileListImage[0]?.originFileObj) {
      formData.append("thumbnail_image", fileListImage[0].originFileObj);
    }
  
    if (videoUrl) {
      formData.append("video", videoUrl); // Only append the relative video path
    }
  
    setLoading(true);
    try {
      await updateVideo({ id: video._id, formData }).unwrap();
      message.success("Video updated successfully!");
      setEditModal({ isOpen: false, id: null });
    } catch (error) {
      message.error("Failed to update the video.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      open={isModalOpen}
      onCancel={() => setEditModal({ isOpen: false, id: null })}
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <h2 className="text-center font-bold mb-11">Update Video</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item label="Category">
  <Input value={video?.category?.name} disabled />
</Form.Item>

<Form.Item name="category" hidden>
  <Input value={video?.category?._id} />
</Form.Item>
          <div className="grid grid-cols-2 gap-4">
            {/* Thumbnail Image */}
            <Form.Item label="Thumbnail Image">
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

            {/* Video File */}
            <Form.Item label="Video File">
              <Upload
                listType="picture-card"
                fileList={fileListVideo}
                onChange={onVideoChange}
                customRequest={handleVideoUpload}
                accept="video/*"
                maxCount={1}
                showUploadList={false} // Hide the default upload list
              >
                {isUploading ? (
                  <div className="flex justify-center items-center">
                    <Progress
                      type="circle"
                      percent={uploadProgress}
                      status={uploadProgress === 100 ? "success" : "active"}
                    />
                  </div>
                ) : fileListVideo.length > 0 || videoUrl ? (
                  <div className="relative">
                    <video
                      src={
                        videoUrl.startsWith("http")
                          ? videoUrl
                          : `${imageUrl}${videoUrl}`
                      }
                      className="w-full h-40 object-cover"
                      controls
                      autoPlay
                    />
                    <Button
                      className="absolute top-2 right-2 bg-red-600 text-white"
                      size="small"
                      onClick={() => {
                        setFileListVideo([]);
                        setVideoUrl("");
                      }}
                    >
                      Delete
                    </Button>
                  </div>
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
              className="bg-[#2F799E] text-white w-full"
              loading={loading}
            >
              Save
            </Button>
            <Button
              type="danger"
              onClick={() => setEditModal({ isOpen: false, id: null })}
              className="bg-[#D9000A] text-white w-full"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateVideoModal;
