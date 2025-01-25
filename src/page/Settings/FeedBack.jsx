import React, { useState } from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { Input, Modal, Form, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {
  useDeleteFeedbackMutation,
  useGetFeedbackQuery,
  useUpdateFeedbackMutation,
} from "../../redux/Api/feedbackApi";
import Loading from "../../loading/Loading";

const FeedBack = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // Loading state for the button

  const navigate = useNavigate();

  const { data, isLoading, error } = useGetFeedbackQuery();
  const [updateFeedback] = useUpdateFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const feedbackData = data?.data?.result || [];

  const openEditModal = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyMessage(feedback.replyMessage || "");
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedFeedback(null);
    setReplyMessage("");
  };

  const handleReplySubmit = async () => {
    if (selectedFeedback) {
      setIsSending(true); // Set loading state to true
      try {
        await updateFeedback({
          id: selectedFeedback._id,
          replyMessage,
        }).unwrap();
        message.success("Reply updated successfully");
        closeEditModal();
      } catch (error) {
        message.error("Error updating reply");
      } finally {
        setIsSending(false); // Set loading state to false
      }
    }
  };

  const handleDelete = (feedback) => {
    deleteFeedback(feedback._id)
      .unwrap()
      .then(() => {
        message.success("Feedback deleted successfully!");
      })
      .catch(() => {
        message.error("Error deleting feedback");
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading feedback data</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4 text-[#2F799E]">
          <button className="-mt-[20px]" onClick={() => navigate(-1)}>
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

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback) => (
              <tr key={feedback._id} className="border-b">
                <td className="py-2 px-4">{feedback.name}</td>
                <td className="py-2 px-4">{feedback.description}</td>
                <td className="py-2 px-4">
                  {new Date(feedback.createdAt).toLocaleTimeString()}
                </td>
                <td className="py-2 px-4 text-right">
                  <span
                    onClick={() => openEditModal(feedback)}
                    className={`inline-block px-2 py-1 rounded cursor-pointer border ${
                      feedback.replyMessage
                        ? "border-[#7CC84E] text-[#7CC84E]"
                        : "border-[#2F799E] text-[#2F799E]"
                    }`}
                  >
                    <span className="flex">
                      <IoArrowUndoSharp className="text-xl mt-[2px] mr-2" />
                      {feedback.replyMessage ? "Replied" : "Pending"}
                    </span>
                  </span>
                  <button
                    onClick={() => handleDelete(feedback)}
                    className="text-[#6A6D7C] ml-4"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      <Modal centered open={isEditModalOpen} footer={null} onCancel={closeEditModal}>
        <p className="text-center font-semibold pb-5 text-xl">Feedback</p>
        <Form>
          <label htmlFor="">Description : </label>
          <Form.Item>
            <Input
              className="mt-2"
              placeholder="Type question here..."
              value={selectedFeedback?.description || ""}
              disabled
            />
          </Form.Item>
          <label className="mb-2" htmlFor="">
            Reply :
          </label>
          <Form.Item>
            <TextArea
              className="mt-2"
              rows={4}
              placeholder="Type reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button
              type="primary"
              className="w-full"
              onClick={handleReplySubmit}
              loading={isSending}
              style={{ background: "black", borderColor: "#2F799E" }} // Ant Design loading state
            >
              Send
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedBack;
