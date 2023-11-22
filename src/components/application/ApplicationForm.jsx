import React, { useContext, useState, useMemo } from "react";
import applicationAPI from "../../apis/applicationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import userAPI from "../../apis/userAPI";
import { Field, Formik } from "formik";
import UploadFile from "./UploadFile";

function ApplicationForm({ setApplication, jobInfo }) {
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState(["CV", "Cover Letter"]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const jobId = useParams().jobId;
  const { auth, socket } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues = {
    CV: "",
    "Cover Letter": "",
    note: "",
  };

  const isCVUploaded = useMemo(() => {
    const filterDocu = uploadedDocuments.filter(
      (document) => document.name === "CV"
    );
    if (filterDocu.length > 0) return true;
    else return false;
  }, [uploadedDocuments]);

  const validationSchema = Yup.object().shape({
    CV: Yup.mixed().test("is-valid", "CV is required", () => isCVUploaded),
    "Cover Letter": Yup.mixed(),
    note: Yup.string(),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    if (auth.user.fullName) {
      setStatus();
      const formData = new FormData();
      for (let i = 0; i < uploadedDocuments.length; i++) {
        formData.append("documents", uploadedDocuments[i].file);
        formData.append(`documentNames`, uploadedDocuments[i].name);
      }
      formData.append(`jobId`, jobId);
      formData.append(`note`, fields.note);
      createApplication(formData);
    } else {
      handleAlertStatus({
        type: "info",
        message: "You need to update your Profile in order to continue!",
      });
    }
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
      socket.emit("sendApplicationEvent", {
        recruiter: jobInfo.creator,
        applicant: auth.user.email,
        jobId: jobId,
        jobTitle: jobInfo.title,
        applicationId: response.data.data.applicationInfo._id,
        status: "sent",
      });
    } catch (error) {
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
                    {documents.map((document, index) => {
                      return (
                        <UploadFile
                          key={index}
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
                      placeholder="Put the note for your application here"
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
