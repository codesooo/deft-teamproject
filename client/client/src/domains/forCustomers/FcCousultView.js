import {  Row, Col, Button, Typography, Input, Modal } from "antd";
import React, {useState, useEffect} from "react";
import './NewJournal.css';
import {useLocation} from 'react-router-dom';
import client from '../../lib/api/client'
import {useNavigate} from 'react-router';

const { Text} = Typography;
const { TextArea } = Input;
const FcConsultView = () => {
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

   console.log(counselList);

    return(
                    <>
                    <h2>상담 일지</h2>
                    <Row>
                        <Col span={2}>
                            <Text>운동목적</Text>
                        </Col>
                        <Col span={2}>
                            <Text strong>{counselList.purpose}</Text>
                        </Col>
                        <Col span={2}>
                            <Text>상담방법</Text>
                        </Col>
                        <Col span={3}>
                            <Text strong>{counselList.method}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}>
                            <Text>상담날짜</Text>
                        </Col>
                        <Col span={2}>
                            <Text strong>{counselList.date_counsel}</Text>
                        </Col>
                        <Col span={2}>
                            <Text>다음상담</Text>
                        </Col>
                        <Col span={2}>
                            <Text strong>{counselList.ndate_counsel}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}>
                            <Text>접수상태</Text>
                        </Col>
                        <Col span={4}>
                            <Text strong>{counselList.reception}</Text>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span={2}>
                            <Text>상담 내용</Text>
                        </Col>
                        <Col span={11}>
                        <TextArea
                            value = {counselList.detail}
                            style={{width :550}}
                            autoSize={{
                            minRows: 4,
                            maxRows: 6,
                            }}
                        >
                        </TextArea>
                        </Col>
                    </Row>
                    <br></br>
                    <div className="btn">
                    </div>
        </>
    )

};

export default FcConsultView;