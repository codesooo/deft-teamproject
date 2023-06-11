import {  Row, Col, Button,Table, Modal, Select, Typography, Input, message, Upload   } from "antd";
import React, {useState, useEffect} from "react";
//import './NewJournal.css';
import {useNavigate} from 'react-router';
import { PlusOutlined, UploadOutlined} from "@ant-design/icons";
import client from '../../../lib/api/client'
import {useLocation} from 'react-router-dom';

const { Text} = Typography;
const { TextArea } = Input;

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  
  const columns = [
    {
      title: "상담날짜",
      dataIndex: "date_counsel"
    },
    {
      title: "상담내용",
      dataIndex: "detail"
    },
    {
        title: "담당자",
        dataIndex: "manager"
    },
  ];



const ConsultTable = () => {
    const location = useLocation();
    const usernum = location.state.usernum;
    console.log(usernum);
    const [value, setValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
      };
      const submitHandler = (e) => {
        e.preventDefault();

        let body = {
            usernum: usernum,
            purpose: purpose,
            manager: manager,
            method: method,
            reception: reception,
            detail: detail,
            date_counsel: date_counsel,
            ndate_counsel: ndate_counsel,
        };

        client 
            .post("/api/consumer/note/counsel/create", body)
            .then((res) => 
            console.log(res));
            alert("상담일지 등록 완료");
            window.location.reload();

        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const [purpose, setPurpose] = useState("");
      const [manager, setManager] = useState("");
      const [method, setMethod] = useState("");
      const [reception, setReception] = useState("");
      const [detail, setDetail] = useState("");
      const [date_counsel, setDate_counsel] = useState("");
      const [ndate_counsel, setNdate_counsel] = useState("");

      const purposeHandler = (e) => {
        setPurpose(e);
      };
      const managerHandler = (e) => {
        e.preventDefault();
        setManager(e.target.value);
      };
      const receptionHandler = (e) =>{
        e.preventDefault();
        setReception(e.target.value);
      };
      const methodHandler = (e) =>{
        e.preventDefault();
        setMethod(e.target.value);
      };
      const detailHandler = (e) => {
        e.preventDefault();
        setDetail(e.target.value);
      };
      const date_counselHandler = (e) =>{
        e.preventDefault();
        setDate_counsel(e.target.value);
      };
      const ndate_counselHandler = (e) =>{
        e.preventDefault();
        setNdate_counsel(e.target.value);
      };

      const [counselList, setCounselList] = useState([]);
      const [loading, setloading] = useState(true);

      useEffect(() => {
        getData();
      }, []);

      const getData = async () => {
          await client
          .get(`/api/consumer/note/counsel/user/${usernum}`)
          .then(
              res => {
              setloading(false);
              setCounselList(
                  res.data.map(row => ({
                      date_counsel: row.date_counsel,
                      detail: row.detail,
                      manager: row.manager,
                      id: row._id,
                  }))
              );
              console.log(res);
            }
          );
        };

  console.log(counselList);
    return(
        <>
            <br></br>
            <Row>
                <Col span={12}>
                    <h2>상담일지</h2>
                </Col>
                <Col span={12}>
                    <Button onClick={showModal}>
                    <PlusOutlined />상담일지 추가</Button>
                        <Modal
                            title="상담일지 추가"
                            open={isModalOpen}
                            onOk={submitHandler}
                            onCancel={handleCancel}
                            width={1000}
                            >
                                            <>
                                <br></br>
                                <h2>상담 일지</h2>
                                <Row>
                                <Col span={2}>
                                        <Text>담당자 이름</Text>
                                    </Col>
                                    <Col span={3}>
                                        <Input 
                                        size="small" 
                                        style={{width :100}} 
                                        name="manager"
                                        value={manager}
                                        onChange={managerHandler}
                                        />
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col span={2}>
                                        <Text>상담 방법</Text>
                                    </Col>
                                    <Col span={3}>
                                        <Input 
                                        size="small" 
                                        style={{width :100}}
                                        name="method"
                                        value={method}
                                        onChange={methodHandler}
                                        />
                                    </Col>
                                    <Col span={1}>
                                        <Text>목적</Text>
                                    </Col>
                                    <Col>
                                    <Select
                                        value ={purpose}
                                        onChange={purposeHandler}
                                        defaultValue="목적"
                                        size="small"
                                        style={{ width: 100 }}
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
                                </Row>
                                <br></br>
                                <Row>
                                    <Col span={2}>
                                        <Text>시작일시</Text>
                                    </Col>
                                    <Col span={5}>
                                        <Input size="small" 
                                        style={{width :150}} 
                                        name="date_counsel"
                                        value={date_counsel}
                                        onChange={date_counselHandler}
                                        placeholder="YYYY-MM-DD hh-mm"
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <Text>종료일시</Text>
                                    </Col>
                                    <Col span={3}>
                                        <Input size="small" 
                                        style={{width :150}} 
                                        name="ndate_counsel"
                                        value={ndate_counsel}
                                        onChange={ndate_counselHandler}
                                        placeholder="YYYY-MM-DD hh-mm"
                                        />
                                    </Col>
                                    
                                </Row>
                                <br></br>
                                <Row>
                                    <Col span={2}>
                                        <Text>접수상태</Text>
                                    </Col>
                                    <Col span={3}>
                                        <Input 
                                        size="small" 
                                        style={{width :415}} 
                                        name="reception"
                                        value={reception}
                                        onChange={receptionHandler}
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
                                        style={{width :550}}
                                        autoSize={{
                                        minRows: 4,
                                        maxRows: 6,
                                        }}
                                        name="detail"
                                        value={detail}
                                        onChange={detailHandler}
                                    />
                                    </Col>
                                </Row>
                                <br></br>
                            </>
                        </Modal>
                </Col>

            </Row>   
            <br></br>
            <Row>
                <Table
                    columns={columns}
                    dataSource={counselList}
                    style={{width:900}}
                    onRow={(record, index) => {
                        const purpose = record.purpose;
                        const manager = record.manager;
                        const method = record.method;
                        const reception = record.reception;
                        const detail = record.detail;
                        const date_counsel = record.date_counsel;
                        const ndate_counsel = record.ndate_counsel;
                        const id = record.id;
                        return {
                          onClick: (e) => {
                            console.log(usernum);
                            const auth_ = localStorage.getItem('auth');
                            if (auth_ == '"coach"'){
                              navigate('/coach/journal/counseledit', {
                                state: {
                                  usernum: usernum,
                                  purpose: purpose,
                                  manager: manager,
                                  method: method,
                                  reception: reception,
                                  detail: detail,
                                  date_counsel: date_counsel,
                                  ndate_counsel: ndate_counsel,
                                  id: id,
                                },
                              });
                            }
                            else{
                              navigate('/home/journal/counseledit', {
                                state: {
                                  usernum: usernum,
                                  purpose: purpose,
                                  manager: manager,
                                  method: method,
                                  reception: reception,
                                  detail: detail,
                                  date_counsel: date_counsel,
                                  ndate_counsel: ndate_counsel,
                                  id: id,
                                },
                              });
                            }
                          }
                        };
                      }}
                    />
            </Row>
             
                
        </>
    )

};

export default ConsultTable;