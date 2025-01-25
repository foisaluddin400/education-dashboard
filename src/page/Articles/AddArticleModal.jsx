import { Modal, Form, Input, Button, Select, Upload, message } from "antd";
import React, { useRef, useState } from "react";
import ImgCrop from "antd-img-crop";
import { usePostArticleMutation } from "../../redux/Api/articleApi";
import { useGetCategoryQuery } from "../../redux/Api/categoryApi";
import JoditEditor from "jodit-react";

const AddArticleModal = ({ setOpenAddModal, openAddModal }) => {
  const [content, setContent] = useState(""); // Content for the article
  const [addArticle, { isLoading }] = usePostArticleMutation();
  const [fileList, setFileList] = useState([]); // FileList state for image uploads
  const { data: categories, isLoading: isCategoryLoading } = useGetCategoryQuery(); // Fetch categories
  const editor = useRef(null);
  const [form] = Form.useForm();

  const handleAddArticle = async (values) => {
    if (!content.trim()) {
      return message.error("Description content is required!");
    }

    if (fileList.length === 0) {
      return message.error("Please upload at least one image!");
    }

    const formData = new FormData();
    formData.append("category", values.categoryId);
    formData.append("title", values.title);
    formData.append("description", content);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("article_images", file.originFileObj);
      }
    });

    try {
      await addArticle(formData).unwrap();
      message.success("Article added successfully!");
      handleClose();
    } catch (error) {
      console.error("Failed to add article:", error);
      message.error("Failed to add article. Please try again.");
    }
  };

  const handleClose = () => {
    setContent(""); // Clear description content
    setFileList([]); // Clear uploaded images
    form.resetFields(); // Reset all form fields
    setOpenAddModal(false); // Close the modal
  };

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    // buttons: [
    //   "bold",
    //   "italic",
    //   "underline",
    //   "|",
    //   "font",
    //   "fontsize",
    //   "brush",
    //   "align",
    //   "|",
    //   "image",
    //   "link",
    // ],
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleClose}
      footer={null}
      width={1000}
    >
      <div className="mb-11">
        <h2 className="font-bold text-center mb-11">+ Add Article</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddArticle}
          initialValues={{ title: "", categoryId: null }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter the title!" }]}
            >
              <Input placeholder="Enter Title" className="bg-[#00000000]" />
            </Form.Item>
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
          </div>
          <div>
            <p className="font-semibold mb-2">Description</p>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <Form.Item
            label="Upload Images"
            rules={[
              {
                validator: () => {
                  if (fileList.length === 0) {
                    return Promise.reject("Please upload at least one image!");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => false} 
            >
              {fileList.length < 5 && "+ Upload"}
            </Upload>
          </Form.Item>
          <div className="w-full flex gap-3 mt-11">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full"
              style={{ background: "#2F799E", borderColor: "#2F799E" }}
            >
              Save
            </Button>
            <Button
              type="default"
              className="w-full"
              onClick={handleClose}
              style={{
                background: "#D9000A",
                color: "#fff",
                borderColor: "#D9000A",
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddArticleModal;
