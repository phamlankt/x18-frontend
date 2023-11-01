const profileModalFormItems_recruiter = [
  {
    label: "Company Name",
    fieldName: "companyName",
  },
  {
    label: "Email",
    fieldName: "email",
  },
  {
    label: "Phone Number",
    fieldName: "phoneNumber",
  },
  {
    label: "Address",
    fieldName: "address",
  },
  {
    label: "Company Description",
    fieldName: "description",
    as: "textarea",
  },
  // {
  //   label: "Company Logo",
  //   fieldName: "companyLogoUrl",
  //   type: "file",
  // },
];

const profileModalFormItems_applicant = [
  {
    label: "Full Name",
    fieldName: "fullName",
  },
  {
    label: "Age",
    fieldName: "age",
  },
  {
    label: "Gender",
    fieldName: "gender",
    as: "select",
    options: [
      { name: "Male", value: "male" },
      { name: "Female", value: "female" },
    ],
  },
  {
    label: "Email",
    fieldName: "email",
  },
  {
    label: "Phone Number",
    fieldName: "phoneNumber",
  },
  {
    label: "Address",
    fieldName: "address",
  },
  {
    label: "Self Description",
    fieldName: "description",
    as: "textarea",
  },
];

const profileModalFormItems_default = [
  {
    label: "Full Name",
    fieldName: "fullName",
  },
  {
    label: "Email",
    fieldName: "email",
  },
  {
    label: "Phone Number",
    fieldName: "phoneNumber",
  },
];

const passwordProfileModal = [
  {
    label: "Password",
    type: "password",
    fieldName: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
    fieldName: "confirmPassword",
  },
];

export {
  profileModalFormItems_default,
  profileModalFormItems_recruiter,
  profileModalFormItems_applicant,
  passwordProfileModal,
};
