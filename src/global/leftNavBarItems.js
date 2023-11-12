import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BsDashCircle } from "react-icons/bs";

function getItem(label, key, icon, children) {
  return {
    label,
    key,
    icon,
    children,
  };
}

const items = [
  getItem("Dashboard", "/admin", <BsDashCircle />),
  getItem("User", "/admin/user", <UserOutlined />),
  getItem("Job", "/admin/job", <PieChartOutlined />),
  getItem("Sector", "/admin/sector", <DesktopOutlined />),
];

export default items;
