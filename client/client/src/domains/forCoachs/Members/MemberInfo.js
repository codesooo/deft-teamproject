import {  Row, Col, Button, Typography, Input, Modal, InputNumber } from "antd";
import React, {useState, useEffect} from "react";
import './MemberInfo.css';
import {useNavigate} from 'react-router';
import {useLocation} from 'react-router-dom';
import client from '../../../lib/api/client';

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


    
    return( 
    <>
      <Row gutter={10}>
        <Col span={12}>
            <br></br>
            <h2 className="name">{adminList.name}</h2>
           
            <div className="div1">
                    <>
                        <Col span={10}>
                        <br></br>
                        <Row>
                            <Col span={10}>
                            <h3>이름</h3>
                            </Col>
                            <Col span={20}>
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
                            <Col span={10}>
                            <h3>전화번호</h3>
                            </Col>
                            <Col span={20}>
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
                            <Col span={10}>
                            <h3>직무</h3>
                            </Col>
                            <Col span={20}>
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
                            <h3>직책</h3>
                            </Col>
                            <Col span={20}>
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
                            <Col span={6}>
                            <h3>이메일</h3>
                            </Col>
                            <Col span={20}>
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
            </div>
        </Col>
        <Col span={12}></Col>
      </Row>
      <br></br><br></br>
      </>
    )
};

export default MemberInfo;