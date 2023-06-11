import {   Row, Col, Table, Typography, Input, message   } from "antd";
import React, {useState, useEffect} from "react";
//import './NewJournal.css';
import {useNavigate} from 'react-router';
import client from '../../lib/api/client'
import { useSelector } from "react-redux";

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

const FcJournalTable = () => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const usernum = user.username;
    console.log(usernum);
    const [value, setValue] = useState('');
    const navigate = useNavigate();
  

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
                            navigate('/fc/journal/view', {
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
                        };
                      }}
                    />
        </>
    );

};

export default FcJournalTable;