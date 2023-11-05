import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import AlertContext from "../../../contexts/AlertContext/AlertContext";
import jobAPI from "../../../apis/jobAPI";
import { formatDate } from "../../../utils/fomatDate";
const DeleteJobModal = ({ job }) => {
  const { handleAlertStatus } = useContext(AlertContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState(job?.removeDescription || "");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      //call api
      const res = await jobAPI.adminRemove({ jobId: job._id, reason });
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

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" danger onClick={showModal}>
        Remove
      </Button>
      <Modal
        title="Confirm Remove Job"
        okButtonProps={{ danger: true }}
        okText="Remove"
        open={open}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <form>
          <label htmlFor="delete-job">
            <p>Reason for deleting the job:</p>
            <textarea
              className="p-2"
              placeholder="Type the reason for removing this job..."
              maxlength="100"
              rows="4"
              cols="70"
              required
              id="delete-job"
              name="delete-job"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
        </form>
      </Modal>
    </>
  );
};
export default DeleteJobModal;
