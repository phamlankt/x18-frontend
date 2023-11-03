import React from "react";

function UploadFile({
  setFieldValue,
  setFieldTouched,
  errors,
  touched,
  fieldName,
  uploadedDocuments,
  setUploadedDocuments,
}) {
  const existedDocument = uploadedDocuments.filter(
    (docu) => docu.name === fieldName
  );
  const handleFileUpload = (e) => {
    setFieldValue(fieldName, e.target.files[0]);
    if (e.target.files[0]) {
      const fieldNameExist = uploadedDocuments.filter(
        (docu) => docu.name === fieldName
      );
      if (fieldNameExist && fieldNameExist.length > 0) {
        const updatedUploadedDocuments = uploadedDocuments.map((docu) => {
          if (docu.name === fieldName) {
            docu.file = e.target.files[0];
            docu.fileName = e.target.files[0].name;
            return { ...docu, file: docu.file, fileName: docu.fileName };
          }
          return docu;
        });
        setUploadedDocuments(updatedUploadedDocuments);
      } else {
        const newUploadedDocument = {
          name: fieldName,
          file: e.target.files[0],
          fileName: e.target.files[0].name,
        };

        setUploadedDocuments([...uploadedDocuments, newUploadedDocument]);
      }
    }
  };

  return (
    <div className="form-row">
      <div className="form-group col">
        <div className="form-group row">
          <div className="d-grid justify-content-center">
            <label
              htmlFor={fieldName}
              onClick={() => setFieldTouched({ fieldName }, true)}
            >
              {" "}
              {uploadedDocuments.length > 0 && existedDocument.length > 0 ? (
                <div className="form-upload text-danger ">
                  <p>{existedDocument[0].fileName}</p>
                </div>
              ) : (
                <div className="form-upload">
                  <p>
                    Click to upload{" "}
                    {fieldName.includes("other") ? "other document" : fieldName}
                  </p>
                </div>
              )}
            </label>
            {errors[fieldName] && touched[fieldName] && (
              <p className="text-danger form-error text-center">{errors[fieldName]}</p>
            )}
          </div>

          <input
            type="file"
            accept="application/pdf"
            id={fieldName}
            name={fieldName}
            style={{ display: "none" }}
            className={
              "form-control" +
              (errors[fieldName] && touched[fieldName] ? " is-invalid " : "")
            }
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
