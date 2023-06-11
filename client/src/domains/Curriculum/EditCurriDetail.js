import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import client from '../../lib/api/client';
import { Button, Modal, Divider, Input, Card, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import Comments from '../../components/comment/Comment.js';

const { TextArea } = Input;

const EditCurriDetail = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, SetTitle] = useState('');
  const [detail, SetDetail] = useState('');
  const [content, SetContent] = useState('');
  const [effect, SetEffect] = useState('');
  const [attachment, SetAttachment] = useState('');
  const [file_video, SetVideo] = useState('');
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
          attachment: curriculum.attachment,
          file_video: curriculum.file_video,
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

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Create a new FormData instance
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append('file', file);

    // Make the patch request using axios
    client
      .patch(`/api/course/file/upload/${id}`, formData)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        alert('이미지 변경 완료');
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        alert('이미지 변경 실패했습니다. *.jpg, *.jpeg, *.png만 가능합니다.');
      });
  };

  const [VideoUrl, setVideoUrl] = useState('');

  const getVideoUrl = (id) => {
    client.get(`/api/course/video/url/${id}`).then((res) => {
      setloading(false);
      setVideoUrl(res.data);
      console.log(res.data);
    });
  };

  let videourl = VideoUrl;

  const [video_url, setVideo] = useState(null);

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleUploadVideo = () => {
    const formData = new FormData();

    formData.append('file', video_url);

    client
      .patch(`/api/course/video/upload/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        alert('동영상 변경 완료');
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert('동영상 변경 실패했습니다. *.mp4, *.mov만 가능합니다.');
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const DeleteCurriculum = (e) => {
    Modal.confirm({
      title: '정말로 삭제하시겠습니까?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        client.delete(`/api/course/${id}`).then((res) => console.log(res));
        alert('삭제완료');
        navigate('/home/curriculum');
      },
    });
  };

  const VideoModal = (e) => {
    Modal.info({
      title: (
        <div>
          <p>동영상 아래에 있는 URL로 이동하시면 영상을 보실 수 있습니다.</p>
          <p>
            업로드에 시간이 걸릴 수 있으니 URL이 표시되지 않으면 페이지를
            나갔다가 들어오세요.
          </p>
        </div>
      ),
    });
  };

  // const [fileList, setFileList] = useState([]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setFileList(e.target.files);
  // };

  // // 👇 files is not an array, but it's iterable, spread to get an array of files
  // const files = fileList ? [...fileList] : [];

  // const fileSubmitHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();

  //   const attachment = new FormData();
  //   files.forEach((file, i) => {
  //     attachment.append(`file-${i}`, file, file.name);
  //   });

  //   await client({
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     url: `/api/course/file/upload/${id}`,
  //     method: 'PATCH',
  //     data: attachment,
  //   }).then((res) => console.log(res));
  //   alert('첨부파일 업로드 완료');
  //   //  window.location.reload();
  // };

  const submitHandler = (e) => {
    console.log(stateCust);

    client.put(`/api/course/${id}`, stateCust).then((res) => console.log(res));
    alert('수정 완료');
    window.location.reload();
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
  if (!user) {
    return <div>로그인 하지 않으면 볼 수 없는 페이지입니다.</div>;
  }

  return (
    <>
      <Card
        bordered={false}
        // style={{
        //   width: 300,
        // }}
      >
        <h2>커리큘럼 상세</h2>
        <Divider orientation="left" orientationMargin="0">
          <h5>제목</h5>
        </Divider>
        <Col span={4}>
          <Input
            autoComplete="title"
            name="title"
            id="title"
            value={stateCust.title}
            onChange={(e) => {
              let value = e.target.value;
              setstateCust({
                title: value,
                detail: stateCust.detail,
                content: stateCust.content,
                effect: stateCust.effect,
              });
            }}
          />
        </Col>
        <Divider orientation="left" orientationMargin="0">
          <h5>장애</h5>
        </Divider>
        <Col span={4}>
          <Input
            autoComplete="detail"
            name="detail"
            value={stateCust.detail}
            onChange={(e) => {
              let value = e.target.value;
              setstateCust({
                title: stateCust.title,
                detail: value,
                content: stateCust.content,
                effect: stateCust.effect,
              });
            }}
          />
        </Col>
        <Divider orientation="left" orientationMargin="0">
          <h5>운동설명</h5>
        </Divider>
        <TextArea
          style={{ height: 500 }}
          autoComplete="content"
          name="content"
          value={stateCust.content}
          onChange={(e) => {
            let value = e.target.value;
            setstateCust({
              title: stateCust.title,
              detail: stateCust.detail,
              content: value,
              effect: stateCust.effect,
            });
          }}
        />
        <Divider orientation="left" orientationMargin="0">
          <h5>효과</h5>
        </Divider>
        <TextArea
          autoComplete="effect"
          name="effect"
          value={stateCust.effect}
          onChange={(e) => {
            let value = e.target.value;
            setstateCust({
              title: stateCust.title,
              detail: stateCust.detail,
              content: stateCust.content,
              effect: value,
            });
          }}
        />
        <br></br>
        <br></br>
        <Divider orientation="left" orientationMargin="0">
          <h5>첨부파일 (이미지, 동영상 각각 최대 1개씩 업로드 가능)</h5>
        </Divider>
          <form encType="multipart/form-data">
            <input type="file" name="image" onChange={handleFileChange} />
            <button type="button" onClick={handleUpload}>
              이미지 변경
            </button>
          </form>
        <br></br> <Image width={500} height={500} src={file_url} />
        <br></br>
        <br></br>
          <form encType="multipart/form-data">
            <input type="file" name="video" onChange={handleVideoChange} />
            <button type="button" onClick={handleUploadVideo}>
              동영상 변경
            </button>
          </form>
        <br></br>
        <video src={videourl} controls width={500} />
        <Button onClick={VideoModal}>동영상이 보이지 않아요!</Button>
        <h4>{videourl}</h4>
        <br></br>
        <br></br>
        
        <Button type="primary" onClick={submitHandler}>
          수정
        </Button>
        <Button type="primary" danger onClick={DeleteCurriculum}>삭제</Button>
        
      </Card>
      <Comments id={id} />
    </>
  );
};

export default EditCurriDetail;
