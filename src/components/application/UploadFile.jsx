import { Delete, DeleteIcon, Trash, Trash2 } from "lucide-react";
import React from "react";
import { useRef } from "react";
function UploadFile({
  setFieldValue,
  setFieldTouched,
  errors,
  touched,
  fieldName,
  uploadedDocuments,
  setUploadedDocuments,
  documents,
  setDocuments,
}) {
  const inputElement = useRef();
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

  const removeDocument = (fieldN) => {
    const updatedUploadedDocuments = uploadedDocuments.filter(
      (docu) => docu.name !== fieldN
    );
    setUploadedDocuments(updatedUploadedDocuments);
    const updatedDocuments = documents.filter((docu) => {
      if (fieldN === "CV" || fieldN === "Cover Letter") return true;
      else return docu !== fieldN;
    });
    setDocuments(updatedDocuments);
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
              <div className="form-upload text-primary">
                {uploadedDocuments.length > 0 && existedDocument.length > 0 ? (
                  <>
                    <p>{existedDocument[0].fileName}</p>
                  </>
                ) : (
                  <>
                    <p
                      style={{ cursor: "pointer" }}
                      className={
                        fieldName.includes("other") ? "fs-3" : undefined
                      }
                    >
                      + {fieldName.includes("other") ? "" : fieldName}
                    </p>
                  </>
                )}
              </div>
            </label>

            <div
              className="text-center w-100"
              style={{ backgroundColor: "#c6c1c1" }}
            >
              <div
                style={{ cursor: "pointer" }}
                className="my-1 text-danger"
                onClick={async () => {
                  inputElement.current.value = "";
                  // setFieldValue(fieldName , null)
                  removeDocument(fieldName);
                  await setFieldTouched({ fieldName }, true);
                }}
              >
                <Trash2 />
              </div>
            </div>

            {errors[fieldName] && touched[fieldName] && (
              <p className="text-danger form-error text-center">
                {errors[fieldName]}
              </p>
            )}
          </div>

          <input
            type="file"
            accept="application/pdf"
            ref={inputElement}
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
