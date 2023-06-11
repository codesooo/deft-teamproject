import {  Row, Col, Button, Typography, Input, Modal, Tabs } from "antd";
import React, {useState, useEffect} from "react";
import './NewJournal.css';
import JournalTable from "./JournalTable";
import ConsultTable from "./ConsultTable";
import {useLocation} from 'react-router-dom';

const { Text} = Typography;
const { TextArea } = Input;

const Journal = () => {
    const location = useLocation();
    const TabPane = Tabs.TabPane;
    const usernum = location.state.usernum;

    function callback(key) {
        console.log(key);
      }

    return(
        <>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="수업일지" key="1">
                        <JournalTable usernum={usernum} />
                </TabPane>
                <TabPane tab="상담일지" key="2">
                        <ConsultTable usernum={usernum} />
                </TabPane>
            </Tabs>
            
        </>
    )

};

export default Journal;