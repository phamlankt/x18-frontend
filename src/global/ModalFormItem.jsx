import { Field, ErrorMessage } from "formik";
import { Select } from "antd";
import React, { useState } from "react";

function ModalFormItem({
  item,
  isEditMode,
  errors,
  touched,
  setFieldTouched,
  setFieldValue,
}) {
  const fieldName = item.fieldName;
  const [value, setValue] = useState();
  return (
    <div className="form-row">
      {item.as === "select" ? (
        <div className="form-group col">
          <label
            htmlFor={item.fieldName}
            onClick={() => setFieldTouched({ fieldName }, true)}
          >
            {item.label}
          </label>

          <Select
            id={item.fieldName}
            name={item.fieldName}
            style={{
              width: "100%",
              backgroundColor: "white",
              margin: " 4px 0px",
              borderRadius: "4px",
            }}
            bordered={false}
            allowClear={true}
            placeholder={`Choose your ${item.fieldName}`}
            onChange={(e) => {
              setValue(e);
              setFieldValue(item.fieldName, e.toLowerCase());
            }}
            value={value}
            options={item.options.map((value) => ({
              label: value.name,
              value: value.name,
            }))}
          />
          {errors[item.fieldName] && touched[item.fieldName] && (
            <p className="text-danger form-error">{errors[item.fieldName]}</p>
          )}
        </div>
      ) : (
        <div className="form-group col">
          <label>
            {item.label}
            {item.isRequired && (
              <span>
                (<span className="text-danger">*</span>)
              </span>
            )}
            :
          </label>
          <Field
            name={item.fieldName}
            disabled={item.fieldName === "email" && isEditMode}
            type={item.type && item.type}
            as={item.as && item.as}
            rows={item.as && item.as === "textarea" && "3"}
            className={
              "form-control" +
              (errors[item.fieldName] && touched[item.fieldName]
                ? " is-invalid "
                : "")
            }
          />
          <ErrorMessage
            name={item.fieldName}
            component="div"
            className="invalid-feedback"
          />
        </div>
      )}
    </div>
  );
}

export default ModalFormItem;
