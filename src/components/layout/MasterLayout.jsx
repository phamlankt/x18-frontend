import { Layout } from "antd";
import DefaultHeader from "./Header";
import DefaultFooter from "./Footer";
import React from "react";
import { useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useRecoilValue, useRecoilState } from "recoil";
import Recoil from "../../recoilContextProvider";

const { Header, Content, Footer, Sider } = Layout;
const MasterLayout = (props) => {
  const openFilterBar = useRecoilValue(Recoil.AtomSideBar);
  const [openFilter, setOpenFilter] = useRecoilState(Recoil.AtomSideBar);
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
            <>
              <Sider
                style={openFilterBar ? { marginLeft: "-350px" } : null}
                width="350px"
                className="master-layout-leftside"
                breakpoint="lg"
                collapsedWidth={0}
                zeroWidthTriggerStyle={{ backgroundColor: "transparent" }}
                trigger={<AiOutlineDoubleRight />}
              >
                {SideBarComponent}
              </Sider>
              <button
                style={{ height: "30px", border: "none", fontWeight: "600" }}
                onClick={() => setOpenFilter(!openFilter)}
              >
                {openFilterBar ? ">>" : "<<"}
              </button>
            </>
          )}

          <Content className="master-layout-main-content">
            {ContentComponent}
          </Content>
        </Layout>
      </div>
      <DefaultFooter />
    </div>
  );
};

export default MasterLayout;
