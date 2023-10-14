import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import userAPI from "../../apis/userAPI";

function Avatar() {
  const { auth, handleLogin } = useContext(AuthContext);
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
      <img
        className="rounded-circle mt-5"
        width="150px"
        src={
          auth.user?.avatarUrl ||
          "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
        }
      />
      <span className="fw-bold">{auth.user.username}</span>
      <div className="mb-3 mt-3">
        <label
          className="btn-primary btn"
          for="formFile"
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
