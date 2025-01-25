import { Form, Input, Modal, Button, message } from 'antd'; // Import Ant Design Button
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery, useGetFaqUpdateMutation } from '../../redux/Api/faqApi';
import { toast } from 'sonner';
const { TextArea } = Input;

const FAQ = () => {
  const { data: faqData, refetch } = useGetFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [updateFaq] = useGetFaqUpdateMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Loading state

  const handleAddFaq = () => {
    setLoading(true); // Start loading
    form.validateFields().then((values) => {
      addFaq(values)
        .unwrap()
        .then(() => {
          refetch();
          message.success( 'FAQ added successfully!');
          setIsModalOpen(false);
          form.resetFields();
        })
        .catch((error) => {
          message.error('Error adding FAQ:', error);
        })
        .finally(() => setLoading(false)); // Stop loading
    });
  };

  const handleUpdateFaq = () => {
    setLoading(true); // Start loading
    form.validateFields().then((values) => {
      updateFaq({ id: selectedFaq._id, data: values })
        .unwrap()
        .then(() => {
          refetch();
          message.success('FAQ updated successfully!');
          setIsEditModalOpen(false);
          form.resetFields();
        })
        .catch((error) => {
          message.error('Error updating FAQ:', error);
        })
        .finally(() => setLoading(false)); // Stop loading
    });
  };

  const handleDeleteFaq = (id) => {
    deleteFaq(id)
      .unwrap()
      .then(() => {
        refetch();
        message.success('FAQ deleted successfully!');
      })
      .catch((error) => {
        message.error('Error deleting FAQ:', error);
      });
  };

  const openEditModal = (faq) => {
    setSelectedFaq(faq);
    form.setFieldsValue(faq);
    setIsEditModalOpen(true);
  };

  return (
    <div className="bg-white rounded-md p-5">
      <div className="flex">
        <Link to={-1} className="py-1 px-2 rounded-md flex justify-start items-center gap-1">
          <IoArrowBackSharp className="text-[var(--primary-color)]" />
        </Link>
        <p className="font-semibold text-[18px]">FAQ</p>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-2">
        {faqData?.data?.map((faq, i) => (
          <div key={faq._id} className="p-2">
            <p className="pb-3">Question no: {i + 1}</p>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.question}</p>
            <div className="flex justify-between">
              <p className="py-2">Answer</p>
              <div className="flex gap-4">
                <button onClick={() => openEditModal(faq)} className="py-2">
                  Edit
                </button>
                <div className="py-2">
                  <MdDeleteOutline
                    className="text-xl cursor-pointer"
                    onClick={() => handleDeleteFaq(faq._id)}
                  />
                </div>
              </div>
            </div>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-20">
        <Button
          onClick={() => setIsModalOpen(true)}
          type="primary"
          shape="round"
          size="large"
          icon={<GoPlus />}
        >
          Add FAQ
        </Button>
      </div>

      <Modal centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <p className="text-center font-semibold pb-5 text-xl">Add FAQ</p>
        <Form form={form}>
          <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button
              onClick={handleAddFaq}
              type="primary"
              shape="round"
              size="large"
              loading={loading} 
              style={{ background: "black", borderColor: "#2F799E" }} // Loading state
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal centered open={isEditModalOpen} footer={null} onCancel={() => setIsEditModalOpen(false)}>
        <p className="text-center font-semibold pb-5 text-xl">Edit FAQ</p>
        <Form form={form}>
          <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button
              onClick={handleUpdateFaq}
              type="primary"
              shape="round"
              size="large"
              loading={loading}
              style={{ background: "black", borderColor: "#2F799E" }} // Loading state
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQ;
