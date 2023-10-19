import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import AuthContext from "../../contexts/AuthContext/AuthContext";

import ModalFormItem from "../../global/ModalFormItem";
import Avatar from "./Avatar";
import {
  profileModalFormItems_applicant,
  profileModalFormItems_default,
  profileModalFormItems_recruiter,
} from "../../global/profileModalFormItems";
import businessSectorAPI from "../../apis/businessSectorAPI";
import userAPI from "../../apis/userAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";

function ProfileComponent({ onOpenResetPasswordModal }) {
  const { handleAlertStatus } = useContext(AlertContext);
  const { auth, handleLogin } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const roleName = auth.user.roleName;

  const initialValues_recruiter = {
    companyName: auth.user.companyName,
    email: auth.user.email,
    phoneNumber: auth.user.phoneNumber,
    address: auth.user.address,
    businessSector: auth.user.sectors,
    description: auth.user.description,
  };
  const initialValues_applicant = {
    fullName: auth.user.fullName,
    age: auth.user.age,
    gender: auth.user.gender,
    email: auth.user.email,
    phoneNumber: auth.user.phoneNumber,
    address: auth.user.address,
    businessSector: auth.user.sectors,
    description: auth.user.description,
  };
  const initialValues_default = {
    fullName: auth.user.fullName,
    email: auth.user.email,
    phoneNumber: auth.user.phoneNumber,
  };
  const initialValues =
    auth.user.roleName === "recruiter"
      ? initialValues_recruiter
      : auth.user.roleName === "applicant"
      ? initialValues_applicant
      : initialValues_default;

  const validationSchema_recruiter = Yup.object().shape({
    companyName: Yup.string().required("Company Name is required"),
    email: Yup.string().email(),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    businessSector: Yup.array().required("Business sector is required"),
    description: Yup.string().required("Company description is required"),
    password: Yup.string()
      .concat(false ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (false) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const validationSchema_applicant = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    age: Yup.string().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email(),
    phoneNumber: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    businessSector: Yup.array().required("Business sector is required"),
    description: Yup.string().required("Company description is required"),
    password: Yup.string()
      .concat(false ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (false) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const validationSchema_admin = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email(),
    phoneNumber: Yup.string().required("Phone Number is required"),
    password: Yup.string()
      .concat(false ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .when("password", (password, schema) => {
        if (false) return schema.required("Confirm Password is required");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setStatus();
    const userInfo_recruiter = {
      id: auth.user._id,
      userId: auth.user._id,
      roleName: auth.user.roleName,
      password: fields.password,
      companyName: fields.companyName,
      phoneNumber: fields.phoneNumber,
      address: fields.address,
      sectors: fields.businessSector,
      description: fields.description,
    };
    const userInfo_applicant = {
      id: auth.user._id,
      userId: auth.user._id,
      roleName: auth.user.roleName,
      password: fields.password,
      fullName: fields.fullName,
      phoneNumber: fields.phoneNumber,
      age: fields.age,
      gender: fields.gender,
      address: fields.address,
      sectors: fields.businessSector,
      description: fields.description,
    };
    const userInfo_admin = {
      id: auth.user._id,
      userId: auth.user._id,
      roleName: auth.user.roleName,
      password: fields.password,
      fullName: fields.fullName,
      phoneNumber: fields.phoneNumber,
    };
    const userInfo =
      auth.user.roleName === "recruiter"
        ? userInfo_recruiter
        : auth.user.roleName === "applicant"
        ? userInfo_applicant
        : userInfo_admin;
    updateUser(userInfo);
  }

  async function updateUser(fields, setSubmitting) {
    setLoading(true);
    await userAPI
      .update(fields)
      .then(() => {
        handleAlertStatus({
          type: "success",
          message: "Update user sucessfully!",
        });
      })
      .catch((error) => {
        handleAlertStatus({
          type: "error",
          message: error.response.data.message,
        });
        console.log(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
    handleLogin();
  }
  const [businessSectors, setBusinessSector] = useState([]);
  useEffect(() => {
    fetchBusinessSector();
  }, []);
  const fetchBusinessSector = async () => {
    try {
      const response = await businessSectorAPI.getAll();
      setBusinessSector(response.data.data.businessSectorList);
    } catch (error) {
      console.log(error);
    }
  };

  const bsOptions = [];
  businessSectors.map((businessSector) => {
    return bsOptions.push({
      name: businessSector.name,
      value: businessSector.name,
    });
  });

  const profileModalFormItems_recruiter_new = [
    ...profileModalFormItems_recruiter,
    {
      label: "Business Sector",
      fieldName: "businessSector",
      as: "select",
      options: bsOptions,
    },
  ];

  const profileModalFormItems_applicant_new = [
    ...profileModalFormItems_applicant,
    {
      label: "Business Sector",
      fieldName: "businessSector",
      as: "select",
      options: bsOptions,
    },
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={
        roleName === "recruiter"
          ? validationSchema_recruiter
          : roleName === "applicant"
          ? validationSchema_applicant
          : validationSchema_admin
      }
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => {
        return (
          <Form className="container rounded bg-white ">
            <div className="row">
              <div className="col-md-4 border-right">
                <Avatar />
                <div className="text-center ">
                  <button
                    className="btn btn-primary reset-password-button"
                    style={{ marginTop: "10rem" }}
                    type="button"
                    onClick={onOpenResetPasswordModal}
                  >
                    Change Password
                  </button>
                </div>
              </div>
              <div className="col-md-7 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  {(auth.user.roleName === "recruiter"
                    ? profileModalFormItems_recruiter_new
                    : auth.user.roleName === "applicant"
                    ? profileModalFormItems_applicant_new
                    : profileModalFormItems_default
                  ).map((item) => (
                    <ModalFormItem
                      key={item.fieldName}
                      item={item}
                      errors={errors}
                      touched={touched}
                      isEditMode={true}
                    />
                  ))}

                  <div className="mt-5 d-flex justify-content-evenly">
                    <button
                      className="btn btn-primary profile-button"
                      type="submit"
                    >
                      {isLoading && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProfileComponent;
