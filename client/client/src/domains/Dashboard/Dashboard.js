import {  Row, Col, DatePicker, List } from "antd";
import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import {  PushpinFilled } from "@ant-design/icons";
import Customers from "../Customers/Customers";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import client from '../../lib/api/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const auth_ = localStorage.getItem('auth')
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getData();
  }, []);
// console.log("이건진짜",auth.role);
  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if(auth_!='"admin"'){
    return <div>관리자만 볼 수 있는 페이지입니다.</div>;
}
  const username = user.username;


    // 오늘 날짜 
    const today = () => {
      let now = new Date();
      let todayMonth = now.getMonth() +1;
      let todayDate = now.getDate();
      return todayMonth + "/" + todayDate;
    }
    
    const getData = async () => {
      await client.get("/api/schedule/admin/list").then(
        res => {
          setloading(false);
          setstate(
            res.data.map(row => ({
              id : row._id,
              title: row.name,
              usernum: row.usernum,
              manager: row.manager,
              date : row.date,
              startHour : row.startHour,
              startMinute : row.startMinute,
              // endHour : row.endHour,
              // endMinute : row.endMinute,
              memo : row.memo,

            }))
          );

        }
      );
      };

    const onChange = (date, dateString) => {
      console.log(date, dateString);
    };


    return(
      <>
        <Row>
          <Col xs={{ span: 24 }} sm={{ span:24}} md={{ span:24 }} lg={{ span: 24 }} xl={{span:5}}>
            <body style={{height:"100vh", width:"45vh"}}>
            <Row>
              <div className="container1" style={{height:"100vh", width:"45vh"}}>
              <h3><PushpinFilled />오늘의 일정({today()})</h3>
              <FullCalendar 
              plugins={[dayGridPlugin]}
              initialView = 'dayGridWeek'
              displayEventTime = {false}
              events={state}
              contentHeight = "700px"
              headerToolbar= {false}
              moreLinkClick = "popover"
              eventDisplay = 'list-item'
              locale = "ko"
              eventClick = {
                function(info){
                  // alert('Event : ' + info.event.title);
                  console.log(info.event.id);
                  navigate('/home/calendar/update', {
                    state:{
                      id : info.event.id
                    }
                  })
                }
              }
              />
              </div>
            </Row>
            </body>
            <br/>
            
          </Col>
          <Col
            xs={{ span: 24 }} sm={{ span:24 }} md={{ span:24 }} lg={{ span: 20, }} xl={{ span: 18, offset:1}}
          >
            <div className="read">
              <h3><PushpinFilled /> 회원조회</h3>
                <Customers/>                
            </div>
          </Col>
      </Row>
      </>
      
    );
    

};

export default Dashboard;