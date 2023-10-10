import { FaLock, FaUser } from "react-icons/fa6";

const loginFormItems = [
  {
    label: "Email Address",
    fieldName: "email",
    fieldIcon: <FaUser/>
  },
  {
    label: "Password",
    fieldName: "password",
    fieldIcon: <FaLock/>,
    type:"password"
  },
];

export { loginFormItems };
