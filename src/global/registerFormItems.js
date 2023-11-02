import {
  FaEnvelope,
  FaLock,
  FaLockOpen,
  FaPhoneFlip,
  FaUser,
} from "react-icons/fa6";

const registerFormItems = [
  {
    label: "Email Address",
    fieldName: "email",
    fieldIcon: <FaEnvelope />,
    type: "email",
  },

  {
    label: "Password",
    fieldName: "password",
    fieldIcon: <FaLock />,
    type: "password",
  },
  {
    label: "Confirm Password",
    fieldName: "conf_password",
    fieldIcon: <FaLockOpen />,
    type: "password",
  },
  {
    label: "Role",
    fieldName: "role",
    as: "select",
    options: [
      { value: "", name: "Choose a role ...", options: "disabled selected hidden" },
      {
        value: "recruiter",
        name: "Recruiter",
      },
      {
        value: "applicant",
        name: "Job Seeker",
      },
    ],
    adminOption: [
      { value: "", name: "Choose a role ...", options: "disabled selected hidden" },
      {
        value: "superadmin",
        name: "Superadmin",
      },
      {
        value: "admin",
        name: "Admin",
      },
    ],
  },
];

export { registerFormItems };
