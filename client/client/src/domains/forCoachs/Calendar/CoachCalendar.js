
import { Badge, Calendar, Radio,Button, Modal,Table, Input, Divider,Select  } from "antd";
import { useSelector, useDispatch } from 'react-redux';

import React, { useState, useEffect,  } from "react";
// import "./CalendarMain.css";
import {useNavigate} from 'react-router';
import { PlusOutlined } from "@ant-design/icons";
import client from '../../../lib/api/client';
import { startLoading } from "../../../modules/loading";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SearchOutlined,SwapRightOutlined,DownOutlined  } from '@ant-design/icons';

import { EdgesensorHighOutlined } from "../../../../node_modules/@mui/icons-material/index";
import { memo } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Space, Checkbox, Form, } from "antd";
import {
    Dropdown,
    Menu,
    Typography,
    DatePicker,
    TimePicker,
    Col, Row, 
    
} from "antd";
import moment from "moment";




  const CalendarMain = () => {
    
    
    const [size, setSize] = useState("large");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, SetId] = useState("");
    const [usernum, SetUsernum] = useState("");
    const [date, SetDate] = useState("");
    const [startHour, SetStartHour] = useState("");
    const [startMinute, SetStartMinute] = useState("");
    const [endHour, SetEndHour] = useState("");
    const [endMinute, SetEndMinute] = useState("");
    const [memo, SetMemo] = useState("");
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([{ }]);
  const [consumer, setConsumer] = useState('');

    
    for (let i=0; i < customers.length; i++){
      customers[i].key = i;
    }
    const {TextArea} = Input;
    
    const [selectionType, setSelectionType] = useState('radio');

    const [managerData, SetManagerData] = useState("");
    const [managerSchedule, SetmanagerSchedule] = useState("");

    const [state, setstate] = useState([]);
    const [managerfilter, setmanagerfilter] = useState([]);
    const [loading, setloading] = useState(true);
    const [coachData,setCoachData] = useState("");

    const columns = [
      {
        title: "번호",
        dataIndex: "usernum"
      },
      {
        title: "성명",
        dataIndex: "name",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Type text here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          return record.name == value;
        },
      },
      {
        title: "장애",
        dataIndex: "existence",
        filters:[
          {text:'유', value:'유'},
          {text:'무', value:'무'}
        ],
        onFilter:(value, record)=>{
          return record.existence === value
        }
      },
      {
        title: "성별",
        dataIndex: "sex",
        filters:[
          {text:'남', value:'남'},
          {text:'여', value:'여'}
        ],
        onFilter:(value, record)=>{
          return record.sex === value
        }
      },
      {
        title: "담당자",
        dataIndex: "manager",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Type text here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          return record.manager == value;
        },
      },
      {
        title: "소개정보",
        dataIndex: "inflow",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Type text here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          return record.inflow == value;
        },
      },
      {
        title: "전화번호",
        dataIndex: "phone",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Type text here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          return record.phone == value;
        },
      },
      {
        title: "결제정보",
        dataIndex: "payment",
        filters:[
          {text:'실비', value:'실비'},
          {text:'바우처+실비', value:'바우처+실비'},
          {text:'바우처', value:'바우처'}
        ],
        onFilter:(value, record)=>{
          return record.payment === value
        }
      },
      {
        title: "장애유형",
        dataIndex: "obstacle_type",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Type text here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          return record.obstacle_type == value;
        },
      },
      {
        title: "회원권",
        dataIndex: "membership",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Type text here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          return record.membership == value;
        },
      },
      {
        title: "운동목적",
        dataIndex: "user_purpose",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <>
              <Input
                autoFocus
                placeholder="Type text here"
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                  confirm({ closeDropdown: false });
                }}
                onPressEnter={() => {
                  confirm();
                }}
                onBlur={() => {
                  confirm();
                }}
              ></Input>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </>
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
        onFilter: (value, record) => {
          return record.user_purpose == value;
        },
      },
      {
        title: "상태",
        dataIndex: "statement",
        filters:[
          {text:'이용중', value:'이용중'},
          {text:'휴면고객', value:'휴면고객'},
          {text:'상담예정', value:'상담예정'},
          {text:'상담완료', value:'상담완료'},
          {text:'단순문의', value:'단순문의'}
        ],
        onFilter:(value, record)=>{
          return record.statement === value
        }
      },
    ];
    

    // const manager = "박코치";
    useEffect(() => {
      getData();
      getManagerData();
      getCustomData();
      getCoachData();
    }, []);
    const getCoachData = async () => {
      await client.get('/api/member/coach/coachname')
      .then((res)=>{
        setloading(false);
        setCoachData(
          res.data
        )
        console.log(res.data);
    })}
    let coachList=[];
    for (let i=0; i<coachData.length;i++){
      let op = {};
      op.value=coachData[i];
      op.label=coachData[i];
      coachList.push(op);
    }
    
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const [Selected, setSelected] = useState("");
    const handleChange = (e) => {
      SetManagerData(e);
    };
  
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows,
        'usernum: ', selectedRows[0].usernum);
        SetUsernum(selectedRows[0].usernum);
        console.log("이건데 선택한 회원의 코치", selectedRows[0].manager)
        SetManagerData(selectedRows[0].manager);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    let postdata = {
      usernum: 0,
        date: '',
        startHour: '',
        startMinute: '',
        // endHour: '',
        // endMinute: '',
        memo: '',
    }

    // const usernumHandler = (e) => {
    //   console.log("회원번호 : ", e);   
    //   SetUsernum(e);

    // };
    
    // const idHandler = (e) => {
    //   console.log("id값 : ", e);   
    //   SetId(e);
    // };


    
    const dateHandler = (e) => {
      console.log("날짜 : ", e);       
        SetDate(e);
    }

    var datetoString = dayjs(date);
    console.log("이가",datetoString)
    datetoString = datetoString.format("YYYY-MM-DD");
    console.log("바꼈나",datetoString)


    const consumerHandler = (e) => {
      console.log(`selected ${e}`);
      setConsumer(e);
    };
    console.log("선택한 회원 : ", consumer);

    const startHourHandler = (e) =>{
      console.log("시작시간 : ", e);
      
        SetStartHour(e);
      };
    
    const startMinuteHandler = (e) =>{
      console.log("시작분 : ", e);
      
        SetStartMinute(e);
      };
    
    const endHourHandler = (e) =>{
      console.log("종료시간 : ", e);
      
        SetEndHour(e);
      };
    
      const endMinuteHandler = (e) =>{
        console.log("종료분 : ", e);     
        
        SetEndMinute(e);
      };

      const memoHandler = (e) =>{
        console.log("메모 : ", e.target.value);
        e.preventDefault();
        SetMemo(e.target.value);
      };
  

  
      
    

      

    
  
      const getManagerData = async () =>{
        await client.get("/api/member/coach").then(
          res => {
            setloading(false);
            SetManagerData(
              res.data.map( row => ({
                manager: row.coachnum,
                managername : row.name
              }))
            );
          }
        )
      };


      console.log('코치들 ', managerData);
      let managerList = [];
      for (let i=0; i<managerData.length; i++){
        let op = {};
        op.value = managerData[i].managername;
        op.label = managerData[i].managername;
        managerList.push(op);
      }
      managerList.push({"value": "전체", "label ": "전체"});
      console.log("managerlist임", managerList);


    
  
      console.log("매니저의 스케줄", state);
      console.log("이거..",date);
      const submitHandler = (e) => {
        e.preventDefault();
      
        let body = {
          usernum: usernum,
          date: datetoString,
          manager: managerData,
          startHour: startHour,
          startMinute: startMinute,
          memo: memo,
        };
        console.log("입력한정보",body);
        client
          .post("/api/schedule/admin", body)
          .then((res) => 
             console.log(res)
             );
        alert("일정 추가 성공");
        window.location.reload();


        };

    console.log("확인",state);
    console.log("체크",state.manager);


    const getCustomData = async () => {
      await client.get("/api/consumer/info").then(
        res => {
          setloading(false);
          setCustomers(
            res.data.map(row => ({
              usernum: row.usernum,
              userheight: row.userheight,
              userwidth: row.userwidth,
              sex: row.sex,
              existence: row.existence,
              name: row.name,
              obstacle_type: row.obstacle_type,
              phone: row.phone,
              address: row.address,
              memo: row.memo,
              manager: row.manager,
              payment: row.payment,
              inflow: row.inflow,
              statement: row.statement,
              date_signup: row.date_signup,
              birthday: row.birthday,
              membership: row.membership,
              user_purpose: row.user_purpose,
              vaccinate: row.vaccinate,
              category: row.category,
              id: row._id
            }))
          );
        }
      );
    };

    const user_login = localStorage.getItem('user');
    console.log("출력!!!",user_login);

    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

    const coachnum = user.username;
    console.log("이건출력:",coachnum);

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
      const auth_ = localStorage.getItem('auth')

  if (!user_login) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }

  if (auth_!='"coach"'){
    return <div>코치만 볼 수 있는 페이지입니다.</div>;
  // }
}
    return (
      <div>
        <>
      <h1>일정</h1>
      <div className="calDiv1">
        <Button type="primary" onClick={showModal}>
          <PlusOutlined /> 일정 추가
        </Button>
        <Modal
            title="일정 추가"
            open={isModalOpen}
            onOk={submitHandler}
            onCancel={handleCancel}
            width={1000}
          >
           <Row gutter={[100, 16]}>

<Col>
<Title level={4}>회원 검색</Title>
<Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
          
</Radio.Group>


<Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
  
          columns={columns}
          dataSource={customers}
          onRow={(record, index) => {
            const usernum = record.usernum;
            const userheight = record.userheight;
            const userwidth = record.userwidth;
            const sex = record.sex;
            const existence = record.existence;
            const name = record.name;
            const obstacle_type = record.obstacle_type;
            const phone = record.phone;
            const address = record.address;
            const memo = record.memo;
            const manager = record.manager;
            const payment = record.payment;
            const inflow = record.inflow;
            const statement = record.statement;
            const birthday = record.birthday;
            const user_purpose = record.user_purpose;
            const vaccinate = record.vaccinate;
            const category = record.category;
            const date_signup = record.date_signup;
            const membership = record.membership;
            const id = record.id;
  
           
            
          }}
          onChange = {consumerHandler}
        />
        
</Col>

<Col>
  <Title level={4}>수업 일시</Title>
    <Space direction="vertical" size={20}>
    <DatePicker 
      dateFormat="yyyy-MM-dd" 
      name="date"
      placeholderText="날짜 선택"
      onChange={dateHandler}      
      />
      
    </Space>
    <div>
      {" "}
      <br></br>{" "}
    </div>
    {/* <TimePicker.RangePicker /> */}
    <Select
      name="startHour"
      showSearch
      placeholder="00시"
      optionFilterProp="starthour"
      onChange={startHourHandler}
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
    />
    <Select
      name="startMinute"
      showSearch
      placeholder="00분"
      optionFilterProp="startminute"
      onChange={startMinuteHandler}
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
    />
    
    <div>
      {" "}
      <br></br>{" "}
    </div>

    <h3>코치</h3>
    <Select
      size="small"
      style={{ width: 120 }}
      onChange = {handleChange}
      showSearch
      name="manager"
      id="manager"
      value={managerData}
      options = {coachList}
     />

    </Col>

  <Col>
  <Title level={4}>기타 메모</Title>
  <TextArea  rows={10} placeholder="메모를 작성하세요."
  maxLength={100} 
  value={memo}
  name="memo"
  onChange={memoHandler}
showCount/>             
</Col>
</Row>
          </Modal>

      </div>
    </>
        <br />
        
        {loading ? (
          "Loading"
        ) : (
          <>
           
    
            
          
            
          <FullCalendar

          
            plugins={[ dayGridPlugin ]}
            initialView = 'dayGridMonth'
            displayEventTime = {false}
            events={state}
            dayMaxEvents = {true}
            moreLinkClick = "popover"
            contentHeight = "800px"
            eventDisplay = 'list-item'
            eventBackgroundColor = "#1864ab"
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
          </>
        )}
        
      </div>
      
    );
  };



  // const format = "YYYY-MM-DD";
  // const { RangePicker } = DatePicker;
  
  // const customFormat = (value) => `custom format: ${value.format(format)}`;
  const { TextArea } = Input;
  const { Title } = Typography;
  
  
  // dayjs.extend(customParseFormat);
  // dayjs(date,"YYYY-MM-DD")
  // const onChange = (time) => {
  //   console.log("Time : ", time);
  // };
  // const onChange2 = (date) => {
  //   console.log('Date: ', date);
  // };
  const onSearch = (value) => console.log(value);

  export default CalendarMain;