import { useState } from "react";
import DefaultHeader from "./AdminHeader";
import items from "../../global/leftNavBarItems";
import { Breadcrumb, Layout, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;

const AdminMasterLayout = (props) => {
  const HeaderComponent = props.HeaderComponent || <DefaultHeader />;
  const ContentComponent = props.ContentComponent || <></>;

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const pathnames = window.location.pathname.split("/").splice(1);

  const breadcrumbItems = pathnames.map((item, index) => {
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;
    return {
      title: (
        <NavLink to={href}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </NavLink>
      ),
      key: href,
    };
  });

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
      }}
      className="admin-master-layout"
    >
      <Header
        style={{
          padding: 0,
          background: "white",
        }}
      >
        {HeaderComponent}
      </Header>
      <Layout hasSider>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="dark"
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/admin"]}
            selectedKeys={[window.location.pathname]}
            items={items}
            onSelect={(value) => {
              navigate(value.key);
            }}
          />
        </Sider>
        <div className="admin-master-layout-content-container">
          <Breadcrumb
            style={{
              margin: "16px",
            }}
            separator=">"
            items={breadcrumbItems}
          ></Breadcrumb>
          <Content className="">
            <div className="admin-master-layout-content">
              {ContentComponent}
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};
export default AdminMasterLayout;
