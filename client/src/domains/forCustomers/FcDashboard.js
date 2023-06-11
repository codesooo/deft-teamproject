import {  Row, Col, Button, Table, Badge, Calendar, List } from "antd";
import React from "react";
import {useState, useEffect } from "react";
import { useSelector } from "react-redux";
import client from '../../lib/api/client'
import {  PushpinFilled } from "@ant-design/icons";
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';



const FcDashboard = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    console.log("출력", user);
    const usernum = user.username;

    // const name = user.name;
    const [journalList, setJournalList] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [getcoachname, setCoachname] = useState([]);
    const [username, setUsername] = useState([]);


    useEffect(() => {
      getClassData();
      getConsultData();
      getUsernameData();
      getScheduleData();

    }, []);

    const getClassData = async () => {
      await client
      .get(`/api/consumer/note/class/user/${usernum}`)
      .then(
          res => {
          setJournalList(
              res.data.map(row => ({
                  subject: row.subject,
                  class: row.classname,
                  date: row.date_class,
                  id : row._id,
              }))
          );
          console.log(res);
        }
      );
    };
    const getUsernameData = async () => {
      await client.get(`/api/consumer/info/usernum/${usernum}`)
      .then(
        res => {
          setUsername(
            res.data
          )
        }
      )
    }
    const getScheduleData = async () => {
      await client.get(`/api/schedule/consumer/${usernum}`)
      .then (
        res => {
          setScheduleList(
            res.data.map(row => ({
                  id : row._id,
                  title: row.name,
                  usernum: row.usernum,
                  manager: row.manager,
                  date : row.date,
                  startHour : row.startHour,
                  startMinute : row.startMinute,
                  memo : row.memo,
            }))
          );
        }
      );
    };

 
     
    

    const getConsultData = async () => {
      await client
      .get(`/api/consumer/note/counsel/user/${usernum}`)
      .then(
          res => {
          setJournalList(
              res.data.map(row => ({
                  class: row.detail,
                  date: row.date_counsel,
                  subject: row.method,
                  id: row._id,
              }))
          );
          console.log(res);
        }
      );
    };



    // 오늘 날짜 

      let now = new Date();
      let todayyear = now.getFullYear();
      let todayMonth = now.getMonth() +1;
      let todayDate = now.getDate();
      let format =  todayyear+"-"+(("00"+todayMonth.toString()).slice(-2))+"-"+(("00"+todayDate.toString()).slice(-2));


    const columns = [
        {
          title: '날짜',
          dataIndex: 'date',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: '설명',
          dataIndex: 'class',
        },
        {
          title: '제목',
          dataIndex: 'subject',
        },
        ];
// console.log("출..", scheduleList);
let managernameList = [];
let timeList = [];
let dateList = [];

for (let i=0;i<scheduleList.length;i++){
  managernameList.push(scheduleList[i].manager.concat(" T"));
  // timeList.push(scheduleList[i].startHour.concat(scheduleList[i].startMinute));
  if(scheduleList[i].startHour.replace('시','').length == 1){
    dateList.push(scheduleList[i].date.concat("T0")
    .concat(scheduleList[i].startHour.replace('시',':'))
    .concat(scheduleList[i].startMinute.replace('분',''))
    .concat(":00"));
  }
  else{
    dateList.push(scheduleList[i].date.concat("T")
  .concat(scheduleList[i].startHour.replace('시',':'))
  .concat(scheduleList[i].startMinute.replace('분',''))
  .concat(":00"));
  }
  
  
  // console.log("방금",scheduleList[i].startHour.concat(scheduleList[i].startMinute).toLocaleTimeString());

}
// console.log("방금",managernameList);
    let resList=[]
for (let i=0; i<managernameList.length;i++){
  let op={};
  op.title=managernameList[i];
  op.date=dateList[i];
  // op.start=timeList[i];
  resList.push(op);
}
console.log("학",resList);

    // console.log("회원이름", scheduleList[0].title);
    return(
      <>
      <Row gutter={20}>
        <Col span>
           <div className="회원 이름">
              <h2>{username.name}회원님, 안녕하세요!</h2>
            </div>
            <Row>
              <Col>
              <div className="container1" style={{height:"100%", width:"45vh"}}>
                <h3><PushpinFilled /> 오늘의 일정  </h3>
                {/* <List
                  size="small"
                  bordered
                  dataSource={scheduledata}
                  renderItem={
                    (item) => <List.Item >{item}</List.Item>}
                /> */}
                <FullCalendar
                  plugins={[ listPlugin ]}

                  initialView='listWeek'
                  events={resList}
                  
                  locale = "ko"
                  headerToolbar= {false}

                />
              </div>
            </Col>
            </Row>
        </Col>

        <Col style={{"margin-top" : "63px", width:"800px"}} >
            <Col>
            <Table
               columns={columns}
               dataSource={journalList}
            />
            </Col>
 
        </Col>

      </Row>
        {/*  */}
            
    </>
      
    );

};

export default FcDashboard;