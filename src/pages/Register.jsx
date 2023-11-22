import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { FaRightToBracket } from "react-icons/fa6";
import { Formik, Field, Form, ErrorMessage } from "formik";
import authAPI from "../apis/authAPI";
import { registerFormItems } from "../global/registerFormItems";
import * as Yup from "yup";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { handleLogin } = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    conf_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues = {
    email: "",
    password: "",
    conf_password: "",
    role: "",
  };
  async function onSubmit(values) {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register({
        email: values.email,
        password: values.password,
        role: values.role,
      });
      if (response.status === 200) {
        const response = await authAPI.login({
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("accessToken", response.data.data.accessToken);

        await handleLogin();
        navigate("/profile");
      }
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  if (auth.isAuthenticated && !auth.user.roleName === "superadmin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container account-body">
      <div className="row vh-100 ">
        <div className="col-12 align-self-center">
          <div className="auth-page">
            <div className="card auth-card shadow-lg">
              <div className="card-body">
                <div className="px-3">
                  <div className="text-center auth-logo-text">
                    <h4 className="mt-0 mb-3 mt-5">Free Register</h4>
                    <p className="text-muted mb-0">
                      Get your free account now.
                    </p>
                  </div>{" "}
                  {/*end auth-logo-text*/}
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ errors, touched, isSubmitting, setFieldValue }) => {
                      return (
                        <Form className="form-horizontal auth-form my-4">
                          {registerFormItems.map((item) => {
                            return (
                              <div key={item.fieldName} className="form-group">
                                <label htmlFor={item.fieldName}>
                                  {item.label}
                                </label>
                                <Field
                                  name={item.fieldName}
                                  type={item.type && item.type}
                                  as={item.as && item.as}
                                  placeholder={`Enter ${item.label}`}
                                  className={
                                    "form-control" +
                                    (errors[item.fieldName] &&
                                    touched[item.fieldName]
                                      ? " is-invalid"
                                      : "")
                                  }
                                >
                                  {auth.user.roleName !== "superadmin"
                                    ? item.options &&
                                      item.options.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                          disabled={option.options && true}
                                          hidden={option.options && true}
                                        >
                                          {option.name}
                                        </option>
                                      ))
                                    : item.adminOption &&
                                      item.adminOption.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                          disabled={option.options && true}
                                          hidden={option.options && true}
                                        >
                                          {option.name}
                                        </option>
                                      ))}
                                </Field>
                                <ErrorMessage
                                  name={item.fieldName}
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            );
                          })}
                          {error && <p className="text-danger">{error}</p>}
                          <div className="form-group row mt-4">
                            <div className="col-sm-12">
                              <div>
                                <input
                                  type="checkbox"
                                  id="customSwitchSuccess"
                                />
                                <label
                                  className="ms-2"
                                  htmlFor="customSwitchSuccess"
                                >
                                  By registering you agree to the Jobstar{" "}
                                  <a href="#" className="text-primary">
                                    Terms of Use
                                  </a>
                                </label>
                              </div>
                            </div>
                            {/*end col*/}
                          </div>
                          <div className="form-group mb-0 row">
                            <div className="col-12 mt-2">
                              <button
                                className="btn btn-gradient-primary btn-round btn-block waves-effect waves-light"
                                type="submit"
                              >
                                {loading ? "Loading" : "Register"}
                                <FaRightToBracket className="fas fa-sign-in-alt ml-1" />
                              </button>
                            </div>
                            {/*end col*/}
                          </div>{" "}
                        </Form>
                      );
                    }}
                  </Formik>
                </div>

                <div className="m-3 text-center text-muted">
                  <p className>
                    Already have an account ?{" "}
                    <NavLink to="/login" className="text-primary ml-2">
                      Log in
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
