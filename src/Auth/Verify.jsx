import { useState } from "react";
import OtpInput from "react-otp-input";

import login from "../assets/auth/login.png";

import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../redux/Api/userApi";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const [verifyOtp] = useVerifyOtpMutation({});

  const navigate = useNavigate();

  const handleVerify = async () => {
    const data = {
      email: localStorage.getItem("email"),
      resetCode: Number(otp),
    };

    console.log(data);
    try {
      const response = await verifyOtp(data).unwrap();
      console.log(response);
      const token = response.data;
      localStorage.setItem("accessToken", token);
      alert("Success");
      navigate("/reset");
    } catch (error) {
      console.error(error?.data?.message);
    }
  };

  return (
    <div className="items-center justify-center flex min-h-screen bg-[#2F799E]">
      <div className="lg:grid grid-cols-2">
        <div className="bg-white md:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Check your email
          </h2>
          <h3 className="text-[#333333] text-center mb-5">
            We sent a reset link to contact@dscode...com enter 5 digit code that
            mentioned in the email
          </h3>
          <div className="flex justify-center mb-5">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderSeparator={<span className="mx-1"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-16 h-16 text-center text-lg border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ width: "40px", height: "50px" }}
                />
              )}
            />
          </div>
          <button
            onClick={handleVerify}
            className="w-full py-2 bg-[#2F799E] text-white rounded-md mb-4"
          >
            {"Verify OTP"}
          </button>

          <span className="flex justify-center">
            You have not received the email?{" "}
            <span className="text-blue-500">Resend</span>
          </span>
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

export default Verify;
