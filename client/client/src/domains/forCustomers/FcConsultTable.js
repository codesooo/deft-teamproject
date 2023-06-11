import {  Row, Col, Button,Table, Modal, Select, Typography, Input, message, Upload   } from "antd";
import React, {useState, useEffect} from "react";
//import './NewJournal.css';
import {useNavigate} from 'react-router';
import { PlusOutlined, UploadOutlined} from "@ant-design/icons";
import client from '../../lib/api/client'
import {useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";

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



const FcConsultTable = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const usernum = user.username;
    console.log(usernum);
    const [value, setValue] = useState('');
    const navigate = useNavigate();
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
                            navigate('/fc/journal/consultview', {
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
                        };
                      }}
                    />
            </Row>
        </>
    )

};

export default FcConsultTable;