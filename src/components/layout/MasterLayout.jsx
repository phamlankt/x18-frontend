import { Layout } from "antd";
import DefaultHeader from "./Header";
import DefaultFooter from "./Footer";
import React from "react";
import { useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";

const { Header, Content, Footer, Sider } = Layout;
const MasterLayout = (props) => {
  const HeaderComponent = props.HeaderComponent || <DefaultHeader />;
  const FooterComponent = props.FooterComponent || <DefaultFooter />;
  const SideBarComponent = props.SideBarComponent || <></>;
  const ContentComponent = props.ContentComponent || <></>;
  const hasHeader = props.hasHeader === false ? false : true;
  const hasFooter = props.hasFooter === false ? false : true;
  const hasSideBar = props.hasSideBar === false ? false : true;

  return (
    <div>
      <div className="master-layout">
        {hasHeader && (
          <Header className="master-layout-header">{HeaderComponent}</Header>
        )}
        <Layout hasSider className="master-layout-main-content-container">
          {hasSideBar && (
            <Sider
              width="350px"
              className="master-layout-leftside"
              breakpoint="lg"
              collapsedWidth={0}
              zeroWidthTriggerStyle={{ backgroundColor: "transparent" }}
              trigger={<AiOutlineDoubleRight />}
            >
              {SideBarComponent}
            </Sider>
          )}

          <Content className="master-layout-main-content">
            {ContentComponent}
          </Content>
        </Layout>
        {/* {hasFooter && ( */}
        {/* <Footer className="master-layout-footer">{FooterComponent}</Footer> */}

        {/* )} */}
      </div>
      <DefaultFooter />
    </div>
  );
};

export default MasterLayout;
