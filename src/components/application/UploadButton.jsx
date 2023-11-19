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
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "application/pdf";
  if (!isFileTypeValid) {
    message.error("You can only upload JPG/PNG/PDF file!");
  }
  const isLt100M = file.size / 1024 / 1024 < 100;
  if (!isLt100M) {
    message.error("Image must smaller than 2MB!");
  }
  return isFileTypeValid && isLt100M;
};

function UploadButton({ documentName }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [uploadedDocument, setUploadedDocument] = useState({});
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (documentName) => (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {documentName}
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
      {imageUrl
        ? uploadButton(`${documentName} Uploaded`)
        : uploadButton(documentName)}
    </Upload>
  );
}

export default UploadButton;
