import React from "react";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingOutlined,
  ProfileOutlined,
  MessageOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import FcHeaderContainer from '../containers/common/FcHeaderContainer';

const { Header, Content, Sider } = Layout;

const menuItems = [
  {
    label: <Link to="/fc/dashboard">대시보드</Link>,
    key: "고객용 대시보드",
    icon: <HomeOutlined/>
  },
  {
    label: <Link to="/fc/journal">노트</Link>,
    key: "노트",
    icon: <UserOutlined />
  },
];

function FcHome(props) {
  const activeStyle = {
    color: "green",
    fontSize: "2rem"
  };

  const isLogin = props.isLogin

  return (
    <>
     
      <Layout>
      <FcHeaderContainer />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              //theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0
              }}
              items={menuItems}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default FcHome;