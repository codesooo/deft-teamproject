import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import client from '../../../lib/api/client';
import { Button, Modal, Divider, Input, Card, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import Comments from '../../../components/comment/Comment.js';

const { TextArea } = Input;

const EditCurriDetail = () => {
  const { auth } = useSelector(({ auth }) => ({ auth: auth.auth }));

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, SetTitle] = useState('');
  const [detail, SetDetail] = useState('');
  const [content, SetContent] = useState('');
  const [effect, SetEffect] = useState('');
  const [loading, setloading] = useState(true);

  const location = useLocation();
  console.log('state', location.state);
  const id = location.state.id;

  const [stateCust, setstateCust] = useState({});
  useEffect(() => {
    getCurriculumById(id);
    getFileUrl(id);
    getVideoUrl(id);
  }, []);

  const getCurriculumById = (id) => {
    console.log(id);
    client
      .get(`/api/course/${id}`)
      .then((d) => {
        let curriculum = d.data;
        setstateCust({
          id: id,
          title: curriculum.title,
          detail: curriculum.detail,
          content: curriculum.content,
          effect: curriculum.effect,
        });
      })
      .catch((err) => alert(err));
  };

  const [FileUrl, setFileUrl] = useState('');

  const getFileUrl = (id) => {
    client.get(`/api/course/file/url/${id}`).then((res) => {
      setloading(false);
      setFileUrl(res.data);
      console.log(res.data);
    });
  };

  let file_url = FileUrl;

  const [VideoUrl, setVideoUrl] = useState('');

  const getVideoUrl = (id) => {
    client.get(`/api/course/video/url/${id}`).then((res) => {
      setloading(false);
      setVideoUrl(res.data);
      console.log(res.data);
    });
  };

  let videourl = VideoUrl;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const VideoModal = (e) => {
    Modal.info({
      title: '동영상 아래에 있는 URL로 이동하시면 영상을 보실 수 있습니다.',
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
    },
    {
      title: 'Detail',
      dataIndex: 'Detail',
    },
    {
      title: 'Content',
      dataIndex: 'Content',
    },
    {
      title: 'Effect',
      dataIndex: 'Effect',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
  ];

  const user = localStorage.getItem('user');
  const auth_ = localStorage.getItem('auth');

  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }
  if (auth_ != '"coach"') {
    return <div>코치만 볼 수 있는 페이지입니다.</div>;
    // }
  }

  return (
    <>
      <Card
        title={stateCust.title}
        bordered={false}
        // style={{
        //   width: 300,
        // }}
      >
        <Divider orientation="left" orientationMargin="0">
          <h5>장애</h5>
        </Divider>
        <p>{stateCust.detail}</p>
        <Divider orientation="left" orientationMargin="0">
          <h5>운동설명</h5>
        </Divider>
        <p>{stateCust.content}</p>
        <Divider orientation="left" orientationMargin="0">
          <h5>효과</h5>
        </Divider>
        <p>{stateCust.effect}</p>
        <Divider orientation="left" orientationMargin="0">
          <h5>첨부파일</h5>
        </Divider>
        <Image width={150} height={150} src={file_url} />
        <br></br>
        <br></br>
        <video src={videourl} controls width={150} />
        <Button onClick={VideoModal}>동영상이 보이지 않아요!</Button>
        <h4>{videourl}</h4>
        <br></br>
        <br></br>
      </Card>
      <Comments id={id} />
    </>
  );
};

export default EditCurriDetail;
