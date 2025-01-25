import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  useGetAboutQuery,
  useGetprivecyConditionsQuery,
  usePostPrivecyMutation,
  useUpdateAboutMutation,
} from "../../redux/Api/privecyApi";
import toast from "react-hot-toast";
import { Button } from "antd";

const AboutUs = () => {
  const { data: getTerms } = useGetAboutQuery();
  

  const [addPrivecy] = useUpdateAboutMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, seLoading] = useState(false);
  const [id, setId] = useState("");

  const handleTerms = async () => {
    const description = content;  
    seLoading(true);
    const res = await addPrivecy({ description }).unwrap();
    seLoading(false);
    console.log("res", res);
    toast.success("Privecy Update successfully!");
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 900,
    },
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
  useEffect(() => {
    setContent(getTerms?.data?.description);
  }, [getTerms]);

  return (
    <>
      <div className="flex justify-between mb-7 mt-4 text-[#2F799E]">
        <h1 className="flex gap-4">
          <button className="" onClick={() => navigate(-1)}>
            <IoArrowBackSharp />
          </button>
          <span className="text-lg font-semibold">About Us</span>
        </h1>
      </div>

      <div className="custom-jodit-editor mx-5 ">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
        <div className="flex items-center justify-center mt-5">
        <Button
      onClick={handleTerms}
      className="bg-black text-white px-4 py-2 rounded-full test"
      loading={isLoading} // Loading state controlled by isLoading
    >
      Save Changes
    </Button>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
