import React, { useContext, useState } from "react";
import applicationAPI from "../../apis/applicationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import userAPI from "../../apis/userAPI";
import { Field, Formik } from "formik";
import UploadFile from "./UploadFile";

function ApplicationForm({ setApplication }) {
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState(["CV", "Cover Letter"]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const jobId = useParams().jobId;
  const navigate = useNavigate();
  const initialValues = {
    CV: "",
    "Cover Letter": "",
    note: "",
  };
  const validationSchema = Yup.object().shape({
    CV: Yup.mixed().required("CV is required"),
    "Cover Letter": Yup.mixed(),
    note: Yup.string(),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    console.log("fields",fields)
    const formData = new FormData();
    for (let i = 0; i < uploadedDocuments.length; i++) {
      formData.append("documents", uploadedDocuments[i].file);
      formData.append(`documentNames`, uploadedDocuments[i].name);
    }
    formData.append(`jobId`, jobId);
    formData.append(`note`, fields.note);
    createApplication(formData);
  }

  const addAnotherDocument = () => {
    documents.length < 8
      ? setDocuments([...documents, "other_" + documents.length])
      : handleAlertStatus({
          type: "warn",
          message: "Up to 8 documents are allowed!",
        });
  };
  const createApplication = async (applicationInfo) => {
    try {
      setLoading(true);
      const response = await applicationAPI.create(applicationInfo);

      handleAlertStatus({
        type: "success",
        message: "Application has been sent!",
      });

      setApplication(response.data.data.applicationInfo);
      // navigate(0);
    } catch (error) {
      console.log("error", error);
      handleAlertStatus({
        type: "error",
        message: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        setFieldTouched,
        isSubmitting,
        setFieldValue,
        handleSubmit,
      }) => {
        return (
          <form
            className="container rounded"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col-md-12 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-center">
                    {documents.map((document) => {
                      return (
                        <UploadFile
                          key={document}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          errors={errors}
                          touched={touched}
                          fieldName={document}
                          uploadedDocuments={uploadedDocuments}
                          setUploadedDocuments={setUploadedDocuments}
                          documents={documents}
                          setDocuments={setDocuments}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-2 text-center">
                    <div
                      className="btn btn-primary fw-700"
                      onClick={addAnotherDocument}
                    >
                      Add another document
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="note" className="fs-6 fw-bold text-primary">
                      Application Note:
                    </label>
                    <br></br>
                    <Field
                      name="note"
                      as="textarea"
                      className="mt-2 w-100"
                      rows={6}
                      placeholder="maxLength is 1000"
                      maxLength={1000}
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <button type="submit" className="btn btn-primary fw-bold">
                      {loading && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default ApplicationForm;
