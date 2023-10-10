import React, { useContext, useState } from "react";
import us_flag from "../../images/flags/us_flag.png";
import vn_flag from "../../images/flags/vn_flag.png";
import { Dropdown, Badge } from "react-bootstrap";
import {
  FaChevronDown,
  FaRegBell,
  FaRegUser,
  FaWallet,
  FaRegSun,
  FaPowerOff,
  FaBars,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext/AppContext";

const logo =
  "https://drive.google.com/uc?export=view&id=1kvFDWul0NlJiF4Pc5fCGAdMqXhWWkUPY";

const handleSeachAll = (data) => {};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const NavBar = () => {
  const [titleDropdown, setTitleDropdown] = useState("English");
  const [notification, setNotification] = useState([1, 2, 3]);
  const {
    handleLogout,
    auth: { user },
  } = useContext(AuthContext);
  const { leftSideBarOpen, handleLeftSideBarStatus } = useContext(AppContext);
  const selectItem = (select) => {
    console.log(select);
    if (select === "1") setTitleDropdown("English");
    else if (select === "2") setTitleDropdown("Tiếng Việt");
  };
  const navigate = useNavigate();
  const onHandleLogout = () => {
    localStorage.removeItem("accessToken");
    handleLogout();
    navigate("/login");
  };

  const handleNavBarOpen = () => {
    handleLeftSideBarStatus(!leftSideBarOpen);
  };
  return (
    <nav className="navbar-custom">
      <ul className="list-unstyled topbar-nav float-end mb-0">
        <li className="hidden-sm">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components3">
              <a
                className="nav-link dropdown-toggle waves-effect waves-light"
                href=""
              >
                {titleDropdown}
                <img
                  src={us_flag}
                  height="24"
                  alt="us_flag"
                  style={{ marginLeft: 5 }}
                />
                <FaChevronDown size={12} style={{ marginLeft: 5 }} />
              </a>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={(s) => selectItem("1")}>
                <span> English </span>
                <img
                  src={us_flag}
                  alt="us_flag"
                  className="ml-2 float-end"
                  height={18}
                />
              </Dropdown.Item>
              <Dropdown.Item onClick={(s) => selectItem("2")}>
                <span>Tiếng Việt </span>
                <img
                  src={vn_flag}
                  alt="vn_flag"
                  className="ml-2 float-end"
                  height={18}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="notification-list ">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components1">
              <a
                className="nav-link dropdown-toggle arrow-none waves-light waves-effect"
                href=""
              >
                <FaRegBell size={26} />
                <Badge
                  bg={notification.length === 0 ? "secondary" : "danger"}
                  className="badge-pill noti-icon-badge"
                >
                  {notification.length}
                </Badge>
              </a>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {notification.length === 0 ? (
                <Dropdown.Item>Không có thông báo nào.</Dropdown.Item>
              ) : (
                notification.map((e, index) => {
                  return (
                    <Dropdown.Item key={index} onClick={(s) => selectItem(e)}>
                      <span> Thông báo số {e} </span>
                      <span className="ml-2 float-end"> Date {e} </span>
                    </Dropdown.Item>
                  );
                })
              )}
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="dropdown">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components5">
              <a
                className="nav-link dropdown-toggle waves-effect waves-light nav-user"
                href=""
              >
                <img
                  src={user.avatarUrl ? user.avatarUrl : logo}
                  alt="profile-user"
                  className="rounded-circle mx-2"
                />
                <span className="ml-0 nav-user-name hidden-sm">
                  {user.username}
                </span>
                <FaChevronDown size={12} style={{ marginLeft: 5 }} />
              </a>
            </Dropdown.Toggle>

            <Dropdown.Menu className="me-2">
              <Dropdown.Item>
                <div>
                  <FaRegUser className="text-muted ms-2" />
                  <Link to="/profile" className="text-muted ms-2">
                    {" "}
                    Profile{" "}
                  </Link>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div>
                  <FaWallet className="text-muted ms-2" />
                  <span className="text-muted ms-2"> My Wallet </span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div>
                  <FaRegSun className="text-muted ms-2" />
                  <span className="text-muted ms-2"> Settings </span>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <div>
                  <FaPowerOff className="text-muted ms-2 text-danger" />
                  <button
                    onClick={onHandleLogout}
                    className="text-muted ms-2 btn btn-danger"
                  >
                    {" "}
                    Logout{" "}
                  </button>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
      <ul className="list-unstyled topbar-nav mb-0">
        <li>
          <button
            onClick={handleNavBarOpen}
            className="nav-link button-menu-mobile waves-effect waves-light"
          >
            <FaBars className="nav-icon" />
          </button>
        </li>
        <li className="hide-phone app-search">
          <form role="search" className="">
            <input
              type="text"
              id="AllCompo"
              placeholder="Search..."
              className="form-control"
            />
            <a href="" onClick={(e) => e.preventDefault()}>
              <FaMagnifyingGlass size={18} />
            </a>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
