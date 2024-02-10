"use client";
import React, { useCallback, useState } from "react";
import type { Content, OnChangeStatus } from "vanilla-jsoneditor";
import { uploadSchema } from "@/service/updateSchema";
import dynamic from "next/dynamic";

const JSONEditorReact = dynamic(() => import("./JSONReactEditor"), {
  ssr: false,
});

const initialContent = {
  name: "xyz",
};

const SchemaPage = () => {
  const [jsonContent, setJsonContent] = useState<Content>({
    json: initialContent,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handler = useCallback(
    (content: Content, previousContent: Content, status: OnChangeStatus) => {
      setJsonContent(content);
    },
    [jsonContent]
  );

  const handleClick = async () => {
    try {
      setLoading(true);
      await uploadSchema((jsonContent as Content).json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("🚀 ~ handleClick ~ error:", error);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="h-screen w-screen">
      <JSONEditorReact content={jsonContent} onChange={handler} />
      <button
        disabled={loading}
        className="btn btn-primary fixed top-20 right-4 w-20"
        onClick={handleClick}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Save"
        )}
      </button>

      {error && (
        <div role="alert" className="alert alert-error fixed bottom-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
          <div>
            <button
              className="btn btn-sm"
              onClick={() => {
                setError(false);
                setErrorMessage("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemaPage;
