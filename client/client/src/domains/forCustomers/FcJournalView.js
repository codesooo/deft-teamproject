import {  Row, Col, Button, Typography, Input, Modal, InputNumber, Select } from "antd";
import React, {useState, useEffect} from "react";
import './NewJournal.css';
import {useLocation} from 'react-router-dom';
import client from '../../lib/api/client';
import {useNavigate} from 'react-router';

const { Text} = Typography;
const { TextArea } = Input;


const FcJournalView = () => {
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
          else{
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
                                <Text strong>{classList.subject}</Text>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={2}>
                                <Text>수업 이름</Text>
                            </Col>
                            <Col span={2}>
                                <Text strong>{classList.classname}</Text>
                            </Col>
                            <Col span={2}>
                                <Text>관리자</Text>
                            </Col>
                            <Col span={2}>
                                <Text strong>{classList.manager}</Text>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={2}>
                                <Text>운동목적</Text>
                            </Col>
                            <Col span={2}>
                                <Text strong>{classList.purpose}</Text>
                            </Col>
                            <Col span={2}>
                                <Text>회차</Text>
                            </Col>
                            <Col span={3}>
                                <Text strong>{classList.times}/{classList.times + classList.remains}</Text>
                            </Col>
                            </Row>
                            <br></br>
                            <Row>
                            <Col span={2}>
                                <Text>시작일시</Text>
                            </Col>
                            <Col span={2}>
                                <Text strong>{classList.date_class}</Text>
                            </Col>
                            <Col span={2}>
                                <Text>종료일시</Text>
                            </Col>
                            <Col span={3}>
                                <Text strong>{classList.ndate_class}</Text>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col span={2}>
                                <Text>수업 내용</Text>
                            </Col>
                            <Col span={11}>
                            <TextArea
                                value={classList.contents}
                                style={{width :550}}
                                autoSize={{
                                minRows: 4,
                                maxRows: 6,
                                }}
                            />
                            </Col>
                        </Row>
                        <br></br>
                        <div className="btn">
                        </div>
           
        </>
    )

};

export default FcJournalView;