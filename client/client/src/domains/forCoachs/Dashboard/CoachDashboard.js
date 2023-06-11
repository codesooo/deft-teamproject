import {  Row, Col, DatePicker, List } from "antd";
import React, {useState, useEffect} from "react";
import "./CoachDashboard.css";
import {  PushpinFilled } from "@ant-design/icons";
import Customers from "../../Customers/Customers";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import client from '../../../lib/api/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));
  const [state, setstate] = useState([]);
  const [coachname, setName] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getData();
    getCoachName();
  }, []);
  // const prasedRole = JSON.prase(role);
  console.log("유저",user);
  
  // console.log("권한",prasedRole);
  console.log("졸려",auth);

  const auth_ = localStorage.getItem('auth')

  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if (auth_!='"coach"'){
    return <div>코치만 볼 수 있는 페이지입니다.</div>;
  // }
}

  const username = user.username;
  // const getCoachName = async () => {
  //   client.get('')
  // }
    
    // 오늘 날짜 
    const today = () => {
      let now = new Date();
      let todayMonth = now.getMonth() +1;
      let todayDate = now.getDate();
      return todayMonth + "/" + todayDate;
    }

    const onChange = (date, dateString) => {
      console.log(date, dateString);
    };

    const coachnum = user.username;

    const getCoachName = async () => {
      await client.get(`/api/member/coach/coachnum/${coachnum}`).then(
        res => {
          setloading(false);
          setName(
            res.data)
        }
      )}
    const getData = async () => {
      await client.get(`/api/schedule/coach/coachnum/${coachnum}`).then(
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

    return(
      <>
        <Row>
          <Col
            xs={{
              span: 5,
            }}
            lg={{
              span: 6,
            }}
          > <body style={{height:"100vh", width:"45vh"}}>
            <Row>
              <div className="container1" style={{height:"100vh", width:"45vh"}}>
              <h3><PushpinFilled /> {coachname.name}님, 오늘의 일정({today()})</h3>
              {/* <List
                size="small"
                bordered
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              /> */}
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
                  navigate('/coach/calendar/update', {
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
            xs={{
              span: 16,
            }}
            lg={{
              span: 17,
              offset: 1,
            }}
          >
            <h3><PushpinFilled /> 회원조회</h3>
            <Customers
            size="small"/>
          </Col>
      </Row>
      </>
      
    );
    

};

export default Dashboard;