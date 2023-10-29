import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isFileTypeValid =
    file.type === "image/jpeg" || file.type === "image/png";
  if (!isFileTypeValid) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt20M = file.size / 1024 / 1024 < 20;
  if (!isLt20M) {
    message.error("Image must smaller than 20MB!");
  }
  return isFileTypeValid && isLt20M;
};

function UploadCompanyLogo() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log("info.file", info.file);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = () => (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Company Logo"
          style={{
            width: "100%",
            // height:"100%"
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}

export default UploadCompanyLogo;
