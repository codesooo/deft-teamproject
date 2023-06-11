import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Input, Form, Space } from "antd";
import "./Commodity.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import client from "../../lib/api/client";
import { useSelector } from "react-redux";

const Commodity = () => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const nameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const [form] = Form.useForm();
  const [formLayout] = useState("vertical");
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 8,
          },
        }
      : null;

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const getData = async () => {
    await client.get("/api/product/list").then((res) => {
      setLoading(false);

      setState(
        res.data.map((row) => ({
          name: row.name,
          id: row._id,
        }))
      );
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      name: name,
    };

    let result = name.replace(/ /g, "");
    if (result == "") {
      alert("빈 칸을 모두 입력하세요.");
      return;
    } else {
      client.post("/api/product/write", body).then((res) => console.log(res));
      alert("상품 등록 완료");
    }

    window.location.reload();
  };

  const columns = [
    {
      key: "1",
      title: "상품 이름",
      dataIndex: "name",
    },
  ];

  const user = localStorage.getItem("user");
  const auth_ = localStorage.getItem("auth");

  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if (auth_ != '"admin"') {
    return <div>관리자만 볼 수 있는 페이지입니다.</div>;
    // }
  }

  return (
    <>
      <div className="commoDiv1">
        <Button type="primary" onClick={showModal}>
          <PlusOutlined />
          신규 상품 등록
        </Button>
        <Modal
          title="신규 상품 등록"
          open={isModalOpen}
          onOk={submitHandler}
          onCancel={handleCancel}
          width={1000}
        >
          <div className="Div1">
            <Form
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{
                layout: formLayout,
              }}
              style={{
                resize: "none",
                width: 800,
              }}
            >
              <Form.Item label="상품 이름">
                <Input
                  placeholder="상품 이름을 입력해 주세요."
                  autoComplete="name"
                  name="name"
                  value={name}
                  onChange={nameHandler}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
      <br />
      <Table
        columns={columns}
        dataSource={state}
        onRow={(record, index) => {
          const name = record.name;
          const id = record.id;
          return {
            onClick: (e) => {
              console.log(id);
              console.log(name);
              navigate("/home/commodity/detail", {
                state: {
                  name: name,
                  id: id,
                },
              });
            },
          };
        }}
        size="middle"
      />
    </>
  );
};

export default Commodity;
