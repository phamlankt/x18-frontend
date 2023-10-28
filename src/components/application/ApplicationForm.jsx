import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import UploadButton from "./UploadButton";

function ApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState(["CV", "Cover Letter", "Other"]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const addAnotherDocument = () => {
    documents.length < 10 && setDocuments([...documents, "Other"]);
  };
const createApplication = ()=>{
    console.log("uploadedDocuments",uploadedDocuments)
}
  return (
    <div>
      <p className="fs-6 fw-bold text-primary">Upload documents:</p>
      <div className="d-flex justify-content-start">
        {documents.map((documentName) => (
          <UploadButton
            documentName={documentName}
            onUpLoadDocument={(uploadDocument) =>
              setUploadedDocuments([...uploadedDocuments, uploadDocument])
            }
          />
        ))}
      </div>
      <div className="mt-2 text-center">
        <button className="btn btn-primary fw-700" onClick={addAnotherDocument}>
          Add another document
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="applicationNote" className="fs-6 fw-bold text-primary">
          Application Note:
        </label>
        <br></br>
        <TextArea
          id="applicationNote"
          className="mt-2"
          rows={6}
          placeholder="maxLength is 1000"
          maxLength={1000}
        />
      </div>
      <div className="mt-4 text-center">
        <button onClick={createApplication} className="btn btn-primary fw-bold">Submit</button>
      </div>
    </div>
  );
}

export default ApplicationForm;
