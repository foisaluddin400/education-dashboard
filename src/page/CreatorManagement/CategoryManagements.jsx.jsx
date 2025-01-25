import React, { useState } from "react";
import { Table, Button, Modal, Input, Upload, message, Spin } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../redux/Api/baseApi";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  usePostCategoryMutation,
} from "../../redux/Api/categoryApi";

const CategoryManagements = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for buttons

  const {
    data: categoriesData,
    isLoading,
    error,
    refetch: refetchCategories,
  } = useGetCategoryQuery();
  console.log(categoriesData)
  const [addCategory] = usePostCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const navigate = useNavigate();

  const handleAddCategory = async () => {
    if (!newCategory || fileList.length === 0) {
      message.error("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory);
    formData.append("category_image", fileList[0].originFileObj);

    setLoading(true);
    try {
      const res = await addCategory(formData).unwrap();
      message.success(res?.message || "Category added successfully!");
      setOpenAddModal(false);
      setNewCategory("");
      setFileList([]);
      refetchCategories();
    } catch (err) {
      message.error(err?.data?.message || "Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editedCategory) {
      message.error("Category name cannot be empty.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", editedCategory);
  
    if (fileList.length > 0) {
      if (fileList[0]?.originFileObj) {
        // A new file is uploaded
        formData.append("category_image", fileList[0].originFileObj);
      } else if (fileList[0]?.url) {
        // Use existing image
        formData.append("existingImageUrl", fileList[0].url.replace(`${imageUrl}/`, ""));
      }
    }
  
    setLoading(true);
    try {
      const res = await updateCategory({
        categoryId: editModal.id,
        data: formData,
      }).unwrap();
      message.success(res?.message || "Category updated successfully!");
      setEditModal({ isOpen: false, id: null });
      setEditedCategory("");
      setFileList([]);
      refetchCategories();
    } catch (err) {
      console.error("Update Error:", err);
      message.error(err?.data?.message || "Failed to update category.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteCategory = async (id) => {
    setLoading(true);
    try {
      const res = await deleteCategory(id).unwrap();
      message.success(res?.message || "Category deleted successfully!");
      refetchCategories();
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (record) => {
    setEditModal({ isOpen: true, id: record._id });
    setEditedCategory(record.name);
    const existingImage = record.category_image
      ? [
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: `${imageUrl}/${record.category_image}`,
          },
        ]
      : [];
    setFileList(existingImage);
  };
  

  const handleCloseEditModal = () => {
    setEditModal({ isOpen: false, id: null });
    setEditedCategory("");
    setFileList([]);
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

  const columns = [
    {
      title: "SL no.",
      dataIndex: "_id",
      key: "_id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Image",
      key: "category_image",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center">
          <img
            className="w-16 h-16 object-cover rounded"
            src={`${imageUrl}/${record.category_image}?t=${Date.now()}`}
            alt={record.name}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <Button
            icon={<MdOutlineModeEdit />}
            style={{ backgroundColor: "#2F799E", color: "#fff" }}
            onClick={() => handleOpenEditModal(record)}
          />
          <Button
            icon={<RiDeleteBin6Line />}
            style={{ backgroundColor: "#FF5454", color: "#fff" }}
            onClick={() => handleDeleteCategory(record._id)}
           
          />
        </div>
      ),
    },
  ];

  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4 text-[#2F799E]">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Category Management</span>
      </h1>

      <div className="flex justify-between mt-9">
        <button className="bg-[#2F799E] text-white px-6 py-1 rounded">
          Category
        </button>
        <button
          type="primary"
          onClick={() => setOpenAddModal(true)}
          className="bg-[#2F799E] px-3 text-white rounded"
        >
          + Add Category
        </button>
      </div>

      <div className="mt-16">
        {isLoading ? (
          <Spin tip="Loading categories..." />
        ) : error ? (
          <p>Failed to load categories.</p>
        ) : (
          <Table
            dataSource={categoriesData?.data}
            columns={columns}
            rowKey="_id"
            pagination={false}
            bordered
          />
        )}
      </div>

      {/* Add Category Modal */}
      <Modal
        centered
        open={openAddModal}
        onCancel={() => {
          setOpenAddModal(false);
          setNewCategory("");
          setFileList([]);
        }}
        footer={null}
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="font-bold text-center mb-11">+ Add Category</div>
          <div className="mx-20">
            <p className="mb-2">Category Name</p>
            <Input
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div>
              <p className="mt-4 mb-2">Thumbs Image</p>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </div>
            <div className="w-full flex gap-3 mt-11">
            <Button
                type="default"
                onClick={() => {
                  setOpenAddModal(false);
                  setNewCategory("");
                  setFileList([]);
                }}
                className="bg-[#D9000A] text-white w-full"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleAddCategory}
                loading={loading} // Add loading state for the Save button
                className="w-full"
                style={{ background: "#2F799E", borderColor: "#2F799E" }}
              >
                Save
              </Button>
              
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        centered
        open={editModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        width={600}
      >
        <div className="mb-11 mt-4">
          <div className="font-bold text-center mb-11">Edit Category</div>
          <div className="mx-20">
            <p className="mb-2">Category</p>
            <Input
              placeholder="Edit category name"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            />
            <div>
              <p className="mt-4 mb-2">Thumbs Image</p>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </div>
            <div className="w-full flex gap-3 mt-6">
            
              <button
                type="default"
                onClick={handleCloseEditModal}
                className="bg-[#D9000A] text-white w-full rounded-md"
              >
                Cancel
              </button>
              <Button
                type="primary"
                onClick={handleUpdateCategory}
                loading={loading} // Add loading state for the Save button
                className="w-full "
                style={{ background: "#2F799E", borderColor: "#2F799E" }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryManagements;
