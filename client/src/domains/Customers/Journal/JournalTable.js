import {  InputNumber, Row, Col, Button,Table, Modal, Select, Typography, Input, message, Upload   } from "antd";
import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';
//import './NewJournal.css';
import {useNavigate} from 'react-router';
import { PlusOutlined, UploadOutlined} from "@ant-design/icons";
import client from '../../../lib/api/client'

const { Text } = Typography;
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
      title: "수업제목",
      dataIndex: "subject"
    },
    {
      title: "수업이름",
      dataIndex: "classname"
    },
    {
      title: "날짜",
      dataIndex: "date_class"
    }
  ];

const JournalTable = () => {
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
            times: times,
            remains: remains,
            usernum: usernum,
            classname: classname,
            subject: subject,
            purpose: purpose,
            manager: manager,
            contents: contents,
            date_class: date_class,
            ndate_class: ndate_class,
        };

        client 
            .post("/api/consumer/note/class/create", body)
            .then((res) => 
            console.log(res));
            alert("수업일지 등록 완료");
            window.location.reload();

        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    const [times, setTimes] = useState("");
    const [remains, setRemains] = useState("");
    const [classname, setClassname] = useState("");
    const [purpose, setPurpose] = useState("");
    const [manager, setManager] = useState("");
    const [contents, setContents] = useState("");
    const [comments, setComments] = useState("");
    const [date_class, setDate_class] = useState("");
    const [subject, setSubject] = useState("");
    const [ndate_class, setNdate_class] = useState("");

    const timesHandler = (e) => {
        setTimes(e);
    };
    console.log(times);
    const remainsHandler = (e) => {
        setRemains(e);
    };
    console.log(remains);
    const classnameHandler = (e) => {
        e.preventDefault();
        setClassname(e.target.value);
    };
    console.log(classname);

    const purposeHandler = (e) => {
        setPurpose(e);
    };
    console.log(purpose);
    const managerHandler = (e) => {
        e.preventDefault();
        setManager(e.target.value);
    }
    console.log(manager);
    const contentsHandler = (e) => {
        e.preventDefault();
        setContents(e.target.value);
      };
      console.log(contents);
    const commentsHandler = (e) => {
        e.preventDefault();
        setComments(e.target.value);
    };
    console.log(comments);
    const date_classHandler = (e) => {
        e.preventDefault();
        setDate_class(e.target.value);
    };
    console.log(date_class);
    const subjectHandler = (e) =>{
        e.preventDefault();
        setSubject(e.target.value);
    };
    console.log(subject);
    const ndate_classHandler = (e) =>{
        e.preventDefault();
        setNdate_class(e.target.value);
    };
  

    const [classList, setClassList] = useState([]);
    const [loading, setloading] = useState(true);
     
    useEffect(() => {
          getData();
        }, []);

        const getData = async () => {
            await client
            .get(`/api/consumer/note/class/user/${usernum}`)
            .then(
                res => {
                setloading(false);
                setClassList(
                    res.data.map(row => ({
                        subject: row.subject,
                        classname: row.classname,
                        date_class: row.date_class,
                        id : row._id,
                    }))
                );
                console.log(res);
              }
            );
          };

    console.log(classList);

    return(
        <>
            <br></br>
            <Row>
                <Col span={12}>
                    <h2>수업일지</h2>
                </Col>
                <Col span={12}>
                    <Button onClick={showModal}>
                    <PlusOutlined />수업일지 추가</Button>
                        <Modal
                            title="수업일지 추가"
                            open={isModalOpen}
                            onOk={submitHandler}
                            onCancel={handleCancel}
                            width={1000}
                            >
                            <>
                                <br></br>
                                <h2>수업 일지</h2>
                                <Row>
                                    <Col span={2}>
                                        <Text>회차</Text>
                                    </Col>
                                    <Col span={3}>
                                        <InputNumber
                                        size="small" 
                                        style={{width :100}}
                                        name="times"
                                        value={times}
                                        onChange={timesHandler}
                                        placeholder="숫자입력"
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <Text>남은 수업 횟수</Text>
                                    </Col>
                                    <Col span={3}>
                                        <InputNumber
                                        size="small" 
                                        style={{width :100}}
                                        name="remains"
                                        value={remains}
                                        onChange={remainsHandler}
                                        placeholder="숫자입력"
                                        />
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col span={2}>
                                        <Text>수업 이름</Text>
                                    </Col>
                                    <Col span={3}>
                                        <Input 
                                        size="small" 
                                        style={{width :100}}
                                        name="classname"
                                        value={classname}
                                        onChange={classnameHandler}
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <Text>운동목적</Text>
                                    </Col>
                                    <Col span={3}>
                                    {/* <Input 
                                        size="small" 
                                        style={{width :100}}
                                        name="purpose"
                                        value={purpose}
                                        onChange={purposeHandler}
                                        /> */}
                                    <Select
                                        value ={purpose}
                                        onChange={purposeHandler}
                                        defaultValue="운동목적"
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
                                    <Col span={2}>
                                        <Text>관리자</Text>
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
                                        <Text>시작일시</Text>
                                    </Col>
                                    <Col span={5}>
                                        <Input size="small" 
                                        style={{width :150}} 
                                        name="date_class"
                                        value={date_class}
                                        onChange={date_classHandler}
                                        placeholder="YYYY-MM-DD hh-mm"
                                        />
                                    </Col>
                                    <Col span={2}>
                                        <Text>종료일시</Text>
                                    </Col>
                                    <Col span={3}>
                                        <Input size="small" 
                                        style={{width :150}} 
                                        name="ndate_class"
                                        value={ndate_class}
                                        onChange={ndate_classHandler}
                                        placeholder="YYYY-MM-DD hh-mm"
                                        />
                                    </Col>
                                    
                                </Row>
                                <br></br>
                                <Row>
                                    <Col span={2}>
                                        <Text>제목</Text>
                                    </Col>
                                    <Col span={3}>
                                        <Input 
                                        size="small" 
                                        style={{width :415}} 
                                        name="subject"
                                        value={subject}
                                        onChange={subjectHandler}
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
                                        style={{width :550}}
                                        autoSize={{
                                        minRows: 4,
                                        maxRows: 6,
                                        }}
                                        name="contents"
                                        value={contents}
                                        onChange={contentsHandler}
                                    />
                                    </Col>
                                </Row>
                                <br></br>
                            </>
                        </Modal>
                </Col>

            </Row>   
            <br></br>
                <Table
                    columns={columns} 
                    dataSource={classList} 
                    style={{width:900}}
                    onRow={(record, index) => {
                        const times = record.times;
                        const remains = record.remains;
                        const classname = record.classname;
                        const subject = record.subject;
                        const purpose = record.purpose;
                        const manager = record.manager;
                        const contents = record.contents;
                        const date_class = record.date_class;
                        const ndate_class = record.ndate_clas;
                        const id = record.id;
                        return {
                          onClick: (e) => {
                            console.log(usernum);
                            const auth_ = localStorage.getItem('auth');
                            if (auth_ == '"coach"'){
                                navigate('/coach/journal/edit', {
                                    state: {
                                        times: times,
                                        remains: remains,
                                        usernum: usernum,
                                        classname: classname,
                                        subject: subject,
                                        purpose: purpose,
                                        manager: manager,
                                        contents: contents,
                                        date_class: date_class,
                                        ndate_class: ndate_class,
                                        id: id,
                                    },
                                  });
                            }
                            else {
                                navigate('/home/journal/edit', {
                                    state: {
                                        times: times,
                                        remains: remains,
                                        usernum: usernum,
                                        classname: classname,
                                        subject: subject,
                                        purpose: purpose,
                                        manager: manager,
                                        contents: contents,
                                        date_class: date_class,
                                        ndate_class: ndate_class,
                                        id: id,
                                    },
                                  });
                            }
                            
                          }
                        };
                      }}
                    />
        </>
    );

};

export default JournalTable;