import { Layout } from "antd";
import HeaderComponent from "./Header";
import FooterComponent from "./Footer";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;
const MasterLayout = (props) => {
  const HeaderContent = props.HeaderComponent || <HeaderComponent />;
  const FooterContent = props.FooterComponent || <FooterComponent />;
  const sideBarContent = props.sideBarComponent || <></>;
  const mainContent = props.contentComponent || <></>;
  const hasHeader = props.hasHeader || true;
  const hasFooter = props.hasFooter || true;
  const hasSideBar = props.hasSideBar || true;

  return (
    <Layout className="master-layout">
      {hasHeader && (
        <Header className="master-layout-header">{HeaderContent}</Header>
      )}

      <Layout hasSider className="master-layout-main-content-container">
        {hasSideBar && (
          <Sider width="350px" className="master-layout-leftside">
            {sideBarContent}
          </Sider>
        )}

        <Content className="master-layout-main-content">{mainContent}</Content>
      </Layout>
      {hasFooter && (
        <Footer className="master-layout-footer">{FooterContent}</Footer>
      )}
    </Layout>
  );
};

export default MasterLayout;
