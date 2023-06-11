import {  Row, Col, Button, Typography, Input, Modal, InputNumber } from "antd";
import React, {useState, useEffect} from "react";
import Client from "./Client.js";
import './MemberInfo.css';
import {useNavigate} from 'react-router';
import {useLocation} from 'react-router-dom';
import client from '../../lib/api/client';

const {Text} = Typography;
const {TextArea} = Input;

const MemberInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    console.log(id);
    const [adminList, setAdminList] = useState([]);

    useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        await client
        .get(`/api/member/admin/${id}`)
        .then( d =>{
            let row = d.data;
            setAdminList({
              name: row.name,
              phone: row.phone,
              username: row.username,
              password: row.password,
              email: row.email,
              position: row.position,
              job: row.job,
            })
            console.log(d);
          }
        );
      };

      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };


    const Delete = (e) => {
        Modal.confirm({
            title: "정말로 삭제하시겠습니까?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
              client.delete(`/api/member/admin/${id}`).then((res) => 
              console.log(res)
              );
              alert("삭제완료");
              navigate('/home/members'); 
            },
          });
    };

    const editHandler = (e) => {
        client
            .patch(`/api/member/admin/${id}`, adminList)
            .then((res) =>
                console.log(res)
            );
            alert("수정 완료");
            window.location.reload();
       };    
    
    
    return( 
    <>
      <Row gutter={10}>
        <Col span={12}>
            <br></br>
            <h2>관리자 상세정보</h2>
            <h2 className="name">{adminList.name}</h2>
                    <>
                        <Col span={10}>
                        <br></br>
                        <Row>
                            <Col span={8}>
                            <div>이름</div>
                            </Col>
                            <Col span={16}>
                            <Input 
                                autoComplete="name"
                                name="name"
                                id="name"
                                value={adminList.name}
                                onChange={e => {
                                let value = e.target.value;
                                setAdminList({
                                    name : value,
                                    phone: adminList.phone,
                                    username: adminList.username,
                                    password: adminList.password,
                                    email: adminList.email,
                                    position: adminList.position,
                                    job: adminList.job,
                                });
                                }}
                            />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={8}>
                            <div>전화번호</div>
                            </Col>
                            <Col span={16}>
                            <Input 
                                placeHolder="'-'없이 11자리 숫자 입력"
                                autoComplete="phone"
                                name="phone"
                                id="phone"
                                value={adminList.phone}
                                onChange={e => {
                                let value = e.target.value;
                                setAdminList({
                                    name : adminList.name,
                                    phone: value,
                                    username: adminList.username,
                                    password: adminList.password,
                                    email: adminList.email,
                                    position: adminList.position,
                                    job: adminList.job,
                                });
                                }}
                            />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={8}>
                            <div>직무</div>
                            </Col>
                            <Col span={16}>
                            <Input 
                                autoComplete="job"
                                name="job"
                                id="job"
                                value={adminList.job}
                                onChange={e => {
                                let value = e.target.value;
                                setAdminList({
                                    name : adminList.name,
                                    phone: adminList.phone,
                                    username: adminList.username,
                                    password: adminList.password,
                                    email: adminList.email,
                                    position: adminList.position,
                                    job: value,
                                });
                                }}
                            />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col
                            span={8}
                            >
                            <div>직책</div>
                            </Col>
                            <Col span={16}>
                            <Input 
                                autoComplete="position"
                                name="position"
                                id="position"
                                value={adminList.position}
                                onChange={e => {
                                let value = e.target.value;
                                setAdminList({
                                    name : adminList.name,
                                    phone: adminList.phone,
                                    username: adminList.username,
                                    password: adminList.password,
                                    email: adminList.email,
                                    position: value,
                                    job: adminList.job,
                                });
                                }}
                            />
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={8}>
                            <div>이메일</div>
                            </Col>
                            <Col span={16}>
                            <Input 
                               autoComplete="email"
                               name="email"
                               id="email"
                               value={adminList.email}
                               onChange={e => {
                               let value = e.target.value;
                               setAdminList({
                                   name : adminList.name,
                                   phone: adminList.phone,
                                   username: adminList.username,
                                   password: adminList.password,
                                   email: value,
                                   position: adminList.position,
                                   job: adminList.job,
                               });
                               }}
                            />
                            </Col>
                        </Row>
                        </Col> 
                    </>
        </Col>
        
      </Row>
      
      <br></br><br></br>
      <div className="btn">
      <Button type="primary" onClick={editHandler}>
          수정
        </Button>
      <Button type="primary" danger onClick={Delete}>삭제</Button>
      </div>
      </>
    )
};

export default MemberInfo;