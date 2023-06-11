import {  Row, Col, Button, Typography, Input, Modal, Tabs } from "antd";
import React, {useState, useEffect} from "react";
import './NewJournal.css';
import JournalTable from "./FcJournalTable";
import ConsultTable from "./FcConsultTable";
import {useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import FcJournalTable from './FcJournalTable';
import FcConsultTable from './FcConsultTable';

const { Text} = Typography;
const { TextArea } = Input;

const FcJournal = () => {
    const location = useLocation();
    const TabPane = Tabs.TabPane;
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const usernum = user.username;

    function callback(key) {
        console.log(key);
      }
    console.log(usernum);

    return(
        <>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="수업일지" key="1">
                        <FcJournalTable />
                </TabPane>
                <TabPane tab="상담일지" key="2">
                        <FcConsultTable />
                </TabPane>
            </Tabs>
            
        </>
    )

};

export default FcJournal;