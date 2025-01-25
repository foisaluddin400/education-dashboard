import login from "../assets/auth/login.png";
import { Form, Input } from "antd";

import { useState } from "react";
import { useForgotPasswordMutation } from "../redux/Api/userApi";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    forgotPassword(values)
      .unwrap()
      .then((payload) => {
        alert("success");
        navigate("/verify");
        localStorage.setItem("email", values?.email);
      })
      .catch((error) => console.error(error?.data?.message));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="items-center justify-center flex min-h-screen bg-[#2F799E]">
      <div className="lg:grid grid-cols-2">
        <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold flex justify-center mb-6 text-gray-800">
            Forget Password
          </h2>

          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email adress"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                placeholder="Email"
                className="w-full px-4 py-2 border  rounded-md"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full py-2 bg-[#2F799E] text-white rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <img className="w-[320px]" src={login} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
