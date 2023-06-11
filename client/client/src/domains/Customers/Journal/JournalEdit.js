import {  Row, Col, Button, Typography, Input, Modal, InputNumber, Select } from "antd";
import React, {useState, useEffect} from "react";
import './NewJournal.css';
import {useLocation} from 'react-router-dom';
import client from '../../../lib/api/client';
import {useNavigate} from 'react-router';

const { Text} = Typography;
const { TextArea } = Input;


const JournalEdit = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    const usernum = location.state.usernum;
    console.log(usernum);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        getData();
      }, []);

      const showModal = () => {
        setIsModalOpen(true);
      };
      const editHandler = (e) => {
        client
            .patch(`/api/consumer/note/class/${id}`, classList)
            .then((res) =>
                console.log(res)
            );
            alert("수정 완료");
            window.location.reload();
       };    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    

      const getData = async () => {
          await client
          .get(`/api/consumer/note/class/${id}`)
          .then( d =>{
              let row = d.data;
              setClassList({
                times: row.times,
                remains: row.remains,
                usernum: row.usernum,
                classname: row.classname,
                subject: row.subject,
                purpose: row.purpose,
                manager: row.manager,
                contents: row.contents,
                date_class: row.date_class,
                ndate_class: row.ndate_class,
              })
              console.log(d);
            }
          );
        };

   const DeleteClass = (e) => {
    Modal.confirm({
        title: "정말로 삭제하시겠습니까?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          client.delete(`/api/consumer/note/class/${id}`).then((res) => 
          console.log(res)
          );
          alert("삭제완료");
          const auth_ = localStorage.getItem('auth');
          if (auth_ == '"coach"'){
            navigate('/coach/journal', {
                state: {
                    usernum: usernum,
                }
            });
          }
          else {
            navigate('/home/journal', {
                state: {
                    usernum: usernum,
                }
            });
          }
          
        },
      });
   };

   console.log(classList);


    return(
        <>
               <br></br>
                        <h2>수업 일지</h2>
                        <Row>
                            <Col span={2}>
                                <Text>제목</Text>
                            </Col>
                            <Col span={2}>
                            <Input 
                                        size="small" 
                                        style={{width :510}} 
                                        autoComplete="subject"
                                        name="subject"
                                        id="subject"
                                        value={classList.subject}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: classList.times,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: value,
                                            purpose: classList.purpose,
                                            manager: classList.manager,
                                            contents: classList.contents,
                                            date_class: classList.date_class,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                        />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={2}>
                                <Text>수업 이름</Text>
                            </Col>
                            <Col span={2}>
                            <Input 
                                        size="small" 
                                        style={{width :150}}
                                        autoComplete="classname"
                                        name="classname"
                                        id="classname"
                                        value={classList.classname}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: classList.times,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: value,
                                            subject: classList.subject,
                                            purpose: classList.purpose,
                                            manager: classList.manager,
                                            contents: classList.contents,
                                            date_class: classList.date_class,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                        />
                            </Col>
                            <Col span={2}>
                                <Text>관리자</Text>
                            </Col>
                            <Col span={2}>
                            <Input 
                                        size="small" 
                                        style={{width :150}} 
                                        autoComplete="manager"
                                        name="manager"
                                        id="manager"
                                        value={classList.manager}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: classList.times,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: classList.subject,
                                            purpose: classList.purpose,
                                            manager: value,
                                            contents: classList.contents,
                                            date_class: classList.date_class,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                        />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={2}>
                                <Text>운동목적</Text>
                            </Col>
                            <Col span={2}>
                                <Select
                                        defaultValue="운동목적"
                                        size="small"
                                        style={{ width: 150 }}
                                        autoComplete="purpose"
                                        name="purpose"
                                        id="purpose"
                                        value={classList.purpose}
                                        onChange={e => {
                                        let value = e;
                                        setClassList({
                                            times: classList.times,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: classList.subject,
                                            purpose: value,
                                            manager: classList.manager,
                                            contents: classList.contents,
                                            date_class: classList.date_class,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                        options={[
                                        {
                                            value: '근력강화',
                                            label: '근력강화',
                                        },
                                        {
                                            value: '체형교정',
                                            label: '체형교정',
                                        },
                                        {
                                            value: '신체컨디셔닝',
                                            label: '신체컨디셔닝',
                                        },
                                        {
                                            value: '트랜스퍼',
                                            label: '트랜스퍼',
                                        },
                                        {
                                            value: '건강관리',
                                            label: '건강관리',
                                        },
                                        {
                                            value: '운동습관형성',
                                            label: '운동습관형성',
                                        },
                                        {
                                            value: '통증경감',
                                            label: '통증경감',
                                        },
                                        {
                                            value: '체력향상',
                                            label: '체력향상',
                                        },
                                        {
                                            value: '일상기능회복',
                                            label: '일상기능회복',
                                        },
                                        {
                                            value: '전문적운동지도',
                                            label: '전문적운동지도',
                                        },
                                        {
                                            value: '골프트레이닝',
                                            label: '골프트레이닝',
                                        },
                                        {
                                            value: '기타',
                                            label: '기타',
                                        },
                                        ]}
                                    />
                            </Col>
                            <Col span={2}>
                                <Text>회차</Text>
                            </Col>
                            <Col span={3}>
                            <InputNumber
                                        size="small" 
                                        style={{width :40}}
                                        autoComplete="times"
                                        name="times"
                                        id="times"
                                        value={classList.times}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: value,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: classList.subject,
                                            purpose: classList.purpose,
                                            manager: classList.manager,
                                            contents: classList.contents,
                                            date_class: classList.date_class,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                            />
                                <Text strong> 회 / </Text>
                                <InputNumber
                                        size="small" 
                                        style={{width :40}}
                                        autoComplete="remains"
                                        name="remains"
                                        id="remains"
                                        value={classList.remains}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: classList.times,
                                            remains: value,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: classList.subject,
                                            purpose: classList.purpose,
                                            manager: classList.manager,
                                            contents: classList.contents,
                                            date_class: classList.date_class,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                        />
                                        <Text strong> 회</Text>
                            </Col>
                            </Row>
                            <br></br>
                            <Row>
                            <Col span={2}>
                                <Text>시작일시</Text>
                            </Col>
                            <Col span={2}>
                            <Input size="small" 
                                        style={{width :150}} 
                                        placeholder="YYYY-MM-DD hh-mm"
                                        autoComplete="date_class"
                                        name="date_class"
                                        id="date_class"
                                        value={classList.date_class}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: classList.times,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: classList.subject,
                                            purpose: classList.purpose,
                                            manager: classList.manager,
                                            contents: classList.contents,
                                            date_class: value,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                        />
                            </Col>
                            <Col span={2}>
                                <Text>종료일시</Text>
                            </Col>
                            <Col span={3}>
                            <Input size="small" 
                                        style={{width :150}} 
                                        placeholder="YYYY-MM-DD hh-mm"
                                        autoComplete="ndate_class"
                                        name="ndate_class"
                                        id="ndate_class"
                                        value={classList.ndate_class}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: classList.times,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: classList.subject,
                                            purpose: classList.purpose,
                                            manager: classList.manager,
                                            contents: classList.contents,
                                            date_class: classList.date_class,
                                            ndate_class: value,
                                        });
                                        }}
                                        />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={2}>
                                <Text>수업 내용</Text>
                            </Col>
                            <Col span={11}>
                            <TextArea
                                        style={{width :510}}
                                        autoSize={{
                                        minRows: 4,
                                        maxRows: 6,
                                        }}
                                        autoComplete="contents"
                                        name="contents"
                                        id="contents"
                                        value={classList.contents}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setClassList({
                                            times: classList.times,
                                            remains: classList.remains,
                                            usernum: classList.usernum,
                                            classname: classList.classname,
                                            subject: classList.subject,
                                            purpose: classList.purpose,
                                            manager: classList.manager,
                                            contents: value,
                                            date_class: classList.date_class,
                                            ndate_class: classList.ndate_class,
                                        });
                                        }}
                                    />
                            </Col>
                        </Row>
                        <br></br>
                        <div className="btn">
                            <Button type="primary" onClick={editHandler}>수정</Button>
                            <Button type="primary" danger onClick={DeleteClass}>삭제</Button>
                        </div>
           
        </>
    )

};

export default JournalEdit;