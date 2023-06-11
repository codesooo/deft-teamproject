import {
  Button,
  Modal,
  Table,
  Input,
  Col,
  Select,
  Image,
  Row,
  InputNumber,
  Typography,
  Radio,
  Checkbox,
} from 'antd';
import { useSelector } from 'react-redux';

import React, { useState, useEffect } from 'react';
import client from '../../lib/api/client';
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { TextArea } = Input;
const onTextChange = (e) => {
  console.log(e);
};

// 오늘 날짜
const today = () => {
  let now = new Date();
  let thisyear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  return thisyear + '. ' + todayMonth + '. ' + todayDate;
};

// 번호, 성명, 유형, 상태, 성별, 생년월일, 담당자, 운동목적, 장애유형, 전화번호, 회원권, 결제정보, 소개정보
const columns = [
  {
    title: '번호',
    dataIndex: 'usernum',
  },
  {
    title: '성명',
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
    title: '장애',
    dataIndex: 'existence',
    filters: [
      { text: '유', value: '유' },
      { text: '무', value: '무' },
    ],
    onFilter: (value, record) => {
      return record.existence === value;
    },
  },
  {
    title: '성별',
    dataIndex: 'sex',
    filters: [
      { text: '남', value: '남' },
      { text: '여', value: '여' },
    ],
    onFilter: (value, record) => {
      return record.sex === value;
    },
  },
  {
    title: '담당자',
    dataIndex: 'manager',
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
      return record.manager == value;
    },
  },
  {
    title: '전화번호',
    dataIndex: 'phone',
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
      return record.phone == value;
    },
  },
  {
    title: '결제정보',
    dataIndex: 'payment',
    filters: [
      { text: '실비', value: '실비' },
      { text: '바우처+실비', value: '바우처+실비' },
      { text: '바우처', value: '바우처' },
    ],
    onFilter: (value, record) => {
      return record.payment === value;
    },
  },
  {
    title: '장애유형',
    dataIndex: 'obstacle_type',
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
      return record.obstacle_type == value;
    },
  },
  {
    title: '소개정보',
    dataIndex: 'inflow',
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
      return record.inflow == value;
    },
  },
  {
    title: '회원권',
    dataIndex: 'membership',
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
      return record.membership == value;
    },
  },
  {
    title: '운동목적',
    dataIndex: 'user_purpose',
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
      return record.user_purpose == value;
    },
  },
  {
    title: '상태',
    dataIndex: 'statement',
    filters: [
      { text: '이용중', value: '이용중' },
      { text: '휴면고객', value: '휴면고객' },
      { text: '상담예정', value: '상담예정' },
      { text: '상담완료', value: '상담완료' },
      { text: '단순문의', value: '단순문의' },
    ],
    onFilter: (value, record) => {
      return record.statement === value;
    },
  },
];

const options = [
  {
    value: 'today',
    label: '오늘',
  },
  {
    value: 'yesterday',
    label: '어제',
  },
  {
    value: 'thisweek',
    label: '이번 주',
  },
  {
    value: 'lastweek',
    label: '지난 주',
  },
];

const Customers = () => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const [customers, setCustomers] = useState([]);
  const [coachs, setCoachs] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setloading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernum, setUsernum] = useState('');
  const [userheight, setUserheight] = useState('');
  const [userwidth, setUserwidth] = useState('');
  const [sex, setSex] = useState('');
  const [existence, setExistence] = useState('');
  const [name, setName] = useState('');
  const [obstacle_type, setObstacle_type] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [manager, setManager] = useState('');
  const [payment, setPayment] = useState('');
  const [inflow, setInflow] = useState('');
  const [statement, setStatement] = useState('');
  const [date_signup, setDate_signup] = useState('');
  const [birthday, setBirthday] = useState('');
  const [membership, setMembership] = useState('');
  const [user_purpose, setUser_purpose] = useState('');
  const [vaccinate, setVaccinate] = useState('');
  const [category, setCategory] = useState('');
  const [coachData, setCoachData] = useState('');
  const [amountData, setAmountData] = useState('');
  const categoryHandler = (e) => {
    setCategory(e);
  };

  const usernumHandler = (e) => {
    setUsernum(e);
  };
  const userheightHandler = (e) => {
    setUserheight(e);
  };
  const userwidthHandler = (e) => {
    setUserwidth(e);
  };
  const sexHandler = (e) => {
    setSex(e.target.value);
  };
  const existenceHandler = (e) => {
    setExistence(e.target.value);
  };
  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const obstacle_typeHandler = (e) => {
    e.preventDefault();
    setObstacle_type(e.target.value);
  };
  const phoneHandler = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };
  const addressHandler = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };
  const memoHandler = (e) => {
    e.preventDefault();
    setMemo(e.target.value);
  };
  const managerHandler = (e) => {
    console.log(`selected ${e}`);
    setManager(e);
  };
  // console.log("선택한 코치 : ",manager);
  const paymentHandler = (e) => {
    setPayment(e);
  };

  const inflowHandler = (e) => {
    setInflow(e);
  };
  const statementHandler = (e) => {
    setStatement(e);
  };
  const date_signupHandler = (e) => {
    e.preventDefault();
    setDate_signup(e.target.value);
  };
  // console.log(date_signup);
  const birthdayHandler = (e) => {
    setBirthday(e.target.value);
  };
  const membershipHandler = (e) => {
    setMembership(e);
  };
  const vaccinateHandler = (e) => {
    setVaccinate(e.target.value);
  };
  // console.log(vaccinate);

  const showModal = () => {
    setIsModalOpen(true);
  };

  //신규 회원 post
  const handleOk = (e) => {
    if (
      [
        // usernum,
        sex,
        existence,
        name,
        phone,
        manager,
        date_signup,
        birthday,
        user_purpose,
      ].includes('')
    ) {
      alert('빈칸을 모두 입력하세요.');
      return;
    }

    e.preventDefault();
    let body = {
      usernum: amountValue,
      sex: sex,
      existence: existence,
      name: name,
      phone: phone,
      manager: manager,

      date_signup: date_signup,
      birthday: birthday,
      user_purpose: user_purpose,
    };

    client
      .post('/api/consumer/info/create', body)
      .then((res) => console.log(res));
    alert('등록 완료');
    window.location.reload();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    console.log(`selected ${e}`);
    setUser_purpose(e);
  };

  useEffect(() => {
    getData();
    getCoachData();
    getAmountData();
  }, []);

  const getData = async () => {
    await client.get('/api/consumer/info').then((res) => {
      setloading(false);
      setCustomers(
        res.data.map((row) => ({
          usernum: row.usernum,
          userheight: row.userheight,
          userwidth: row.userwidth,
          sex: row.sex,
          existence: row.existence,
          name: row.name,
          obstacle_type: row.obstacle_type,
          phone: row.phone,
          address: row.address,
          memo: row.memo,
          manager: row.manager,
          payment: row.payment,
          inflow: row.inflow,
          statement: row.statement,
          date_signup: row.date_signup,
          birthday: row.birthday,
          membership: row.membership,
          user_purpose: row.user_purpose,
          vaccinate: row.vaccinate,
          category: row.category,
          id: row._id,
        })),
      );
    });
  };

  const getCoachData = async () => {
    await client.get('/api/member/coach/coachname').then((res) => {
      setloading(false);
      setCoachData(res.data);
      console.log(res.data);
    });
  };
  let coachList = [];
  for (let i = 0; i < coachData.length; i++) {
    let op = {};
    op.value = coachData[i];
    op.label = coachData[i];
    coachList.push(op);
  }

  const getAmountData = async () => {
    await client.get('/api/consumer/info/useramount').then((res) => {
      setloading(false);
      setAmountData(res.data);
      console.log(res.data);
    });
  };

  let amountValue = amountData + 100;

  // console.log('출력', amountValue);

  // console.log("출ㄹㄱ해라",coachList);

  const [isModal2Open, setIsModal2Open] = useState(false);
  const showNMModal = () => {
    setIsModal2Open(true);
  };
  const handleOk1 = () => {
    setIsModal2Open(false);
  };
  const handleCancel1 = () => {
    setIsModal2Open(false);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const [value, setValue] = useState(1);
  const onChange1 = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const user = localStorage.getItem('user');
  const auth_ = localStorage.getItem('auth');
  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if (auth_ == '"user"') {
    return <div>관리자 및 코치만 볼 수 있는 페이지입니다.</div>;
  }

  return (
    <>
      <Button type="primary" className="newMember" onClick={showModal}>
        <PlusOutlined />
        신규회원 등록
      </Button>
      <br />
      <br />
      <Modal
        title="신규회원 추가"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="Div">
          <Row gutter={[32, 16]}>
            <div className="Col1">
              <Col>
                <Image
                  width={100}
                  height={100}
                  src="https://cdn-icons-png.flaticon.com/128/2102/2102647.png"
                />
                <h5>프로필은 회원 추가 후 변경 가능합니다.</h5>
                {/* <Button size="small">사진 추가/변경</Button>
                <Button size="small">
                  <DeleteOutlined />
                </Button> */}
                {/* <br></br> */}
              </Col>
            </div>

            <div className="Col2">
              <Col>
                <Row gutter={16}>
                  <Col>
                    <div>회원번호</div>
                  </Col>
                  <h2 name="usernum">{amountValue}</h2>
                </Row>
                <br></br>
                <Row gutter={16}>
                  <Col>
                    <div>이름</div>
                  </Col>
                  <Col>
                    <Input
                      size="small"
                      style={{ width: 80 }}
                      name="name"
                      value={name}
                      onChange={nameHandler}
                    />
                  </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                  <Col>
                    <div>성별</div>
                  </Col>
                  <Col>
                    <div
                      autoComplete="sex"
                      name="sex"
                      id="sex"
                      value={sex}
                      onChange={sexHandler}
                    >
                      <input type="radio" value="남" name="sex" /> 남
                      <input type="radio" value="여" name="sex" /> 여
                    </div>
                  </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                  <Col>
                    <div>생년월일</div>
                  </Col>
                  <Col>
                    <Input
                      placeholder="YYMMDD"
                      size="small"
                      name="birthday"
                      value={birthday}
                      onChange={birthdayHandler}
                    />{' '}
                  </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                  <Col>
                    <div>장애 유무</div>
                  </Col>
                  <Col>
                    <div
                      autoComplete="무"
                      name="existence"
                      id="existence"
                      value={existence}
                      onChange={existenceHandler}
                    >
                      <input type="radio" value="유" name="existence" /> 유
                      <input type="radio" value="무" name="existence" /> 무
                    </div>
                  </Col>
                </Row>
                <br></br>
                <Row gutter={10}>
                  <Col>
                    <div>전화번호</div>
                  </Col>
                  <Col>
                    <Input
                      placeholder="01012341234"
                      size="small"
                      style={{ width: 150 }}
                      name="phone"
                      value={phone}
                      onChange={phoneHandler}
                    />
                  </Col>
                </Row>
                <br></br>
              </Col>
            </div>

            <div className="Col3">
              <Col>
                <Row gutter={16}>
                  <Col>
                    <div>담당자</div>
                  </Col>
                  <Col>
                    <Select
                      name="manager"
                      showSearch
                      placeholder="담당자"
                      onChange={managerHandler}
                      options={coachList}
                    />
                  </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                  <Col>
                    <div>운동목적</div>
                  </Col>
                  <Col>
                    <Select
                      value={user_purpose}
                      defaultValue="운동목적"
                      size="small"
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={[
                        { value: '근력강화', label: '근력강화' },
                        { value: '체형교정', label: '체형교정' },
                        { value: '신체컨디셔닝', label: '신체컨디셔닝' },
                        { value: '트랜스퍼', label: '트랜스퍼' },
                        { value: '건강관리', label: '건강관리' },
                        { value: '운동습관형성', label: '운동습관형성' },
                        { value: '통증경감', label: '통증경감' },
                        { value: '체력향상', label: '체력향상' },
                        { value: '일상기능회복', label: '일상기능회복' },
                        { value: '전문적운동지도', label: '전문적운동지도' },
                        { value: '골프트레이닝', label: '골프트레이닝' },
                        { value: '기타', label: '기타' },
                      ]}
                    />
                  </Col>
                </Row>
                <br></br>
                <Row gutter={16}>
                  <Col>
                    <div>가입날짜</div>
                  </Col>
                  <Col>
                    <Input
                      placeholder="YYYY-MM-DD"
                      size="small"
                      style={{ width: 150 }}
                      name="date_signup"
                      value={date_signup}
                      onChange={date_signupHandler}
                    />
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </div>
      </Modal>
      <br />
      <Table
        columns={columns}
        dataSource={customers}
        onRow={(record, index) => {
          const usernum = record.usernum;
          const sex = record.sex;
          const existence = record.existence;
          const name = record.name;
          const phone = record.phone;
          const manager = record.manager;
          const birthday = record.birthday;
          const user_purpose = record.user_purpose;
          const date_signup = record.date_signup;
          const id = record.id;

          return {
            onClick: (e) => {
              console.log(id);
              const auth_ = localStorage.getItem('auth');
              if (auth_ == '"coach"') {
                navigate('/coach/customers/info', {
                  state: {
                    usernum: usernum,
                    sex: sex,
                    existence: existence,
                    name: name,
                    phone: phone,
                    manager: manager,
                    birthday: birthday,
                    date_signup: date_signup,
                    user_purpose: user_purpose,
                    id: id,
                  },
                });
              } else {
                navigate('/home/customers/info', {
                  state: {
                    usernum: usernum,
                    sex: sex,
                    existence: existence,
                    name: name,
                    phone: phone,
                    manager: manager,
                    birthday: birthday,
                    date_signup: date_signup,
                    user_purpose: user_purpose,
                    id: id,
                  },
                });
              }
            },
          };
        }}
      />
    </>
  );
};

export default Customers;
