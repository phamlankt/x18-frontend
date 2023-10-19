import { Layout } from "antd";
import HeaderComponent from "./Header";
import FooterComponent from "./Footer";
import React from "react";
import Filter from "../homePage/Filter";

const { Header, Content, Footer, Sider } = Layout;
const MasterLayout = ({ children, leftSideComponent }) => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9,
          width: "100%",
          backgroundColor: "#ffffff",
          padding: 0,
        }}
      >
        <HeaderComponent />
      </Header>
      <Layout>
        <Sider width={300} theme="light">
          {leftSideComponent}
        </Sider>
        <Content
          style={{
            zIndex: 9,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {children}
        </Content>
      </Layout>
      <Footer
        style={{
          position: "relative",
          bottom: 0,
          zIndex: 9,
          width: "100%",
          backgroundColor: "#ffffff",
          padding: 0,
        }}
      >
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default MasterLayout;
