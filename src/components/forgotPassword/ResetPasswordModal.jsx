import React, { useContext, useState } from "react";
import BootstrapModal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalFormItem from "../../global/ModalFormItem";
import { passwordProfileModal } from "../../global/profileModalFormItems";
import userAPI from "../../apis/userAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordModal = ({ show, handleClose }) => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const token = useParams().token;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .test(
        "passwords-not-match-old",
        "Passwords should not match the old one",
        function (value) {
          return this.parent.currentPassword !== value;
        }
      ),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (true) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  async function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    setErrorMessage("");
    const userInfo = {
      password: fields.password,
      token: token,
    };

    await userAPI
      .resetPassword(userInfo)
      .then(async (response) => {
        handleAlertStatus({
          type: "success",
          message: "Reset password sucessfully!",
        });

        handleClose();
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        console.log("error", error.response.data.error);
      });
  }

  const currentPasswordItem = {
    label: "Current Password",
    type: "password",
    fieldName: "currentPassword",
  };

  return (
    <BootstrapModal show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Reset Password</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {loading && <p className="text-info">Changing Password ....</p>}

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => {
            return (
              <Form>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <h5>New password</h5>
                {passwordProfileModal.map((item) => (
                  <ModalFormItem
                    key={item.fieldName}
                    item={item}
                    errors={errors}
                    touched={touched}
                  />
                ))}

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
                    Save
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

export default ResetPasswordModal;
