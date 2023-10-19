import React, { useContext, useState } from "react";
import BootstrapModal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalFormItem from "../../global/ModalFormItem";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import mailAPI from "../../apis/mailAPI";

const ForgotPasswordModal = ({ show, handleClose }) => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { auth } = useContext(AuthContext);
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  async function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    setErrorMessage("");
    const userInfo = {
      id: auth.user._id,
      email: fields.email,
    };
    await mailAPI
      .send(userInfo)
      .then(() => {
        handleAlertStatus({
          type: "success",
          message: "Email sent!",
        });
        handleClose();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        console.log("error", error.response.data.message);
      });
  }

  const emailItem = {
    label: "Email Address",
    fieldName: "email",
    type: "email",
    isRequired: true,
  };

  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Forgot Password</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {loading && <p className="text-info">Sending email ....</p>}

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => {
            return (
              <Form>
                <p>Link to reset password will be sent via email</p>
                <ModalFormItem
                  item={emailItem}
                  errors={errors}
                  touched={touched}
                />
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <div className="form-group text-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn btn-secondary me-2"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Send
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default ForgotPasswordModal;
