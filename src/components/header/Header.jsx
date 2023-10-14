import React from "react";

function Header() {
  return (
    <div className="Header">
      <div className="menu">
        <img
          src="https://static.topcv.vn/v4/image/logo/topcv-logo-6.png"
          alt=""
          className="logo"
        />
        <button className="menuIcon">Việc Làm</button>
        <button className="menuIcon">Hồ Sơ & CV</button>
        <button className="menuIcon">Công Ty</button>
        <button className="menuIcon">Phát Triển Sự Nghiệp</button>
        <button className="menuIcon">Công Cụ</button>
      </div>
      <div className="navbar">
        <button className="navIconLogin">Đăng Nhập</button>
        <button className="navIconRegister">Đăng Kí</button>
        <button className="navIconPublishedRecruitment">
          Đăng Tuyển Và Tìm Hồ Sơ
        </button>
      </div>
    </div>
  );
}

export default Header;
