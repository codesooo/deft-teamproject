import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space, Checkbox, Form, Modal, Button,
  Col, Row, Radio, AutoComplete, Table} from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
    Dropdown,
    Menu,
    Typography,
    DatePicker,
    TimePicker, Select
} from "antd";
  import moment from "moment";
  import { useLocation} from 'react-router-dom';

import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import "../../Calendar/CalendarUpdate.css";
import { SwapRightOutlined } from '@ant-design/icons';
import client from '../../../lib/api/client';



const { Search } = Input;
const onSearch = (value) => console.log(value);



const CalendarUpdate = () => {
  const navigate = useNavigate();

const location = useLocation();
// console.log('state', location.state);
const id = location.state.id;

const [stateCust, setstateCust] = useState({});
const [stateinfo, setstateinfo] = useState({});



// let consNum=0;

useEffect(() => {
  getscheduleById(id);
  // getInfo();
}, []);

const getscheduleById = id => {
  // console.log("아이디:",id);
  client.get(`/api/schedule/admin/id/${id}`)
    .then(d => {
      let schedule = d.data;
      setstateCust({
        id: schedule._id,
        name : schedule.name,
        usernum : schedule.usernum,
        manager : schedule.manager,
        date : schedule.date,
        startHour : schedule.startHour,
        startMinute : schedule.startMinute,
        endHour : schedule.endHour,
        endMinute : schedule.endMinute,
        memo : schedule.memo,
        completeCheck : schedule.completeCheck,
        
      });
    })
    .catch(err => alert(err));
    
};
const consNum = stateCust.usernum;
// console.log("이거", consNum);
const manNum = stateCust.manager;
const beforeupdate = stateCust.date;


    client.get(`/api/consumer/info/usernum/${consNum}`)
    .then(d => {
      let consumerdata = d.data;
      setstateinfo({
        obstacle_type : consumerdata.obstacle_type,
        phone : consumerdata.phone,

        
      });
    })


    


// console.log("스케줄", stateCust);
// console.log("추가 회원 정보", stateinfo);


  const submitHandler = (e) => {
    

    client
      .put(`/api/schedule/admin/${id}`, stateCust)
      .then((res) => 
         console.log(res)
         );
         alert("수정 완료");
        //  window.location.reload();
    };
    // console.log("수정된 것",stateCust);
    const deleteInfo = (e) => {
      Modal.confirm({
        title: '삭제',
        content: '해당 회원 정보를 삭제하시겠습니까?',
        onText: 'Yes',
        okType: 'danger',
        onOk: () => {
          client
            .delete(`/api/schedule/coach/${id}`)
            .then((res) => console.log(res));
          alert('삭제완료');
          navigate('/coach/calendar');
        },
      });
    };

  return(
    <Space direction="vertical">
         

         
         <Row gutter={[100, 16]} style={{"width":"900vh"}}>
         <div className="Col1">
              <Col span>
                <Title level={4}>회원 정보</Title>
                <Space direction="vertical" size={20}>
                  <Row gutter={20}>
                    <Col>
                      <h3>회원번호</h3>
                    </Col>
                    <Col>
                      <h4>{stateCust.usernum}</h4>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col>
                      <h3>이름</h3>
                    </Col>
                    <Col>
                      <h4>{stateCust.name}</h4>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col>
                      <h3>장애유형</h3>
                    </Col>
                    <Col>
                      <h4>{stateinfo.obstacle_type}</h4>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col>
                      <h3>전화번호</h3>
                    </Col>
                    <Col>
                      <h4>{stateinfo.phone}</h4>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col>
                      <h3>코치</h3>
                    </Col>
                    <Col>
                      <h4>{stateCust.manager}</h4>
                    </Col>
                  </Row>
                </Space>
                
                <br></br><br></br>
            {/* <Title level={4}>진행 여부</Title> */}
            <br></br>
             {/* <Checkbox onChange={onChange2}>수업 완료</Checkbox> */}
             {/* <Checkbox 
             checked = {stateCust.completeCheck}
             onChange={e => {
              let value = e.target.checked;
              setstateCust({
                usernum : stateCust.usernum,
                date : stateCust.date,
                name : stateCust.name,
                phone : stateinfo.phone,
                coachname : stateCust.manager,
                obstacle_type : stateinfo.obstacle_type,
                startHour : stateCust.startHour,
                startMinute : stateCust.startMinute,
                endHour : stateCust.endHour,
                endMinute : stateCust.endMinute,
                memo : stateCust.memo,
                completeCheck : value, 
              });
            }}>수업 완료</Checkbox> */}



              </Col>
           </div>

           <br></br>
          
          <div className="Col2">
          <Col>
            <Title level={4} style={{"margin-bottom" : "4vh"}}>수업 일시</Title>
               
                <Space direction="vertical" size={20}>
                  <DatePicker
                  // defaultValue ={dayjs(stateCust.date)}
                  placeholder ={dayjs(stateCust.date).format("YYYY-MM-DD")}

                  format={dateFormat}
                  onChange={e => {
                    
                    let value = e;
                    setstateCust({
                      usernum : stateCust.usernum,
                      name : stateCust.name,
                      date : value,
                      phone : stateinfo.phone,
                      coachname : stateCust.manager,
                      obstacle_type : stateinfo.obstacle_type,
                      startHour : stateCust.startHour,
                      startMinute : stateCust.startMinute,
                      endHour : stateCust.endHour,
                      endMinute : stateCust.endMinute,
                      memo : stateCust.memo,
                      completeCheck : stateCust.completeCheck, 
                  });
                  }}                        
                    />
                </Space>
                <div>
                  {" "}
                  <br></br>{" "}
                </div>
                {/* <TimePicker.RangePicker /> */}

                <Row >
                <Select
                  showSearch
                  placeholder = {stateCust.startHour}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: '1시',
                      label: '1시',
                    },
                    {
                      value: '2시',
                      label: '2시',
                    },
                    {
                      value: '3시',
                      label: '3시',
                    },
                    {
                      value: '4시',
                      label: '4시',
                    },
                    {
                      value: '5시',
                      label: '5시',
                    },
                    {
                      value: '6시',
                      label: '6시',
                    },
                    {
                      value: '7시',
                      label: '7시',
                    },
                    {
                      value: '8시',
                      label: '8시',
                    },
                    {
                      value: '9시',
                      label: '9시',
                    },
                    {
                      value: '10시',
                      label: '10시',
                    },
                    {
                      value: '11시',
                      label: '11시',
                    },
                    {
                      value: '12시',
                      label: '12시',
                    },
                    {
                      value: '13시',
                      label: '13시',
                    },
                    {
                      value: '14시',
                      label: '14시',
                    },
                    {
                      value: '15시',
                      label: '15시',
                    },
                    {
                      value: '16시',
                      label: '16시',
                    },
                    {
                      value: '17시',
                      label: '17시',
                    },
                    {
                      value: '18시',
                      label: '18시',
                    },
                    {
                      value: '19시',
                      label: '19시',
                    },
                    {
                      value: '20시',
                      label: '20시',
                    },
                    {
                      value: '21시',
                      label: '21시',
                    },
                    {
                      value: '22시',
                      label: '22시',
                    },
                    {
                      value: '23시',
                      label: '23시',
                    },
                    {
                      value: '24시',
                      label: '24시',
                    },
                  ]}
                  onChange={e => {
                    console.log("이이이ㅣㅇ",typeof(stateCust.startHour) );
                    let value = e;
                    setstateCust({
                      usernum : stateCust.usernum,
                      date : stateCust.date,
                      name : stateCust.name,
                      phone : stateinfo.phone,
                      coachname : stateCust.manager,
                      obstacle_type : stateinfo.obstacle_type,
                      startHour : value,
                      startMinute : stateCust.startMinute,
                      endHour : stateCust.endHour,
                      endMinute : stateCust.endMinute,
                      memo : stateCust.memo,
                      completeCheck : stateCust.completeCheck, 
                  });
                  }}
                />
                <Select
                  showSearch
                  placeholder= {stateCust.startMinute}
                  optionFilterProp="startminute"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: '00분',
                      label: '00분',
                    },
                    {
                      value: '10분',
                      label: '10분',
                    },
                    {
                      value: '20분',
                      label: '20분',
                    },
                    {
                      value: '30분',
                      label: '30분',
                    },
                    {
                      value: '40분',
                      label: '40분',
                    },
                    {
                      value: '50분',
                      label: '50분',
                    },
                  ]}
                  defaultValue = {stateCust.startMinute}
                  onChange={e => {
                    let value = e;
                    setstateCust({
                      usernum : stateCust.usernum,
                      date : stateCust.date,
                      name : stateCust.name,
                      phone : stateinfo.phone,
                      coachname : stateCust.manager,
                      obstacle_type : stateinfo.obstacle_type,
                      startHour : stateCust.startHour,
                      startMinute : value,
                      endHour : stateCust.endHour,
                      endMinute : stateCust.endMinute,
                      memo : stateCust.memo,
                      completeCheck : stateCust.completeCheck, 
                  });
                  }}
                />
                {/* <SwapRightOutlined />

                <Select
                  showSearch
                  placeholder={stateCust.endHour}
                  optionFilterProp="endhour"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: '1시',
                      label: '1시',
                    },
                    {
                      value: '2시',
                      label: '2시',
                    },
                    {
                      value: '3시',
                      label: '3시',
                    },
                    {
                      value: '4시',
                      label: '4시',
                    },
                    {
                      value: '5시',
                      label: '5시',
                    },
                    {
                      value: '6시',
                      label: '6시',
                    },
                    {
                      value: '7시',
                      label: '7시',
                    },
                    {
                      value: '8시',
                      label: '8시',
                    },
                    {
                      value: '9시',
                      label: '9시',
                    },
                    {
                      value: '10시',
                      label: '10시',
                    },
                    {
                      value: '11시',
                      label: '11시',
                    },
                    {
                      value: '12시',
                      label: '12시',
                    },
                    {
                      value: '13시',
                      label: '13시',
                    },
                    {
                      value: '14시',
                      label: '14시',
                    },
                    {
                      value: '15시',
                      label: '15시',
                    },
                    {
                      value: '16시',
                      label: '16시',
                    },
                    {
                      value: '17시',
                      label: '17시',
                    },
                    {
                      value: '18시',
                      label: '18시',
                    },
                    {
                      value: '19시',
                      label: '19시',
                    },
                    {
                      value: '20시',
                      label: '20시',
                    },
                    {
                      value: '21시',
                      label: '21시',
                    },
                    {
                      value: '22시',
                      label: '22시',
                    },
                    {
                      value: '23시',
                      label: '23시',
                    },
                    {
                      value: '24시',
                      label: '24시',
                    },
                  ]}
                  defaultValue = {stateCust.endHour}
                  onChange={e => {
                    let value = e;
                    setstateCust({
                      usernum : stateCust.usernum,
                      date : stateCust.date,
                      name : stateCust.name,
                      phone : stateinfo.phone,
                      coachname : stateCust.manager,
                      obstacle_type : stateinfo.obstacle_type,
                      startHour : stateCust.startHour,
                      startMinute : stateCust.startMinute,
                      endHour : value,
                      endMinute : stateCust.endMinute,
                      memo : stateCust.memo,
                      completeCheck : stateCust.completeCheck, 
                  });
                  }}
                />
                <Select
                  showSearch
                  placeholder={stateCust.endMinute}
                  optionFilterProp="endminute"
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: '00분',
                      label: '00분',
                    },
                    {
                      value: '10분',
                      label: '10분',
                    },
                    {
                      value: '20분',
                      label: '20분',
                    },
                    {
                      value: '30분',
                      label: '30분',
                    },
                    {
                      value: '40분',
                      label: '40분',
                    },
                    {
                      value: '50분',
                      label: '50분',
                    },
                  ]}
                  defaultValue = {stateCust.endMinute}
                  onChange={e => {
                    let value = e;
                    setstateCust({
                      usernum : stateCust.usernum,
                      name : stateCust.name,
                      date : stateCust.date,
                      phone : stateinfo.phone,
                      coachname : stateCust.manager,
                      obstacle_type : stateinfo.obstacle_type,
                      startHour : stateCust.startHour,
                      startMinute : stateCust.startMinute,
                      endHour : stateCust.endHour,
                      endMinute : value,
                      memo : stateCust.memo,
                      completeCheck : stateCust.completeCheck, 
                  });
                  }}
                /> */}
                </Row>
                <br></br><br></br><br></br>
            <Title level={4}>기타 메모</Title>
            <TextArea  rows={10} 
            value = {stateCust.memo}
              maxLength={100} 
              name="memo"
              onChange={e => {
                let value = e.target.value;
                setstateCust({
                  usernum : stateCust.usernum,
                  name : stateCust.name,
                  date : stateCust.date,
                  phone : stateinfo.phone,
                  coachname : stateCust.manager,
                  obstacle_type : stateinfo.obstacle_type,
                  startHour : stateCust.startHour,
                  startMinute : stateCust.startMinute,
                  endHour : stateCust.endHour,
                  endMinute : stateCust.endMinute,
                  memo : value,
                  completeCheck : stateCust.completeCheck, 
                  });
              }}
            showCount/>
        

            
          </Col> 
        </div>
          </Row>
           
           
         <br></br><br></br>
         <div className="btns" style={{float:"left"}}>
             <Button type="primary" danger onClick={deleteInfo}>삭제</Button>
         </div>
       </Space>

  );
};


const onChange2 = (checkedValues) => {
  console.log('checked = ', checkedValues.target.checked);
};

;
dayjs.extend(customParseFormat);
const onChange = (time, timeString) => {
  console.log(time, timeString);
};

const onChange3 = (date) => {
  console.log('Date: ', date);
  console.log('날짜변환: ', date.$y, "년",date.$M + 1 ,"월", date.$D, "일");

};

const dateNow = new Date();
const today = dateNow.toISOString().slice(0, 10);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const weekFormat = "MM-DD";
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${moment(value).startOf("week").format(weekFormat)} ~ ${moment(value)
    .endOf("week")
    .format(weekFormat)}`;
const { TextArea } = Input;
const { Title } = Typography;


export default CalendarUpdate;