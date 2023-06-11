import {  Row, Col, Button, Typography, Input, Modal, Select } from "antd";
import React, {useState, useEffect} from "react";
import './NewJournal.css';
import {useLocation} from 'react-router-dom';
import client from '../../../lib/api/client'
import {useNavigate} from 'react-router';

const { Text} = Typography;
const { TextArea } = Input;
const CJournalEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const usernum = location.state.usernum;
    const id = location.state.id;
    console.log(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [counselList, setCounselList] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        getData();
      }, []);

      const showModal = () => {
        setIsModalOpen(true);
      };
      const editHandler = (e) => {
        client
            .patch(`/api/consumer/note/counsel/${id}`, counselList)
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
          .get(`/api/consumer/note/counsel/${id}`)
          .then( d =>{
              let counsel = d.data;
              setCounselList({
                purpose: counsel.purpose,
                manager: counsel.manager,
                method: counsel.method,
                reception: counsel.reception,
                detail: counsel.detail,
                date_counsel: counsel.date_counsel,
                ndate_counsel: counsel.ndate_counsel,
              })
              console.log(d);
            }
          );
        };

   const DeleteCounsel = (e) => {
    Modal.confirm({
        title: "정말로 삭제하시겠습니까?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          client.delete(`/api/consumer/note/counsel/${id}`).then((res) => 
          console.log(res)
          );
          alert("삭제완료");
          const auth_ = localStorage.getItem('auth');
          if (auth_ == '"coach"'){
            navigate('/coach/journal', 
          {
            state: {
                usernum: usernum,
            }
        });
          }
          else {
            navigate('/home/journal', 
            {
              state: {
                  usernum: usernum,
              }
          });
          }
          
        },
      });
   };

   console.log(counselList);

    return(
                    <>
                    <h2>상담 일지</h2>
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
                                        value={counselList.purpose}
                                        onChange={e => {
                                        let value = e;
                                        setCounselList({
                                            purpose: value,
                                            method: counselList.method,
                                            reception : counselList.reception,
                                            date_counsel: counselList.date_counsel,
                                            ndate_counsel: counselList.ndate_counsel,
                                            detail: counselList.detail,
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
                            <Text>상담방법</Text>
                        </Col>
                        <Col span={2}>
                        <Input
                                    autoComplete="method"
                                    style={{ width: 150 }}
                                    name="method"
                                    id="method"
                                    value={counselList.method}
                                    onChange={e => {
                                    let value = e.target.value;
                                    setCounselList({
                                        purpose: counselList.purpose,
                                        method: value,
                                        reception : counselList.reception,
                                        date_counsel: counselList.date_counsel,
                                        ndate_counsel: counselList.ndate_counsel,
                                        detail: counselList.detail,
                                    });
                                    }}
                                />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span={2}>
                            <Text>상담날짜</Text>
                        </Col>
                        <Col span={2}>
                        <Input
                                        autoComplete="date_counsel"
                                        name="date_counsel"
                                        id="date_counsel"
                                        style={{ width: 150 }}
                                        value={counselList.date_counsel}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setCounselList({
                                            purpose: counselList.purpose,
                                            date_counsel: value,
                                            method: counselList.method,
                                            reception : counselList.reception,
                                            ndate_counsel: counselList.ndate_counsel,
                                            detail: counselList.detail,
                                        });
                                        }}
                                    />
                        </Col>
                        <Col span={2}>
                            <Text>다음상담</Text>
                        </Col>
                        <Col span={2}>
                        <Input
                                                autoComplete="ndate_counsel"
                                                name="ndate_counsel"
                                                id="ndate_counsel"
                                                style={{ width: 150 }}
                                                value={counselList.ndate_counsel}
                                                onChange={e => {
                                                let value = e.target.value;
                                                setCounselList({
                                                    purpose: counselList.purpose,
                                                    date_counsel: counselList.date_counsel,
                                                    ndate_counsel: value,
                                                    detail: counselList.detail,
                                                    method: counselList.method,
                                                    reception: counselList.reception,
                                                });
                                                }}
                                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span={2}>
                            <Text>접수상태</Text>
                        </Col>
                        <Col span={4}>
                        <Input
                                        autoComplete="reception"
                                        name="reception"
                                        id="reception"
                                        style={{width :510}}
                                        value={counselList.reception}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setCounselList({
                                            purpose: counselList.purpose,
                                            date_counsel: counselList.date_counsel,
                                            ndate_counsel: counselList.ndate_counsel,
                                            detail: counselList.detail,
                                            reception: value,
                                            method: counselList.method,
                                        });
                                        }}
                                    />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span={2}>
                            <Text>상담 내용</Text>
                        </Col>
                        <Col span={11}>
                        <TextArea
                                style={{width :510}}
                                autoSize={{
                                minRows: 4,
                                maxRows: 6,
                                }}
                                autoComplete="detail"
                                        name="detail"
                                        id="detail"
                                        value={counselList.detail}
                                        onChange={e => {
                                        let value = e.target.value;
                                        setCounselList({
                                            purpose: counselList.purpose,
                                            date_counsel: counselList.date_counsel,
                                            ndate_counsel: counselList.ndate_counsel,
                                            detail: value,
                                            reception: counselList.reception,
                                            method: counselList.method,
                                        });
                                        }}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <div className="btn">
                    <Button type="primary" onClick={editHandler}>수정</Button>
                    <Button onClick={DeleteCounsel} type="primary" danger>삭제</Button>
                    </div>
        </>
    )

};

export default CJournalEdit;