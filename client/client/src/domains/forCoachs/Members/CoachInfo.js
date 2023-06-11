import {  Row, Col, Button, Typography, Input, Modal, InputNumber } from "antd";
import React, {useState, useEffect} from "react";
import Client from "./CoachClient.js";
import './MemberInfo.css';
import {useNavigate} from 'react-router';
import {useLocation} from 'react-router-dom';
import client from '../../../lib/api/client';

const {Text} = Typography;
const {TextArea} = Input;

const CoachInfo = () => {
    let [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    console.log(id);
    const [coachList, setCoachList] = useState([]);

    useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
        await client
        .get(`/api/member/coach/${id}`)
        .then( d =>{
            let row = d.data;
            setCoachList({
              name: row.name,
              phone: row.phone,
              username: row.username,
              password: row.password,
              email: row.email,
              job: row.job,
              record: row.record,
              coachnum: row.coachnum,
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
                <h2 className="name">{coachList.name}</h2>
                <Row>
                    <Col span={8}>이름</Col>
                    <Col span={5}>{coachList.name}</Col>

                </Row><br></br>
                <Row>
                    <Col span={8}>직책</Col>
                    <Col span={5}>코치</Col>
                </Row><br></br>
                <Row>
                <Col span={8}>전화번호</Col>
                <Col span={5}>{coachList.phone}</Col>
                
               </Row><br></br>
               <Row>
                <Col span={8}>코치번호</Col>
                <Col span={5}>{coachList.coachnum}</Col>

                
               </Row><br></br>
                <Row>
                    <Col span={8}>이메일</Col>
                    <Col span={5}>{coachList.email}</Col>
                </Row><br></br>
                <Row>
                    <Col span={8}>직무</Col>
                    <Col span={5}>{coachList.job}</Col>

                </Row><br></br>
                <Row>
                    <Col span={8}>이력</Col>
                    <Col span={5}>{coachList.record}</Col>
                </Row><br></br>
                <Row>
                    <Col span={8}>담당회원</Col>
                    <Col span={8}>
                        <Button type="dashed"
                                onClick={ () => {setVisible(!visible)}}>
                                {visible ? "닫기" : "담당회원 조회"}</Button>
                    </Col>
                </Row><br></br>
                <Col span={7}>
                {visible && <Client coachnum = {coachList.coachnum} />}
                </Col>
                <div className="div1">
                        <>
                        <Row>
                        <Col span={12}>
                            <Row>
                            <Col span={10}>
                                
                            </Col>
                            </Row>
                        </Col>
                        </Row>
                    </>
                </div>
            </Col>
        </Row>
        
        </>);

};

export default CoachInfo;