import React, { useState, useEffect } from "react";
import "./Curriculum.css";
import {useNavigate} from 'react-router';
import { PlusOutlined} from "@ant-design/icons";
import client from '../../../lib/api/client';
import {
  Table,
  Modal,
  Input,
  Divider,
  Button,
} from "antd";
import { useSelector } from "react-redux";

const CoachCurriculum = () => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

  const [size, setSize] = useState("large");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, SetTitle] = useState("");
  const [detail, SetDetail] = useState("");
  const [content, SetContent] = useState("");
  const [effect, SetEffect] = useState("");
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const {TextArea} = Input;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const titleHandler = (e) => {
    e.preventDefault();
    SetTitle(e.target.value);
  };
  
  const detailHandler = (e) =>{
    e.preventDefault();
    SetDetail(e.target.value);
  };

  const contentHandler = (e) =>{
    e.preventDefault();
    SetContent(e.target.value);
  };

  const effectHandler = (e) =>{ 
    e.preventDefault();
    SetEffect(e.target.value);
  };
  const [state, setstate] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await client.get("/api/course/list").then(
      res => {
        setloading(false);
        setstate(
          res.data.map(row => ({
            Title: row.title,
            Detail: row.detail,
            Content: row.content,
            Effect: row.effect,
            id: row._id
          }))
        );
      }
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
  
    let body = {
      title: title,
      detail: detail,
      content: content,
      effect: effect,
    };
  
    client
      .post("/api/course/write", body)
      .then((res) => 
         console.log(res)
         );
         alert("커리큘럼 등록 완료");
         window.location.reload();
    };

  const columns = [
    {
      key: "1",
      title: "Title",
      dataIndex: "Title",
    },
    {
      key: "2",
      title: "Detail",
      dataIndex: "Detail",
    },
    {
      key: "3",
      title: "Content",
      dataIndex: "Content",
    },
    {
      key: "4",
      title: "Effect",
      dataIndex: "Effect",
    },
  ];

  const user = localStorage.getItem('user');
  const auth_ = localStorage.getItem('auth')

  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if (auth_!='"coach"'){
    return <div>코치만 볼 수 있는 페이지입니다.</div>;
  // }
}



  return (
    <div>
      <br />
      {loading ? (
        "Loading"
      ) : (
        <>
        <Table
          columns={columns}
          dataSource={state}
          onRow={(record, index) => {
            const title = record.Title;
            const detail = record.Detail;
            const content = record.Content;
            const effect = record.Effect;
            const id = record.id;
            return {
              onClick: (e) => {
                console.log(id);
                navigate('/coach/curriculum/edit', {
                    state: {
                      title: title,
                      detail: detail,
                      content: content,
                      effect: effect,
                      id: id
                    },
                  });
              }
            };
          }}
        />
        </>
      )}
    </div>
  );
};

export default CoachCurriculum;
