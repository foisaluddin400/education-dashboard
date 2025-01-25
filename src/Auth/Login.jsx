import login from "../assets/auth/login.png";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useLoginAdminMutation } from "../redux/Api/userApi";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginAdmin] = useLoginAdminMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    // loginAdmin(values)
    //   .unwrap()
    //   .then((payload) =>{
    //     console.log( payload)
    //   })
    //   .catch((error) => toast.error(error?.data?.message));

      try {
        const payload = await loginAdmin(values).unwrap();
        if (payload?.data?.accessToken) {
          const decoded = jwtDecode(payload?.data?.accessToken);

          if (decoded?.role === "superAdmin") {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(payload?.data?.accessToken)
            );
            toast.success("Login Successfully");
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("Failed to log in. Please check your credentials.");
      } finally {
        setLoading(false); // Stop loading state
      }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Failed:", errorInfo);
  };

  return (
    <div className="items-center justify-center flex min-h-screen bg-[#2F799E]">
      <div className=" ">
        <div className="lg:grid grid-cols-2">
          <div>
            <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg ">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Welcome back!
              </h2>
              <p className="pb-7">Please log in to continue access</p>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-700">Remember me</Checkbox>
                  </Form.Item>
                  <Link
                    to={"/forgetpassword"}
                    className="text-sm text-[#2F799E] hover:underline focus:outline-none"
                  >
                    Forget password?
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    // loading={loading} 
                    className="w-full py-5 bg-[#2F799E] text-white"
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <img className="w-[320px]" src={login} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
