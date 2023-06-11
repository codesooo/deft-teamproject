import {
  Col,
  Row,
  Button,
  Modal,
  Table,
  Input,
  Select,
  DatePicker,
  Radio
} from "antd";
import React, { useState, useEffect } from "react";
import NewCustomer from "./NewCustomer.js";
import client from '../../lib/api/client';
import { SearchOutlined, PlusOutlined  } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { memo } from "react";

// 번호, 성명, 유형, 상태, 성별, 생년월일, 담당자, 운동목적, 장애유형, 전화번호, 회원권, 결제정보, 소개정보
const columns = [
  {
    title: "번호",
    dataIndex: "usernum"
  },
  {
    title: "성명",
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
    title: "장애",
    dataIndex: "existence",
    filters:[
      {text:'유', value:'유'},
      {text:'무', value:'무'}
    ],
    onFilter:(value, record)=>{
      return record.existence === value
    }
  },
  {
    title: "성별",
    dataIndex: "sex",
    filters:[
      {text:'남', value:'남'},
      {text:'여', value:'여'}
    ],
    onFilter:(value, record)=>{
      return record.sex === value
    }
  },
  {
    title: "담당자",
    dataIndex: "manager",
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
    title: "소개정보",
    dataIndex: "inflow",
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
    title: "전화번호",
    dataIndex: "phone",
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
    title: "소개정보",
    dataIndex: "inflow",
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
    title: "결제정보",
    dataIndex: "payment",
    filters:[
      {text:'실비', value:'실비'},
      {text:'바우처+실비', value:'바우처+실비'},
      {text:'바우처', value:'바우처'}
    ],
    onFilter:(value, record)=>{
      return record.payment === value
    }
  },
  {
    title: "장애유형",
    dataIndex: "obstacle_type",
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
    title: "소개정보",
    dataIndex: "inflow",
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
    title: "회원권",
    dataIndex: "membership",
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
    title: "운동목적",
    dataIndex: "user_purpose",
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
    title: "상태",
    dataIndex: "statement",
    filters:[
      {text:'이용중', value:'이용중'},
      {text:'휴면고객', value:'휴면고객'},
      {text:'상담예정', value:'상담예정'},
      {text:'상담완료', value:'상담완료'},
      {text:'단순문의', value:'단순문의'}
    ],
    onFilter:(value, record)=>{
      return record.statement === value
    }
  },
];

const options = [
  {
    value: "today",
    label: "오늘"
  },
  {
    value: "yesterday",
    label: "어제"
  },
  {
    value: "thisweek",
    label: "이번 주"
  },
  {
    value: "lastweek",
    label: "지난 주"
  }
];

const CustomerSearch = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10);
  const [loading, setloading] = useState(true);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await client.get("/api/consumer/info").then(
      res => {
        setloading(false);
        setCustomers(
          res.data.map(row => ({
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
            id: row._id
          }))
        );
      }
    );
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      // Column configuration not to be checked
      name: record.name
    })
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection
        }}
        columns={columns}
        dataSource={customers}
        pagination={{ 
          current:page,
          pageSize: pageSize,
          total:500,
          onChange: (page,pageSize)=>{
            setPage(page);
            setPageSize(pageSize)
          }
        }}
        onRow={(record, index) => {
          const usernum = record.usernum;
          const userheight = record.userheight;
          const userwidth = record.userwidth;
          const sex = record.sex;
          const existence = record.existence;
          const name = record.name;
          const obstacle_type = record.obstacle_type;
          const phone = record.phone;
          const address = record.address;
          const memo = record.memo;
          const manager = record.manager;
          const payment = record.payment;
          const inflow = record.inflow;
          const statement = record.statement;
          const birthday = record.birthday;
          const user_purpose = record.user_purpose;
          const vaccinate = record.vaccinate;
          const category = record.category;
          const date_signup = record.date_signup;
          const membership = record.membership;
          const id = record.id;

          return {
            onClick: (e) => {
              console.log(id);
              const auth_ = localStorage.getItem('auth');
              if (auth_ == '"coach"'){
                navigate('/coach/customers/info', {
                  state: {
                    usernum: usernum,
                    userheight: userheight,
                    userwidth: userwidth,
                    sex: sex,
                    existence: existence,
                    name: name,
                    obstacle_type: obstacle_type,
                    phone: phone,
                    address: address,
                    memo: memo,
                    manager: manager,
                    payment: payment,
                    inflow: inflow,
                    statement: statement,
                    birthday: birthday,
                    date_signup: date_signup,
                    membership: membership,
                    user_purpose: user_purpose,
                    vaccinate: vaccinate,
                    category: category,
                    id: id
                  },
                });
              }
              else {
                navigate('/home/customers/info', {
                  state: {
                    usernum: usernum,
                    userheight: userheight,
                    userwidth: userwidth,
                    sex: sex,
                    existence: existence,
                    name: name,
                    obstacle_type: obstacle_type,
                    phone: phone,
                    address: address,
                    memo: memo,
                    manager: manager,
                    payment: payment,
                    inflow: inflow,
                    statement: statement,
                    birthday: birthday,
                    date_signup: date_signup,
                    membership: membership,
                    user_purpose: user_purpose,
                    vaccinate: vaccinate,
                    category: category,
                    id: id
                  },
                });
              }
              
            }
          };
        }}
      />
    </>
  );
};

export default CustomerSearch;
