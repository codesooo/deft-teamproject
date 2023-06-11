import {  Row, Col, Button, Select, Typography, Input, message, Upload  } from "antd";
import React, {useState} from "react";
import { UploadOutlined } from '@ant-design/icons';
import './NewJournal.css';
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

  
const NewJournal = () => {
    const [value, setValue] = useState('');

    return(
        <>
            <br></br>
            <h2>수업 일지</h2>
            <Row>
                <Col span={2}>
                    <Text>수업 이름</Text>
                </Col>
                <Col span={3}>
                    <Input size="small" style={{width :100}} />
                </Col>
                <Col span={2}>
                    <Text>운동목적</Text>
                </Col>
                <Col span={3}>
                <Select
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
                <Col span={1}>
                    <Text>날짜</Text>
                </Col>
                <Col span={3}>
                    <Input size="small" style={{width :100}} />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col span={2}>
                    <Text>수업 제목</Text>
                </Col>
                <Col span={3}>
                    <Input size="small" style={{width :550}} />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col span={2}>
                    <Text>수업 내용</Text>
                </Col>
                <Col span={11}>
                <TextArea
                    value={value}
                    style={{width :550}}
                    onChange={(e) => setValue(e.target.value)}
                    autoSize={{
                    minRows: 4,
                    maxRows: 6,
                    }}
                />
                </Col>
            </Row>
            <br></br>
            <div className="btn">
                <Button type="primary">확인</Button>
                <Button type="primary">취소</Button>
                <Button type="primary" danger>삭제</Button>
            </div>
        </>
    )

};

export default NewJournal;