import {  Row, Col, Modal, Button, List } from "antd";
import React,{useState, useEffect} from "react";
// import CustomerSearch from "../CustomerSearch";
import './MemberInfo.css';
import {useLocation} from 'react-router-dom';
import client from '../../../lib/api/client';
import {useNavigate} from 'react-router';



const CoachClient = (props) => {

        // const data = [
    //     '김수정(302)',
    //     '나규민(111)',
    //     '남상욱(123)',
    //     '문수경(456)',
    //     '회원이름(회원번호)',
    //   ];

    console.log(props);
    const [data, setData] = useState([]);
    const coachnum = props.coachnum;
    console.log(coachnum);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        await client.get(`/api/member/coach/responsible/${coachnum}`).then(
          res => {
            setData(
              res.data.map(row => ({
                name: row.name,
                usernum: row.usernum,
                id: row._id,
              }))
            );
          }
        );
        };

    let [visible, setVisible] = useState(false);

    console.log(data);

    const move = () => {
        navigate('/coach/customers/info', {
            state: {
                id: data[0].id
            }
        });
    };

    return(
        <>
        <br></br>
            <div className="div2">
                <Row>
                    <List
                        size="small"
                        className="ClientList"
                        header={<div>담당회원</div>}
                        bordered
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item onClick={move}>{item.name}({item.usernum})
                            </List.Item>)}
                        />

                </Row>
            </div>
            <div style={{height: 150}}></div>
        </>
    )
};

export default CoachClient;