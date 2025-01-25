import { Table, Input, Space, Modal, Spin, message } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";
import {
  useGetUserManageQuery,
  useBlockUserMutation,
} from "../../redux/Api/UserManagementApi";
import toast from "react-hot-toast";
import Loading from "../../loading/Loading";

const UserManagement = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loadingId, setLoadingId] = useState(null); // State for button loading
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetUserManageQuery();
  const [blockUser] = useBlockUserMutation();

  const userData = data?.data?.result.map((user, index) => ({
    key: user._id,
    sl: index + 1,
    userId: user.user?._id,
    userName: user.username,
    dateOfBirth: user.dateOfBirth || "N/A",
    contactNumber: user.phone || "N/A",
    email: user.email || "N/A",
    status: user.user?.status || "N/A",
  }));

  const openModal = (record) => {
    setSelectedRecord(record);
    setModal2Open(true);
  };

  const closeModal = () => {
    setModal2Open(false);
    setSelectedRecord(null);
  };

  const handleToggleStatus = async (record) => {
    const newStatus = record.status === "blocked" ? "in-progress" : "blocked";

    // Set loading for the specific record
    setLoadingId(record.key);

    try {
      const res = await blockUser({
        id: record.userId,
        status: newStatus,
      }).unwrap();

      if (res?.success) {
       
        message.success(res.message);
        record.status = newStatus;
      }
    } catch (error) {
      message.error("Failed to update status:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      width: 70,
      align: "center",
    },
    {
      title: "User's Name",
      dataIndex: "userName",
      width: 150,
      render: (text) => (
        <Space>
          <img
            src="https://via.placeholder.com/32"
            alt="avatar"
            style={{ borderRadius: "50%", width: 32, height: 32 }}
          />
          {text}
        </Space>
      ),
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button className="mt-2" onClick={() => openModal(record)}>
            <span className="text-xl">
              <LuEye />
            </span>
          </button>
          <button
            onClick={() => handleToggleStatus(record)}
            className={`${
              record.status === "blocked" ? "bg-red-600" : "bg-gray-600"
            } text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md`}
            disabled={loadingId === record.key} // Disable button while loading
          >
            {loadingId === record.key ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              <MdBlockFlipped />
            )}
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4 text-[#2F799E]">
          <button className=" -mt-[20px]" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">User Management</span>
        </h1>
        <Input
          placeholder="Search here..."
          prefix={<SearchOutlined />}
          style={{ marginBottom: "16px", maxWidth: "300px" }}
        />
      </div>

      {isLoading ? (
        <p className="-mt-32">
          <Loading />
        </p>
      ) : error ? (
        <p>Failed to load user data.</p>
      ) : (
        <Table
          columns={columns}
          dataSource={userData}
          pagination={{
            pageSize: 10,
            position: ["bottomCenter"],
          }}
        />
      )}

      <Modal
        centered
        open={modal2Open}
        onCancel={closeModal}
        footer={null}
        closable={true}
        width={400}
        bodyStyle={{ borderRadius: 0 }}
        className="no-border-radius-modal"
        closeIcon={<span className="text-lg text-black">×</span>}
      >
        <div className="flex justify-center py-8">
          <img
            className="w-[70px] h-[70px] rounded-full"
            src={Profile}
            alt="profile"
          />
        </div>
        <div>
          <div className="grid grid-cols-2">
            <div className="text-lg gap-4">
              <h4>Name:</h4>
              <h4>Date of birth:</h4>
              <h4>Contact Number:</h4>
              <h4>Email:</h4>
              <h4>Status:</h4>
            </div>
            <div className="gap-4 text-lg text-neutral-500">
              <h3>{selectedRecord?.userName || "N/A"}</h3>
              <h3>{selectedRecord?.dateOfBirth || "N/A"}</h3>
              <h3>{selectedRecord?.contactNumber || "N/A"}</h3>
              <h3>{selectedRecord?.email || "N/A"}</h3>
              <h3>{selectedRecord?.status || "N/A"}</h3>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
