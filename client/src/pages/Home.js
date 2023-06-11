import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
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
import { Layout, Menu, Card, Col, Row, Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import Dashboard from "../domains/Dashboard/Dashboard.js";
import {useNavigate} from 'react-router-dom'

const { Header, Content, Sider } = Layout;


const menuItems = [
  {
    label: <Link to="/home/dashboard">대시보드</Link>,
    key: "대시보드",
    icon: <HomeOutlined />
  },
  {
    label: <Link to="/home/customers">회원</Link>,
    key: "회원",
    icon: <UserOutlined />
  },
  {
    label: <Link to="/home/commodity">상품</Link>,
    key: "상품",
    icon: <ShoppingOutlined />
  },
  {
    label: <Link to="/home/curriculum">커리큘럼</Link>,
    key: "커리큘럼",
    icon: <ProfileOutlined />
  },
  {
    label: <Link to="/home/members">구성원</Link>,
    key: "구성원",
    icon: <TeamOutlined />,
  },
  {
    label: <Link to="/home/calendar">일정</Link>,
    key: "일정",
    icon: <CalendarOutlined />
  },
  {
    label: <Link to="/home/setting">설정</Link>,
    key: "설정",
    icon: <SettingOutlined/>
  }
];

const PostListPage = () => {
  
  const navigate = useNavigate();

  
  const move = () => {
    navigate('/');
  }

  const customermove = () => {
    navigate('/fc/login');
  }
  const activeStyle = {
    color: "green",
    fontSize: "2rem"
  };

  return (
    <>
      <HeaderContainer />
      <Layout>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                height: "100%",
                overflow: "auto",
                //position: "fixed",
                
                //margintop: "4rem",
                width: "13rem",
                borderRight: 0
                
              }}
              items={menuItems}
            >
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px"
            }}
          >
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            > 
             
            <br></br>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default PostListPage;
