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
  getItem("Other", "/admin/other", <DesktopOutlined />, [
    getItem("Price", "/admin/price"),
    getItem("Position", "/admin/position"),
    getItem("Sector", "/admin/sector"),
  ]),
];

export default items;
