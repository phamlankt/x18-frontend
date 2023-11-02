import { Layout } from "antd";
import DefaultHeader from "./Header";
import DefaultFooter from "./Footer";
import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { useRecoilValue, useRecoilState } from "recoil";
import Recoil from "../../recoilContextProvider";

const { Header, Content, Sider } = Layout;
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
    <Layout className="master-layout">
      {hasHeader && (
        <Header className="master-layout-header">{HeaderComponent}</Header>
      )}
      <Layout hasSider className="master-layout-main-content-container">
        {hasSideBar && (
          <>
            <Sider
              width="350px"
              className="master-layout-leftside"
              collapsedWidth={0}
              collapsed={!openFilterBar}
              defaultCollapsed={!openFilterBar}
            >
              {SideBarComponent}
              <button
                className="collapse-btn"
                onClick={() => setOpenFilter(!openFilter)}
              >
                {openFilterBar ? (
                  <AiOutlineDoubleLeft />
                ) : (
                  <AiOutlineDoubleRight />
                )}
              </button>
            </Sider>
          </>
        )}

        <Content className="master-layout-main-content">
          <div className="min-vh-100 w-100 position-relative mb-5">
            {ContentComponent}
          </div>
        </Content>
      </Layout>
      {hasFooter && (
        <div className="master-layout-footer">{FooterComponent}</div>
      )}
    </Layout>
  );
};

export default MasterLayout;
