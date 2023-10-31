import React, { useContext, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import UploadButton from "./UploadButton";
import applicationAPI from "../../apis/applicationAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import userAPI from "../../apis/userAPI";
import { Formik } from "formik";
import { Form } from "antd";
import ModalFormItem from "../../global/ModalFormItem";

function ApplicationForm() {
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState(["CV", "Cover Letter", "Other"]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isCVUploaded, setIsCVUploaded] = useState(false);
  const jobId = useParams().jobId;

  const initialValues = {
    documents: [],
    note: "",
  };
  const validationSchema = Yup.object().shape({
    cv: Yup.mixed().required("CV is required"),
    coverLetter: Yup.mixed(),
    note: Yup.string(),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    console.log("fields", fields);
    console.log("uploadedDocuments", uploadedDocuments);
    const applicationInfo = {
      jobId,
      documents: uploadedDocuments,
      note: "",
    };
    console.log("application_Info", applicationInfo);
    createApplication(applicationInfo);
  }

  const addAnotherDocument = () => {
    documents.length < 10 && setDocuments([...documents, "Other"]);
  };
  const createApplication = async (applicationInfo) => {
    setLoading(true);
    await applicationAPI
      .create(applicationInfo)
      .then(() => {
        handleAlertStatus({
          type: "success",
          message: "Application has been sent!",
        });
      })
      .catch((error) => {
        handleAlertStatus({
          type: "error",
          message: error.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      await userAPI.uploadLogo(formData);
    } catch (error) {
      handleAlertStatus({
        type: "error",
        message: error.response.data.message,
      });
      console.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        }) => {
          return (
            <Form className="container rounded">
              <div className="row">
                <div className="col-md-7 border-right">
                  <div className="p-3 py-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Profile Settings</h4>
                    </div>
                    {[{}].map((item) => (
                      <ModalFormItem
                        key={item.fieldName}
                        item={item}
                        errors={errors}
                        touched={touched}
                      />
                    ))}

                    <div className="form-row">
                      <div className="form-group col">
                        <div className="form-group row">
                          <div className="d-grid justify-content-center">
                            <label
                              htmlFor="cv"
                              onClick={() => setFieldTouched("cv", true)}
                            >
                              {" "}
                              {isCVUploaded ? (
                                <div className="form-upload">
                                  <p>CV Uploaded</p>
                                </div>
                              ) : (
                                <div className="form-upload">
                                  <p>click to upload</p>
                                </div>
                              )}
                            </label>
                            {errors.companyLogo && touched.companyLogo && (
                              <p className="text-danger form-error">
                                {errors.companyLogo}
                              </p>
                            )}
                          </div>

                          <input
                            placeholder="CV"
                            type="file"
                            accept="application/pdf"
                            id="cv"
                            name="cv"
                            style={{ display: "none" }}
                            className={
                              "form-control" +
                              (errors.companyLogo && touched.companyLogo
                                ? " is-invalid "
                                : "")
                            }
                            onChange={(e) => {
                              // setFieldValue("cv", e.target.files[0]);
                              // setCVFile(e.target.files[0]);
                              // e.target.files[0]
                              //   ? setCVFile(
                              //       URL.createObjectURL(e.target.files[0])
                              //     )
                              //   : setIsCVUploaded(false);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <button
                        className="btn btn-primary fw-700"
                        onClick={addAnotherDocument}
                      >
                        Add another document
                      </button>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="applicationNote"
                        className="fs-6 fw-bold text-primary"
                      >
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
                      <button
                        onClick={createApplication}
                        className="btn btn-primary fw-bold"
                      >
                        {loading && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

    </>
  );
}

export default ApplicationForm;
