import { useFormik } from "formik";
import * as Yup from "yup";
import cities from "../../global/data/VNLocaion.json";
import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const positions = [
  "intern",
  "fresher",
  "junior",
  "senior",
  "lead",
  "manager",
  "director",
  "partime",
];

const JobForm = (props) => {
  const { job, type } = props;
  const [sectors, setSectors] = useState([]);
  const [logoReview, setLogoReview] = useState("");

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
        .min(6, "Title must be at least 6 characters"),
      companyLogo: Yup.mixed().required("Company logo is required"),
      deadline: Yup.string()
        .required("Deadline is required")
        .min(new Date().toISOString(), "Deadline must be in the future"),
      salary: Yup.string().required("Salary is required"),
      location: Yup.string().required("Location is required"),
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
        .test(
          "check",
          "Sectors is invalid",
          (value) =>
            Array.isArray(value) &&
            value.every((item) => sectors.includes(item))
        ),
    }),

    onSubmit: (values) => {
      console.log(values);
      console.log("hihi");
    },
  });
  return (
    <div className="job-form-container container-sm">
      <form onSubmit={formik.handleSubmit} className="job-form p-5">
        <div className="form-group row">
          <label htmlFor="title">
            <p>Job Title:</p>
            <input
              placeholder="Enter job tilte.."
              type="text"
              id="title"
              name="title"
              style={{ border: formik.errors.title && "1px solid red" }}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.errors.title && formik.touched.title && (
            <p className="text-danger form-error">{formik.errors.title}</p>
          )}
        </div>

        <div className="form-group row">
          <label htmlFor="companyLogo">
            <p>
              Company Logo:{" "}
              <i style={{ fontSize: "12px" }}>(Recommended scale: 1:1)</i>
            </p>
            <input
              placeholder="logo"
              type="file"
              accept="image/*"
              id="companyLogo"
              name="companyLogo"
              style={{ border: formik.errors.companyLogo && "1px solid red" }}
              value={formik.values.companyLogo}
              onChange={(e) => {
                formik.handleChange(e);
                e.target.files[0]
                  ? setLogoReview(URL.createObjectURL(e.target.files[0]))
                  : setLogoReview("");
              }}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.errors.companyLogo && formik.touched.companyLogo && (
            <p className="text-danger form-error">
              {formik.errors.companyLogo}
            </p>
          )}
        </div>
        {logoReview && (
          <div className="form-group row display-grid justify-content-center">
            <img
              src={logoReview}
              alt="logo review"
              style={{ width: 150, height: 150, padding: 0 }}
            />
          </div>
        )}

        <div className="form-group row">
          <div className="col-3">
            <label htmlFor="">
              <p>Deadline:</p>
            </label>
            <Datepicker
              id="deadline"
              name="deadline"
              style={{
                border: formik.errors.deadline && "1px solid red",
                display: "inline-block",
                width: "fit-content",
              }}
              selected={formik.values.deadline || new Date()}
              onChange={(date) => {
                formik.setFieldValue("deadline", date);
              }}
              minDate={new Date()}
            />
          </div>

          <div className="col-3">
            <label htmlFor="deadline">
              <p>Deadline:</p>

              <Datepicker
                id="deadline"
                name="deadline"
                style={{
                  border: formik.errors.deadline && "1px solid red",
                }}
                selected={formik.values.deadline || new Date()}
                onChange={(date) => {
                  formik.setFieldValue("deadline", date);
                }}
                minDate={new Date()}
              />
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;
