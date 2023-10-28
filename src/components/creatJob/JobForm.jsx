import { useFormik } from "formik";
import * as Yup from "yup";
import cities from "../../global/data/VNLocaion.json";
import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import businessSectorAPI from "../../apis/businessSectorAPI";
import { Spinner } from "react-bootstrap";
import jobAPI from "../../apis/jobAPI";
import AlertContext from "../../contexts/AlertContext/AlertContext";
import { useContext } from "react";
import Loading from "../layout/Loading";
import Error from "../layout/Error";

const positions = [
  "Intern",
  "Fresher",
  "Junior",
  "Senior",
  "Lead",
  "Manager",
  "Director",
  "Partime",
];
const salaries = [
  "Negotiable",
  "0-100",
  "100-200",
  "200-400",
  "400-600",
  "600-800",
  "800-1000",
  "1000-3000",
  "3000+",
];

const JobForm = (props) => {
  const { job, type } = props;
  const { handleAlertStatus } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sectors, setSectors] = useState("");
  const [logoReview, setLogoReview] = useState(job ? job.companyLogo : "");

  useEffect(() => {
    const handleGetSectors = async () => {
      try {
        setLoading(true);
        const res = await businessSectorAPI.getAll();
        setSectors(
          res.data.data.businessSectorList.map((sector) => ({
            label: sector.name,
            value: sector.name,
          }))
        );
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    handleGetSectors();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: job ? job.title : "",
      companyLogo: job ? job.companyLogo : "",
      deadline: job ? job.deadline : "",
      salary: job ? job.salary : "",
      location: job ? job.location : "",
      city: job ? job.city : "",
      position: job ? job.position : "",
      description: job ? job.description : "",
      sectors: job ? job.sectors : [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(6, "Title must be at least 6 characters")
        .max(100, "Title must be at most 100 characters"),
      companyLogo: Yup.mixed().required("Company logo is required"),
      deadline: Yup.string()
        .required("Deadline is required")
        .test(
          "is-future-date",
          "Deadline must be in the future",
          (value) => Date.parse(value) > Date.now()
        ),
      salary: Yup.string().required("Salary is required"),
      location: Yup.string()
        .required("Location is required")
        .min(6, "Location must be at least 6 characters"),
      city: Yup.string()
        .required("City is required")
        .oneOf(
          cities.map((item) => item.slug),
          "City is invalid"
        ),
      position: Yup.string()
        .required("Position is required")
        .oneOf(positions, "Position is invalid"),
      description: Yup.mixed().required("Description is required"),
      sectors: Yup.array()
        .required("Sectors is required")
        .test("is-valid", "Sectors is required", (value) => value.length > 0),
    }),

    onSubmit: async (values) => {
      await handleSubmitForm(values);
      formik.resetForm();
    },
  });

  const handleSubmitForm = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (let key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      if (type === "create") {
        const res = await jobAPI.create(formData);
        handleAlertStatus({
          type: "success",
          message: res.data.message,
        });
      } else {
        const res = await jobAPI.update(job.id, formData);
        handleAlertStatus({
          type: "success",
          message: res.data.message,
        });
      }

      formik.resetForm();
      setLogoReview("");
    } catch (error) {
      handleAlertStatus({
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      });
      setError(error.response);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="job-form-container container-sm">
      <h3>{type === "create" ? "Create Job" : "Update Job"}</h3>
      <form onSubmit={formik.handleSubmit} className="job-form p-5">
        <div className="form-group row">
          <p>Job Title:</p>
          <label htmlFor="title">
            <input
              placeholder="Enter job tilte.."
              type="text"
              id="title"
              name="title"
              style={{
                border:
                  formik.errors.title &&
                  formik.touched.title &&
                  "1px solid red",
              }}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.title && formik.touched.title && (
              <p className="text-danger form-error">{formik.errors.title}</p>
            )}
          </label>
        </div>
        {/*  */}
        <div className="form-group row">
          <p>
            Company Logo:{" "}
            <i style={{ fontSize: "12px" }}>(Recommended scale: 1:1)</i>
          </p>

          <div className="d-grid justify-content-center">
            <label
              htmlFor="companyLogo"
              onClick={() => formik.setFieldTouched("companyLogo", true)}
            >
              {logoReview ? (
                <img
                  src={logoReview}
                  alt="logo review"
                  style={{ width: 150, height: 150, padding: 0 }}
                />
              ) : (
                <div className="form-upload">
                  <p>click to upload</p>
                </div>
              )}
              {formik.errors.companyLogo && formik.touched.companyLogo && (
                <p className="text-danger form-error">
                  {formik.errors.companyLogo}
                </p>
              )}
            </label>
          </div>

          <input
            placeholder="logo"
            type="file"
            accept="image/*"
            id="companyLogo"
            name="companyLogo"
            style={{ display: "none" }}
            onChange={(e) => {
              formik.setFieldValue("companyLogo", e.target.files[0]);
              e.target.files[0]
                ? setLogoReview(URL.createObjectURL(e.target.files[0]))
                : setLogoReview("");
            }}
          />
        </div>
        {/*  */}
        <div className="form-group row">
          <div className="col-4">
            <p>Deadline:</p>
            {formik.errors.deadline && formik.touched.deadline && (
              <p className="text-danger form-error">{formik.errors.deadline}</p>
            )}
            <label htmlFor=""></label>
            <Datepicker
              id="deadline"
              name="deadline"
              selected={formik.values.deadline || new Date()}
              onChange={(date) => {
                formik.setFieldValue("deadline", date);
              }}
              onBlur={formik.handleBlur}
              minDate={new Date()}
            />
          </div>

          <div className="col-4">
            <label htmlFor="location">
              <p>Location:</p>

              <input
                id="location"
                name="location"
                placeholder="Enter location.."
                style={{
                  border:
                    formik.errors.location &&
                    formik.touched.location &&
                    "1px solid red",
                }}
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.location && formik.touched.location && (
                <p className="text-danger form-error">
                  {formik.errors.location}
                </p>
              )}
            </label>
          </div>

          <div className="col-4">
            <label htmlFor="city">
              <p>City:</p>
              <Select
                mode="tag"
                showSearch={true}
                placeholder="Select City"
                style={{
                  border:
                    formik.errors.city &&
                    formik.touched.city &&
                    "1px solid red",
                }}
                value={formik.values.city || undefined}
                onChange={(value) => {
                  formik.setFieldValue("city", value);
                }}
                options={cities.map((city) => ({
                  label: city.name,
                  value: city.slug,
                }))}
              />
              {formik.errors.city && formik.touched.city && (
                <p className="text-danger form-error">{formik.errors.city}</p>
              )}
            </label>
          </div>
        </div>
        {/*  */}
        <div className="form-group row">
          <div className="col-4">
            <label htmlFor="salary">
              <p>Salary (USD):</p>
              <Select
                mode="tag"
                showSearch={true}
                placeholder="Select Salary"
                style={{
                  border:
                    formik.errors.salary &&
                    formik.touched.salary &&
                    "1px solid red",
                }}
                value={formik.values.salary || undefined}
                onChange={(value) => {
                  formik.setFieldValue("salary", value);
                }}
                options={salaries.map((salary) => ({
                  label: salary,
                  value: salary,
                }))}
              />
              {formik.errors.salary && formik.touched.salary && (
                <p className="text-danger form-error">{formik.errors.salary}</p>
              )}
            </label>
          </div>

          <div className="col-4">
            <label htmlFor="position">
              <p>Position:</p>

              <Select
                mode="tag"
                placeholder="Select Position"
                showSearch={true}
                style={{
                  border:
                    formik.errors.position &&
                    formik.touched.position &&
                    "1px solid red",
                }}
                value={formik.values.position || undefined}
                onChange={(value) => {
                  formik.setFieldValue("position", value);
                }}
                options={positions.map((position) => ({
                  label: position,
                  value: position,
                }))}
              />

              {formik.errors.position && formik.touched.position && (
                <p className="text-danger form-error">
                  {formik.errors.position}
                </p>
              )}
            </label>
          </div>

          <div className="col-4">
            <label htmlFor="sectors">
              <p>Sectors:</p>

              <Select
                mode="multiple"
                style={{
                  border:
                    formik.errors.sectors &&
                    formik.touched.sectors &&
                    "1px solid red",
                }}
                placeholder="Select Sectors"
                allowClear={true}
                value={formik.values.sectors || undefined}
                onClear={() => {
                  formik.setFieldValue("sectors", "");
                }}
                options={sectors}
                onChange={(value) => {
                  formik.setFieldValue("sectors", value);
                }}
                onInputKeyDown={() => {
                  formik.setFieldTouched("sectors", true);
                }}
              />

              {formik.errors.sectors && formik.touched.sectors && (
                <p className="text-danger form-error">
                  {formik.errors.sectors}
                </p>
              )}
            </label>
          </div>
        </div>
        {/*  */}
        <div className="form-group row">
          <ReactQuill
            className="quill"
            theme="snow"
            value={formik.values.description}
            onChange={(value) => {
              formik.setFieldValue("description", value);
            }}
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-danger form-error">
              {formik.errors.description}
            </p>
          )}
        </div>
        <div className="form-group row d-grid justify-content-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
