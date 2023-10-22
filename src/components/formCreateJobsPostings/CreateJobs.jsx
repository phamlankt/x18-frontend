import { useFormik } from "formik";
import * as Yup from "yup";

// title,
// deadline,
// sectors,
// salary,
// location,
// city,
// position,
// amount,
// description,

const CreateJobs = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      deadline: "",
      sectors: "",
      salary: "",
      location: "",
      city: "",
      position: "",
      amount: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(15, "Tên Phải Nhiều Hơn 5 Kí Tự !")
        .required("Không Được Bỏ Trống Tên !"),
      deadline: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
      sectors: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
      salary: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
      location: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
      city: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
      position: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
      amount: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
      description: Yup.string().required("Không Được Bỏ Trống Mật Khẩu !"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="createJobsForm">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">title:</label>
        <textarea
          name="title"
          id="title"
          cols="60"
          rows="10"
          value={formik.values.title}
          style={{ width: "500px" }}
          className="form-control"
          onChange={(e) => formik.setFieldValue("title", e.target.value)}
        ></textarea>

        <p>
          {formik.errors.title && formik.touched.title
            ? formik.errors.title
            : null}
        </p>

        <input
          type="date"
          value={formik.values.deadline}
          name="deadline"
          onChange={formik.handleChange}
          placeholder="Điền Mật Khẩu Đăng Kí ."
          className="form-control"
          style={{ width: "200px" }}
        />

        <p>
          {formik.errors.deadline && formik.touched.deadline
            ? formik.errors.deadline
            : null}
        </p>

        <label htmlFor="sel1">Sectors:</label>
        <select
          className="form-control"
          style={{ width: "200px" }}
          id="sel1"
          name="sectors"
        >
          <option>IT</option>
          <option>Makerting</option>
        </select>
        <p>
          {formik.errors.confirmPassword && formik.touched.confirmPassword
            ? formik.errors.confirmPassword
            : null}
        </p>

        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          value={formik.values.salary}
          name="salary"
          onChange={formik.handleChange}
          className="form-control"
          style={{ width: "200px" }}
        />

        <label htmlFor="location">location:</label>
        <input
          type="text"
          value={formik.values.location}
          name="location"
          onChange={formik.handleChange}
          className="form-control"
          style={{ width: "200px" }}
        />

        <label htmlFor="city">City:</label>
        <select
          className="form-control"
          name="city"
          style={{ width: "200px" }}
          id="city"
          value={formik.values.city}
          onChange={(e) => formik.setFieldValue("city", e.target.value)}
        >
          <option>HCM</option>
          <option>Ha Noi</option>
        </select>

        <label htmlFor="position">position:</label>
        <select
          className="form-control"
          name="position"
          style={{ width: "200px" }}
          id="position"
          value={formik.values.position}
          onChange={(e) => formik.setFieldValue("position", e.target.value)}
        >
          <option>staff</option>
          <option>manager</option>
        </select>

        <label htmlFor="amount">amount:</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          style={{ width: "200px" }}
        />

        <label htmlFor="description">description:</label>
        <textarea
          name="description"
          id="description"
          cols="60"
          rows="10"
          value={formik.values.description}
          style={{ width: "500px" }}
          className="form-control"
          onChange={(e) => formik.setFieldValue("description", e.target.value)}
        ></textarea>

        <button
          className="bg-black hover:bg-gray-800 text-white font-xs text-sm py-2 px-4 rounded-md w-80 h-9 mt-2"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateJobs;
