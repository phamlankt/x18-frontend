const profileModalFormItems = [
  {
    label: "Full name",
    fieldName: "fullName",
  },
  {
    label: "Email",
    fieldName: "email",
  },
  {
    label: "Phone Number",
    fieldName: "phone",
  },
  {
    label: "Address",
    fieldName: "address",
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

const kiotProfileModalFormItems = [
  {
    label: "Kiot Name",
    fieldName: "kiotName",
  },
  {
    label: "Kiot Phone",
    fieldName: "kiotPhone",
  },
  {
    label: "Kiot Address",
    fieldName: "kiotAddress",
  },
  {
    label: "Kiot Email",
    fieldName: "kiotEmail",
  },
  {
    label: "Kiot Description",
    fieldName: "description",
    as: "textarea",
  },
];

export {
  profileModalFormItems,
  passwordProfileModal,
  kiotProfileModalFormItems,
};
