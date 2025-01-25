import { Form, Input, message, Modal, Select, Upload, Button } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { useUpdateArticleMutation } from "../../redux/Api/articleApi";
import { imageUrl } from "../../redux/Api/baseApi";

const UpdateAuctionModal = ({ isModalOpen, setIsModalOpen, singleArticle }) => {
  const [fileList, setFileList] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [form] = Form.useForm();

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const onFinish = async (values) => {
    const id = singleArticle?._id;
    const data = { ...values };
  
    const existingImages = fileList
      .filter((file) => file.url)
      .map((file) => file.url.replace(imageUrl, ""));
    const newImages = fileList.filter((file) => file.originFileObj);
  
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...data,
        category: singleArticle?.category?._id, // Use ObjectId for category
        article_images: existingImages,
      })
    );
  
    newImages.forEach((file) => {
      formData.append("article_images", file.originFileObj);
    });
  
    try {
      const res = await updateArticle({ formData, id }).unwrap();
      message.success(res?.message);
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };
  

  useEffect(() => {
    if (singleArticle) {
      form.setFieldsValue({
        title: singleArticle?.title,
        description: singleArticle?.description,
        category: singleArticle?.category?.name, // Set the ObjectId
      });
  
      if (
        singleArticle.article_images &&
        singleArticle.article_images.length > 0
      ) {
        const images = singleArticle?.article_images?.map((url, index) => ({
          uid: index,
          name: `image-${index}.png`,
          status: "done",
          url: `${imageUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`,
        }));
        setFileList(images);
      }
    }
  }, [singleArticle, form]);
  

  const config = {
    readonly: false,
    placeholder: "Write description here...",
    style: { height: "20vh" },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  return (
    <Modal
      centered
      open={isModalOpen}
      footer={false}
      width={800}
      onCancel={() => {
        setIsModalOpen(false);
        if (singleArticle) {
          form.setFieldsValue({
            title: singleArticle?.title,
            description: singleArticle?.description,
            category: singleArticle?.category || undefined,
          });
        }
      }}
    >
      <h1 className="text-center font-medium text-[20px]">Update Article</h1>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <div className="flex justify-between items-center gap-2 mt-5">
          <Form.Item
            label="Title"
            name="title"
            className="w-full"
            rules={[{ required: true, message: "Please input item name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
  <Input disabled />
</Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </Form.Item>

        <Form.Item label="Upload Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            beforeUpload={() => false}
            multiple
          >
            {fileList.length >= 4 ? null : (
              <div className="flex items-center gap-2">
                <PlusOutlined />
                <div>Add Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div className="flex gap-3">
          <Form.Item className="w-full">
            <button
              type="default"
              onClick={() => {
                setIsModalOpen(false);
                if (singleArticle) {
                  form.setFieldsValue({
                    title: singleArticle?.title,
                    description: singleArticle?.description,
                    category: singleArticle?.category || undefined,
                  });
                }
              }}
              className="bg-[#d9000a] text-white w-full rounded-md py-[5px]"
            >
              Cancel
            </button>
          </Form.Item>
          <Form.Item className="w-full">
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating} // Add loading spinner
              className="w-full bg-[#2F799E] text-white "
            >
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateAuctionModal;
