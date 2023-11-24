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
import { Select } from "antd";

function ProfileComponent({ onOpenResetPasswordModal }) {
  const { auth, handleLogin } = useContext(AuthContext);
  const [logoFile, setLogoFile] = useState();
  const [logoReview, setLogoReview] = useState(auth.user.companyLogoUrl);
  const { handleAlertStatus } = useContext(AlertContext);
  const [isLoading, setLoading] = useState(false);
  const roleName = auth.user.roleName;
  const [sectors, setSectors] = useState(auth.user.sectors);

  const initialValues_recruiter = {
    companyName: auth.user.companyName,
    email: auth.user.email,
    phoneNumber: auth.user.phoneNumber,
    address: auth.user.address,
    businessSector: auth.user.sectors,
    description: auth.user.description,
    companyLogo: auth.user.companyLogoUrl ? auth.user.companyLogoUrl : "",
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
    businessSector: Yup.array()
      .required("Business sector is required")
      .test(
        "is-valid",
        "Business sector is required",
        (value) => value.length > 0
      ),
    companyLogo: Yup.mixed().required("Company logo is required"),
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
    businessSector: Yup.array()
      .required("Business sector is required")
      .test(
        "is-valid",
        "Business sector is required",
        (value) => value.length > 0
      ),
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
      companyLogo: logoReview,
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
        handleFileUpload(logoFile);
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
      setBusinessSector(response.data?.data?.businessSectorList.sectors);
    } catch (error) {
      console.log(error);
    }
  };

  const bsOptions = [];
  if (businessSectors.length > 0) {
    businessSectors.map((businessSector) => {
      return bsOptions.push({
        name: businessSector.name,
        value: businessSector.name,
      });
    });
  }
  const handleChangeSector = (e) => {
    setSectors(e);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      await userAPI.uploadLogo(formData);
      handleLogin();
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
      {({ errors, touched, setFieldTouched, isSubmitting, setFieldValue }) => {
        return (
          <Form className="container rounded">
            <div className="row">
              <div className="col-md-4 border-right">
                <Avatar />
                <div className="text-center">
                  <button
                    className="btn btn-primary reset-password-button"
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
                    ? profileModalFormItems_recruiter
                    : auth.user.roleName === "applicant"
                    ? profileModalFormItems_applicant
                    : profileModalFormItems_default
                  ).map((item) => (
                    <ModalFormItem
                      key={item.fieldName}
                      item={item}
                      errors={errors}
                      touched={touched}
                      isEditMode={true}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      gender={auth.user.gender}
                    />
                  ))}

                  {(auth.user.roleName === "recruiter" ||
                    auth.user.roleName === "applicant") && (
                    <div className="form-row">
                      <div className="form-group col">
                        <label
                          htmlFor="businessSector"
                          onClick={() =>
                            setFieldTouched("businessSector", true)
                          }
                        >
                          Business Sectors:
                        </label>

                        <Select
                          id="businessSector"
                          name="businessSector"
                          mode="tags"
                          style={{
                            width: "100%",
                            backgroundColor: "white",
                            margin: " 4px 0px",
                            borderRadius: "4px",
                          }}
                          bordered={false}
                          allowClear={true}
                          placeholder="Choose your sectors"
                          onChange={(e) => {
                            setSectors(e);
                            setFieldValue("businessSector", e);
                          }}
                          value={sectors}
                          options={bsOptions.map((sector) => ({
                            label: sector.name,
                            value: sector.name,
                          }))}
                        />
                        {errors.businessSector && touched.businessSector && (
                          <p className="text-danger form-error">
                            {errors.businessSector}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {auth.user.roleName === "recruiter" && (
                    <div className="form-row">
                      <div className="form-group col">
                        <div className="form-group row">
                          <p>
                            Company Logo:{" "}
                            <i style={{ fontSize: "12px" }}>
                              (Recommended scale: 1:1)
                            </i>
                          </p>

                          <div className="d-grid justify-content-center">
                            <label
                              htmlFor="companyLogo"
                              onClick={() =>
                                setFieldTouched("companyLogo", true)
                              }
                            >
                              {" "}
                              {logoReview ? (
                                <img
                                  src={logoReview}
                                  alt="logo review"
                                  style={{
                                    width: 150,
                                    height: 150,
                                    padding: 0,
                                  }}
                                />
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
                            placeholder="logo"
                            type="file"
                            accept="image/*"
                            id="companyLogo"
                            name="companyLogo"
                            style={{ display: "none" }}
                            className={
                              "form-control" +
                              (errors.companyLogo && touched.companyLogo
                                ? " is-invalid "
                                : "")
                            }
                            onChange={(e) => {
                              setFieldValue("companyLogo", e.target.files[0]);
                              setLogoFile(e.target.files[0]);
                              e.target.files[0]
                                ? setLogoReview(
                                    URL.createObjectURL(e.target.files[0])
                                  )
                                : setLogoReview("");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 d-flex justify-content-evenly">
                    <button
                      className="btn btn-primary profile-button"
                      type="submit"
                    >
                      {isLoading ? (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      ) : undefined}
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
