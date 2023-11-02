import { Field, ErrorMessage } from "formik";

function ModalFormFileItem({ item, isEditMode, errors, touched }) {
  return (
    <div className="form-row">
      <div className="form-group col">
        <label>
          {item.label}
          {item.isRequired && (
            <span>
              (<span className="text-danger">*</span>)
            </span>
          )}
        </label>
        <Field
          name={item.fieldName}
          disabled={item.fieldName === "email" && isEditMode}
          type={item.type && item.type}
          as={item.as && item.as}
          multiple={item.as && item.fieldName === "businessSector" && true}
          size={item.as && item.fieldName === "businessSector" && 3}
          rows={item.as && item.as === "textarea" && "3"}
          className={
            "form-control" +
            (errors[item.fieldName] && touched[item.fieldName]
              ? " is-invalid "
              : "")
          }
        >
          {item.options &&
            item.options.map((option) => (
              <option key={option.value} value={option.value}>
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
    </div>
  );
}

export default ModalFormFileItem;
