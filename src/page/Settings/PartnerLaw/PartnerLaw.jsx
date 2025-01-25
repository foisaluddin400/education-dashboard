import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

import toast from "react-hot-toast";
import { useGetLawQuery, useUpdateLawMutation } from "../../../redux/Api/privecyApi";

const TermsCondition = () => {
  const { data: getTerms } = useGetLawQuery();

  const [addPrivecy] = useUpdateLawMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, seLoading] = useState(false);
  const [id, setId] = useState("");

  const handleTerms = async () => {
    const description = content;  
    const res = await addPrivecy({ description }).unwrap();
    console.log("res", res);
    toast.success("Privecy Update successfully!");
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 400,
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
          <span className="text-lg font-semibold">Partner Law Firms</span>
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
          <button
            onClick={handleTerms}
            className="bg-black text-white px-4 py-2 rounded-full test"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default TermsCondition;
