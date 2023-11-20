import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import AlertContext from "../../../contexts/AlertContext/AlertContext";
import jobAPI from "../../../apis/jobAPI";
import { formatDate } from "../../../utils/fomatDate";
import { useFormik } from "formik";
import * as yup from "yup";
const DeleteJobModal = ({ job }) => {
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
      const res = await jobAPI.adminRemove({
        jobId: job._id,
        reason: values.reason,
      });
      //update client
      job.updateDataFn((prevList) =>
        prevList.map((job) =>
          job._id !== res.data.data.jobInfo._id
            ? job
            : {
                ...res.data.data.jobInfo,
                createdAt: formatDate(res.data.data.jobInfo.createdAt),
                deadline: formatDate(res.data.data.jobInfo.deadline),
              }
        )
      );

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
      reason: "",
    },
    validationSchema: yup.object({
      reason: yup
        .string()
        .required("Reason is required")
        .max(1000, "Must be 100 characters or less"),
    }),
    onSubmit: handleOk,
  });

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        danger
        onClick={showModal}
        disabled={job.status === "removed" ? true : false}
      >
        Remove
      </Button>
      <Modal
        title="Confirm Remove Job"
        okButtonProps={{ danger: true, disabled: formik.errors.reason }}
        okText="Remove"
        open={open}
        onOk={formik.handleSubmit}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <form>
          <label htmlFor="delete-job" style={{ width: "100%" }}>
            <p>Reason for deleting the job:</p>
            <textarea
              style={{ width: "100%" }}
              className="p-2"
              placeholder="Type the reason for removing this job..."
              maxlength="100"
              rows="4"
              cols="70"
              required
              id="delete-job"
              name="delete-job"
              value={formik.values.reason}
              onChange={(e) => formik.setFieldValue("reason", e.target.value)}
            />
          </label>
          {formik.errors.reason && (
            <p className="text-danger">{formik.errors.reason}</p>
          )}
        </form>
      </Modal>
    </>
  );
};
export default DeleteJobModal;
