import React, { useContext, useState } from "react";
import { Button, Input, Modal } from "antd";
import AlertContext from "../../../contexts/AlertContext/AlertContext";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import * as yup from "yup";

const SectorForm = ({ sector, type }) => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (values) => {
    try {
      setLoading(true);
      //call api

      if (type === "add") {
      }
      if (type === "update") {
      }
      console.log(values.sector);
      handleAlertStatus({
        type: "success",
        message: "Remove job sucessfully!",
      });
    } catch (error) {
      handleAlertStatus({ type: "error", message: "Remove job failed!" });
    } finally {
      setTimeout(() => {
        setOpen(false);
        setLoading(false);
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      sector: sector ? sector.name : "",
    },
    validationSchema: yup.object({
      sector: yup
        .string()
        .required("Sector name is required")
        .max(50, "Must be 50 characters or less"),
    }),
    onSubmit: handleOk,
  });

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        style={{
          color: type === "add" ? "white" : "rgb(255, 187, 85)",
          border: type === "update" && "none",
          boxShadow: type === "update" && "none",
          fontSize: "14px",
          display: "grid",
          justifyContent: "center",
        }}
        onClick={showModal}
        type={type === "add" ? "primary" : "default"}
      >
        {type === "add" ? "Add Sector" : <FiEdit />}
      </Button>
      <Modal
        title={type === "add" ? "Add Sector" : "Update sector"}
        okButtonProps={{ disabled: formik.errors.sector }}
        okText={type === "add" ? "Add" : "Update"}
        open={open}
        onOk={formik.handleSubmit}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <form>
          <label htmlFor="delete-job">
            <p>Name:</p>
            <Input
              className="p-2"
              placeholder="Type the name of sector"
              required
              id="sector-input"
              name="sector-input"
              value={formik.values.sector}
              onChange={(e) => formik.setFieldValue("sector", e.target.value)}
            />
          </label>
          {formik.errors.sector && (
            <p className="text-danger">{formik.errors.sector}</p>
          )}
        </form>
      </Modal>
    </>
  );
};
export default SectorForm;
