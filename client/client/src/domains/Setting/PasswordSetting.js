import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import React, { useState } from "react";
import "./PasswordSetting.css";
import axios from 'axios';

const PasswordSetting = () => {
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

const submitHandler = (e) => {
  e.preventDefault();
  // state에 저장한 값을 가져옵니다.
  console.log(username);
  console.log(passwordOld);
  console.log(passwordNew);
  console.log(passwordCheck);

  let body = {
    username: username,
    password_old: passwordOld,
    password_new: passwordNew,
    password_check: passwordCheck,
  };

  axios
    .post("http://localhost:4000/api/auth/updatePW", body)
    .then((res) => console.log(res));
};

  return (
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
  );
};

export default PasswordSetting;
