import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  TeamOutlined,
  CalendarOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

const { Content, Sider } = Layout;


const menuItems = [
  {
    label: <Link to="/coach/dashboard">대시보드</Link>,
    key: "대시보드",
    icon: <HomeOutlined />
  },
  {
    label: <Link to="/coach/customers">회원</Link>,
    key: "회원",
    icon: <UserOutlined />
  },
  {
    label: <Link to="/coach/curriculum">커리큘럼</Link>,
    key: "커리큘럼",
    icon: <ProfileOutlined />
  },
    {
    label: <Link to="/coach/members">구성원</Link>,
    key: "구성원",
    icon: <TeamOutlined />,
  },
  {
    label: <Link to="/coach/calendar">일정</Link>,
    key: "일정",
    icon: <CalendarOutlined />
  },
  {
    label: <Link to="/coach/setting">설정</Link>,
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
