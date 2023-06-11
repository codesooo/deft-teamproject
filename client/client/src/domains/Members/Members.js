import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Modal, Input, Tabs } from "antd";
import { useNavigate } from "react-router";
import "./Members.css";
import NewMember from "./NewMember.js";
import { Link, Outlet } from "react-router-dom";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import client from "../../lib/api/client";
import user from "../../modules/user";
import { useSelector } from "react-redux";

const onSearch = (value) => console.log(value);
const { TextArea } = Input;

const columns = [
  {
    title: "이름",
    dataIndex: "name",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },
    filterIcon: () => {
      return <SearchOutlined />;
    },
    onFilter: (value, record) => {
      return record.name == value;
    },
  },
  {
    title: "연락처",
    dataIndex: "phone",
  },
  {
    title: "이메일",
    dataIndex: "email",
  },
  {
    title: "직무",
    dataIndex: "job",
  },
];

const Members = () => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [admin, setAdmin] = useState([]);
  const [coach, setCoach] = useState([]);
  const [loading, setloading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState([]);
  const [position, setPosition] = useState([]);
  const [job, setJob] = useState([]);

  const [coachName, setCoachName] = useState("");
  const [coachPhone, setCoachPhone] = useState("");
  const [coachUserName, setCoachUserName] = useState("");
  const [coachPassword, setCoachPassword] = useState("");
  const [coachEmail, setCoachEmail] = useState([]);
  const [coachJob, setCoachJob] = useState([]);
  const [record, setRecord] = useState([]);
  const [coachnum, setCoachnum] = useState("");

  const TabPane = Tabs.TabPane;
  const navigate = useNavigate();

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    getAdminData();
    getCoachData();
  }, []);

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const phoneHandler = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  const usernameHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const positionHandler = (e) => {
    e.preventDefault();
    setPosition(e.target.value);
  };

  const jobHandler = (e) => {
    e.preventDefault();
    setJob(e.target.value);
  };

  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const coachNameHandler = (e) => {
    e.preventDefault();
    setCoachName(e.target.value);
  };
  const coachPhoneHandler = (e) => {
    e.preventDefault();
    setCoachPhone(e.target.value);
  };
  const coachUserNameHandler = (e) => {
    e.preventDefault();
    setCoachUserName(e.target.value);
  };
  const coachPasswordHandler = (e) => {
    e.preventDefault();
    setCoachPassword(e.target.value);
  };

  const coachEmailHandler = (e) => {
    e.preventDefault();
    setCoachEmail(e.target.value);
  };

  const coachJobHandler = (e) => {
    e.preventDefault();
    setCoachJob(e.target.value);
  };
  const recordHandler = (e) => {
    e.preventDefault();
    setRecord(e.target.value);
  };
  const coachnumHandler = (e) => {
    e.preventDefault();
    setCoachnum(e.target.value);
  };

  const getAdminData = async () => {
    await client.get("/api/member/admin").then((res) => {
      setloading(false);
      setAdmin(
        res.data.map((row) => ({
          name: row.name,
          position: row.position,
          phone: row.phone,
          email: row.email,
          username: row.username,
          password: row.password,
          job: row.job,
          id: row._id,
        }))
      );
    });
  };

  console.log(admin);

  const getCoachData = async () => {
    await client.get("/api/member/coach").then((res) => {
      setloading(false);
      setCoach(
        res.data.map((row) => ({
          name: row.name,
          phone: row.phone,
          email: row.email,
          username: row.username,
          password: row.password,
          job: row.job,
          record: row.record,
          coachnum: row.coachnum,
          id: row._id,
        }))
      );
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const submitAdmin = (e) => {
    // if ([name, phone, username, password].includes('')) {
    //   alert('빈 칸을 모두 입력하세요.');
    //   return;
    // }

    e.preventDefault();

    let body = {
      name: name,
      phone: phone,
      username: username,
      password: password,
    };

    let register = {
      username: username,
      password: password,
      role: "admin",
    };

    let result1 = name.replace(/ /g, "");
    let result2 = phone.replace(/ /g, "");
    let result3 = username.replace(/ /g, "");
    let result4 = password.replace(/ /g, "");

    if (result1 == "" || result2 == "" || result3 == "" || result4 == "") {
      alert("빈 칸을 모두 입력하세요.");
      return;
    } else {
      client
        .post("/api/member/admin/create", body)
        .then((res) => console.log(res));

      client
        .post("/api/auth/register", register)
        .then((res2) => console.log(res2));

      alert("관리자 등록 완료");
    }

    // client
    //   .post('/api/member/admin/create', body)
    //   .then((res) => console.log(res));

    // client
    //   .post('/api/auth/register', register)
    //   .then((res2) => console.log(res2));

    // alert('관리자 등록 완료');
    setIsModalOpen2(false);
    window.location.reload();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const submitCoach = (e) => {
    if (
      // [coachName, coachPhone, coachUserName, coachPassword, coachnum].includes(
      //   '',
      // )
      [coachName, coachPhone].includes("")
    ) {
      alert("빈 칸을 모두 입력하세요.");
      return;
    }
    e.preventDefault();

    let body = {
      name: coachName,
      phone: coachPhone,
      coachnum: coachPhone.substr(7),
    };

    // let register = {
    //   username: coachUserName,
    //   password: coachPassword,
    //   role: 'coach',
    // };

    let result1 = coachName.replace(/ /g, "");
    let result2 = coachPhone.replace(/ /g, "");

    if (result1 == "" || result2 == "") {
      alert("빈 칸을 모두 입력하세요.");
      return;
    } else {
      client
        .post("/api/member/coach/create", body)
        .then((res) => console.log(res));
      // client.post('/api/auth/register', register).then((res) => console.log(res));
      alert("코치 등록 완료");
    }

    // client
    //   .post('/api/member/coach/create', body)
    //   .then((res) => console.log(res));
    // // client.post('/api/auth/register', register).then((res) => console.log(res));
    // alert('코치 등록 완료');
    window.location.reload();
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const auth_ = localStorage.getItem("auth");

  const user = localStorage.getItem("user");
  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if (auth_ != '"admin"') {
    return <div>관리자만 볼 수 있는 페이지입니다.</div>;
  }

  const doubleCheck = async (coachPhone) => {
    console.log("전번:", coachPhone);
    await client
      .post("/api/member/coach/confirm/", {
        phone: coachPhone,
      })

      .then((res) => {
        console.log("res.data는 : ", res.data);
        alert(res.data);
      });
  };

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="관리자" key="1">
          <div className="commoDiv1">
            <Button type="primary" onClick={showModal}>
              <PlusOutlined />
              신규 관리자 등록
            </Button>
            <Modal
              title="신규 관리자 등록"
              open={isModalOpen}
              onOk={submitAdmin}
              onCancel={handleCancel}
              width={1000}
            >
              <>
                <Row>
                  <Col span={12}>
                    <br></br>
                    <Row>
                      <Col span={4}>
                        <h3>이름</h3>
                      </Col>
                      <Col span={10}>
                        <Input
                          autoComplete="name"
                          name="name"
                          value={name}
                          onChange={nameHandler}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col span={4}>
                        <h3>전화번호</h3>
                      </Col>
                      <Col span={10}>
                        <Input
                          autoComplete="phone"
                          name="phone"
                          value={phone}
                          onChange={phoneHandler}
                          placeHolder="'-' 없이 11자리 입력 "
                        />
                      </Col>
                    </Row>
                    <br></br>
                  </Col>
                  <Col span={12}>
                    <br></br>
                    <Row>
                      <Col span={4}>
                        <h3>아이디</h3>
                      </Col>
                      <Col span={10}>
                        <Input
                          autoComplete="username"
                          name="username"
                          value={username}
                          onChange={usernameHandler}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col span={4}>
                        <h3>비밀번호</h3>
                      </Col>
                      <Col span={10}>
                        <Input.Password
                          autoComplete="password"
                          name="password"
                          value={password}
                          onChange={passwordHandler}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col span={13}></Col>
                    </Row>
                  </Col>
                </Row>
              </>
            </Modal>
          </div>
          <br />
          <Table
            columns={columns}
            dataSource={admin}
            size="middle"
            onRow={(a, index) => {
              const name = a.name;
              const phone = a.phone;
              const username = a.username;
              const password = a.password;
              const id = a.id;
              return {
                onClick: (e) => {
                  console.log(username);
                  navigate("/home/members/info", {
                    state: {
                      name: name,
                      phone: phone,
                      username: username,
                      password: password,
                      id: id,
                    },
                  });
                },
              };
            }}
          />
        </TabPane>
        <TabPane tab="코치" key="2">
          <div className="commoDiv1">
            <Button type="primary" onClick={showModal2}>
              <PlusOutlined />
              신규 코치 등록
            </Button>
            <Modal
              title="신규 코치 등록"
              open={isModalOpen2}
              onOk={submitCoach}
              onCancel={handleCancel2}
              width={1000}
            >
              <>
                <Row>
                  <Col span={12}>
                    <br></br>
                    <Row>
                      <Col span={4}>
                        <h3>이름</h3>
                      </Col>
                      <Col span={10}>
                        <Input
                          autoComplete="coachName"
                          name="coachName"
                          value={coachName}
                          onChange={coachNameHandler}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col span={4}>
                        <h3>전화번호</h3>
                      </Col>
                      <Col span={10}>
                        <Input
                          autoComplete="coachPhone"
                          name="coachPhone"
                          placeholder="'-' 없이 11자리 입력 "
                          value={coachPhone}
                          onChange={coachPhoneHandler}
                        />
                      </Col>

                      <Button
                        // onClick={doubleCheck}
                        onClick={() => {
                          console.log(coachPhone);
                          doubleCheck(coachPhone);
                        }}
                        type="primary"
                      >
                        확인
                      </Button>
                    </Row>
                    <br></br>
                    <Row>
                      <Col span={4}>
                        <h3>코치 번호</h3>
                      </Col>
                      <Col span={10}>
                        <h2>{coachPhone.substr(7)}</h2>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            </Modal>
          </div>
          <br />
          <Table
            columns={columns}
            dataSource={coach}
            size="middle"
            onRow={(c, index) => {
              const name = c.name;
              const phone = c.phone;
              const username = c.username;
              const password = c.password;
              const coachnum = c.coachnum;
              const id = c.id;
              return {
                onClick: (e) => {
                  console.log(username);
                  navigate("/home/members/coachinfo", {
                    state: {
                      name: name,
                      phone: phone,
                      username: username,
                      password: password,
                      coachnum: coachnum,
                      id: id,
                    },
                  });
                },
              };
            }}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Members;
