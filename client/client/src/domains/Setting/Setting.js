import { Button, Modal, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useState } from 'react';
import './Setting.css';
import client from '../../lib/api/client';
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Setting = () => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 폼 등록 이벤트 핸들러
  const handleOk = (e) => {
    setIsModalOpen(false);
    e.preventDefault();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [username, SetUserName] = useState("");
  const [passwordOld, SetPasswordOld] = useState("");
  const [passwordNew, SetPasswordNew] = useState("");
  const [passwordCheck, SetPasswordCheck] = useState("");

  const usernameHandler = (e) => {
    e.preventDefault();
    SetUserName(e.target.value);
  };

  const passwordOldHandler = (e) => {
    e.preventDefault();
    SetPasswordOld(e.target.value);
  };

  const passwordNewHandler = (e) => {
    e.preventDefault();
    SetPasswordNew(e.target.value);
  };

  const passwordCheckHandler = (e) => {
    e.preventDefault();
    SetPasswordCheck(e.target.value);
  };

  const user = localStorage.getItem('user');
  const move = () => {
    const auth_ = localStorage.getItem('auth');
          if (auth_ == '"coach"'){
            navigate('/coach/mycomments');
          }
          else {
            navigate('/home/mycomments');
          }
  }

const submitHandler = (e) => {
  e.preventDefault();
  console.log("비밀번호 변경 성공");

  let body = {
    username: username,
    password_old: passwordOld,
    password_new: passwordNew,
    password_check: passwordCheck,
  };

  client
    .post("/api/auth/updatePW", body)
    .then((res) => console.log(res));
  };

  
  const auth_ = localStorage.getItem('auth')
  console.log("얘만왜",auth_);
  console.log(user);
  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if(auth_=='"user"'){
      return <div>관리자 및 코치만 볼 수 있는 페이지입니다.</div>;
  }
 

  return (
    <>
      <div id='settingBox'>
          <h3>비밀번호 재설정</h3>
          <Button type="default" onClick={showModal}>
            변경하기
          </Button>
          <Modal title="비밀번호 재설정" open={isModalOpen} onOk={submitHandler} onCancel={handleCancel}>
                      <Space direction="vertical">
                  <table>
                  <tbody>
                        <tr>
                          <td>전화번호</td>
                          <td width="2px"></td>
                          <td>
                            <Input
                            autoComplete="username"
                            name="username"
                            value={username}
                            onChange={usernameHandler}
                            placeholder="아이디" />
                          </td>
                        </tr>
                        <tr>
                          <td>현재 비밀번호</td>
                          <td width="2px"></td>
                          <td>
                            <Input.Password
                            autoComplete="password_old"
                            name="password_old"
                            value={passwordOld}
                            onChange={passwordOldHandler}
                            placeholder="현재 비밀번호" />
                          </td>
                        </tr>
                        <tr>
                          <td>새 비밀번호</td>
                          <td width="2px"></td>
                          <td>
                            <Input.Password
                              autoComplete="password_new"
                              name="password_new"
                              value={passwordNew}
                              onChange={passwordNewHandler}
                              placeholder="새 비밀번호"
                              iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>비밀번호 확인</td>
                          <td width="8px"></td>
                          <td>
                            <Input.Password
                              autoComplete="password_check"
                              name="password_check"
                              value={passwordCheck}
                              onChange={passwordCheckHandler}
                              placeholder="비밀번호 확인"
                              iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                              }
                            />
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </Space>
          </Modal>
      </div>
      <div id='settingBox'>
        <h3>작성한 댓글</h3>
        <Button type="default" onClick={move}>
            확인하기
          </Button>
      </div>
    </>
  );
};

export default Setting;