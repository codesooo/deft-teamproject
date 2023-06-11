import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table, Modal, Input, Tabs } from 'antd';
import { useNavigate } from 'react-router';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import client from '../../../lib/api/client';
import { useSelector } from "react-redux";

const onSearch = (value) => console.log(value);
const { TextArea } = Input;

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
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
    title: '연락처',
    dataIndex: 'phone',
  },
  {
    title: '이메일',
    dataIndex: 'email',
  },
  {
    title: '직무',
    dataIndex: 'job',
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

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState([]);
  const [position, setPosition] = useState([]);
  const [job, setJob] = useState([]);

  const [coachName, setCoachName] = useState('');
  const [coachPhone, setCoachPhone] = useState('');
  const [coachUserName, setCoachUserName] = useState('');
  const [coachPassword, setCoachPassword] = useState('');
  const [coachEmail, setCoachEmail] = useState([]);
  const [coachJob, setCoachJob] = useState([]);
  const [record, setRecord] = useState([]);
  const [coachnum, setCoachnum] = useState('');

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
    await client.get('/api/member/admin').then((res) => {
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
        })),
      );
    });
  };

  console.log(admin);

  const getCoachData = async () => {
    await client.get('/api/member/coach').then((res) => {
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
        })),
      );
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const submitAdmin = (e) => {
    if ([name, phone, username, password].includes('')) {
      alert('빈 칸을 모두 입력하세요.');
      return;
    }

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
      role: 'admin',
    };

    client
      .post('/api/member/admin/create', body)
      .then((res) => console.log(res));

    client
      .post('/api/auth/register', register)
      .then((res2) => console.log(res2));

    alert('관리자 등록 완료');
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
      [coachName, coachPhone, coachUserName, coachPassword, coachnum].includes(
        '',
      )
    ) {
      alert('빈 칸을 모두 입력하세요.');
      return;
    }
    e.preventDefault();

    let body = {
      name: coachName,
      phone: coachPhone,
      username: coachUserName,
      password: coachPassword,
      coachnum: coachnum,
    };

    let register = {
      username: coachUserName,
      password: coachPassword,
      role: 'coach',
    };

    client
      .post('/api/member/coach/create', body)
      .then((res) => console.log(res));
    client.post('/api/auth/register', register).then((res) => console.log(res));
    alert('코치 등록 완료');
    window.location.reload();
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const auth_ = localStorage.getItem('auth')

  const user = localStorage.getItem('user');
  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if (auth_!='"coach"'){
    return <div>코치만 볼 수 있는 페이지입니다.</div>;
  // }
}

  return (
    <>
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
                  navigate('/coach/members/coachinfo', {
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
      {/* <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="관리자" key="1">
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
                  navigate('/home/members/info', {
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
                  navigate('/coach/members/coachinfo', {
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
      </Tabs> */}
    </>
  );
};

export default Members;