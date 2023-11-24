import {
  FaFacebookF,
  FaGoogle,
  FaLock,
  FaRightToBracket,
  FaTwitter,
} from "react-icons/fa6";
import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";
import authAPI from "../apis/authAPI";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginFormItems } from "../global/loginFormItems";
import ForgotPasswordModal from "../components/forgotPassword/ForgotPasswordModal";
import AppContext from "../contexts/AppContext/AppContext";

const Login = () => {
  const { previousPage, handlePreviousPage } = useContext(AppContext);
  const { socket } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .concat(Yup.string().required("Password is required"))
      .min(6, "Password must be at least 6 characters"),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  async function onSubmit(values) {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login({
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("accessToken", response.data.data.accessToken);

      const userInfo = await handleLogin();
      // socket &&
      //   socket.emit("newUser", { id: userInfo._id, email: userInfo.email });
      if (userInfo.roleName === "superadmin" || userInfo.roleName === "admin") {
        navigate("/admin");
      } else {
        if (previousPage) {
          navigate(previousPage);
          handlePreviousPage("");
        } else navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  return (
    <>
      <div className="container account-body">
        <div className="row vh-100 ">
          <div className="col-12 align-self-center">
            <div className="auth-page">
              <div className="card auth-card shadow-lg">
                <div className="card-body">
                  <div className="px-3">
                    <Formik
                      enableReinitialize
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({ errors, touched, isSubmitting, setFieldValue }) => {
                        return (
                          <Form className="form-horizontal auth-form my-4">
                            {loginFormItems.map((item) => {
                              return (
                                <div
                                  key={item.fieldName}
                                  className="form-group col"
                                >
                                  <label>{item.label}</label>
                                  <Field
                                    name={item.fieldName}
                                    type={item.type ? item.type : "text"}
                                    placeholder={`Enter ${item.label}`}
                                    className={
                                      "form-control" +
                                      (errors[item.fieldName] &&
                                      touched[item.fieldName]
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name={item.fieldName}
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                              );
                            })}

                            <div className="form-row">
                              {error && <p className="text-danger">{error}</p>}
                              <div className="form-group row mt-4">
                                <div className="col-sm-6">
                                  <input
                                    className="ms-3"
                                    id="rememberMeCheckbox"
                                    type="checkbox"
                                  />
                                  <label
                                    className="ms-1"
                                    htmlFor="rememberMeCheckbox"
                                  >
                                    Remember me
                                  </label>
                                </div>
                                <div className="col-sm-6 text-right">
                                  <a
                                    onClick={() =>
                                      setForgotPasswordModalOpen(true)
                                    }
                                    className="text-muted font-13"
                                  >
                                    <FaLock className="dripicons-lock me-1 mb-1" />
                                    Forgot password?
                                  </a>
                                </div>
                              </div>
                              <div className="form-group mb-0 row">
                                <div className="col-12 mt-2">
                                  <button
                                    className="btn btn-gradient-primary btn-round btn-block waves-effect waves-light"
                                    type="submit"
                                  >
                                    {loading ? "Loading" : "Login"}
                                    <FaRightToBracket className="fas fa-sign-in-alt ml-1" />
                                  </button>
                                </div>
                              </div>{" "}
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                  <div className="m-3 text-center text-muted">
                    <p className>
                      Don't have an account ?{" "}
                      <NavLink to="/register" className="text-primary ml-2">
                        Free Register
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
              <div className="account-social text-center mt-4">
                <h6 className="my-4">Or Login With</h6>
                <ul className="list-inline mb-4 d-flex justify-content-center">
                  <li className="list-inline-item">
                    <a href className="facebook">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href className="twitter">
                      <FaTwitter />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href className="google">
                      <FaGoogle />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        show={forgotPasswordModalOpen}
        handleClose={() => setForgotPasswordModalOpen(false)}
      />
    </>
  );
};

export default Login;
