import React, { useContext, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import Recoil from "../../recoilContextProvider";
import userAPI from "../../apis/userAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";

function Avatar() {
  const { auth, handleLogin } = useContext(AuthContext);
  const { handleAlertStatus } = useContext(AlertContext);
  const [checkDataUpdate, setCheckDataUpdate] = useRecoilState(
    Recoil.AtomCheckDataUser
  );
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      await userAPI.uploadAvatar(formData);
      handleLogin();
      handleAlertStatus({
        type: "success",
        message: "Upload avatar image sucessfully!",
      });
      setCheckDataUpdate(false);
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
    <div className="d-flex flex-column align-items-center text-center">
      <div
        className="d-flex justify-content-center align-items-center rounded-circle mt-5 overflow-hidden"
        style={{
          width: "150px",
          height: "150px",
        }}
      >
        <img
          alt="avatar"
          width={150}
          src={
            auth.user?.avatarUrl ||
            "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          }
        />
      </div>

      <span className="fw-bold">{auth.user.username}</span>
      <div className="mb-3 mt-3">
        <label
          className="btn-primary btn"
          htmlFor="formFile"
          onChange={handleFileUpload}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          {loading ? "Uploading..." : "Upload Image"}
        </label>

        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={handleFileUpload}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default Avatar;
