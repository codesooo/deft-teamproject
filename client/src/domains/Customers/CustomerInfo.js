import {
  Col,
  Typography,
  Select,
  Modal,
  Image,
  Row,
  Button,
  Radio,
  Checkbox,
  Input,
  InputNumber,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import './CustomerInfo.css';
import client from '../../lib/api/client';
import { InputNumberProps } from '../../../node_modules/antd/es/index';
const { Text } = Typography;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const CustomerInfo = () => {
  const location = useLocation();
  console.log('state', location.state);
  const id = location.state.id;
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [manager, setManager] = useState('');
  const [loading, setloading] = useState(true);
  const [coachData, setCoachData] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getData();
    getCoachData();
    getProfileUrl();
  }, []);

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

  const getProfileUrl = async () => {
    await client.get(`/api/consumer/profile/url/${id}`).then((res) => {
      setloading(false);
      setImageUrl(res.data);
      console.log(res.data);
    });
  };

  const getData = async () => {
    await client.get(`/api/consumer/info/${id}`).then((d) => {
      let row = d.data;
      setCustomer({
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
        profile: row.profile,
        id: row._id,
      });
    });
  };

  const deleteInfo = (e) => {
    Modal.confirm({
      title: '삭제',
      content: '해당 회원 정보를 삭제하시겠습니까?',
      onText: 'Yes',
      okType: 'danger',
      onOk: () => {
        client
          .delete(`/api/consumer/info/${id}`)
          .then((res) => console.log(res));
        alert('삭제완료');
        const auth_ = localStorage.getItem('auth');
        if (auth_ == '"coach"') {
          navigate('/coach/customers');
        } else {
          navigate('/home/customers');
        }
      },
    });
  };

  // id, 이름, 성별, 전화번호, 생년월일, 주소, 장애유형, 유입경로, 운동목적 전달
  const move = () => {
    const auth_ = localStorage.getItem('auth');
    if (auth_ == '"coach"') {
      navigate('/coach/customers/paymentinfo', {
        state: {
          id: customer.id,
          usernum: customer.usernum,
          sex: customer.sex,
          name: customer.name,
          phone: customer.phone,
          birthday: customer.birthday,
          address: customer.address,
          obstacle_type: customer.obstacle_type,
          inflow: customer.inflow,
          user_purpose: customer.user_purpose,
        },
      });
    } else {
      navigate('/home/customers/paymentinfo', {
        state: {
          id: customer.id,
          usernum: customer.usernum,
          sex: customer.sex,
          name: customer.name,
          phone: customer.phone,
          birthday: customer.birthday,
          address: customer.address,
          obstacle_type: customer.obstacle_type,
          inflow: customer.inflow,
          user_purpose: customer.user_purpose,
        },
      });
    }
  };

  const note = () => {
    const auth_ = localStorage.getItem('auth');
    if (auth_ == '"coach"') {
      navigate('/coach/journal', {
        state: {
          usernum: customer.usernum,
        },
      });
    } else {
      navigate('/home/journal', {
        state: {
          usernum: customer.usernum,
        },
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editHandler = (e) => {
    client
      .patch(`/api/consumer/info/${id}`, customer)
      .then((res) => console.log(res));
    alert('수정 완료');
    window.location.reload();
  };

  let sexList = ["남", "여"];

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
      .patch(`/api/consumer/profile/upload/${id}`, formData)
      .then((response) => {
        // Handle the response
        console.log(response.data);
        alert('프로필 변경 완료');
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        alert('프로필 변경 실패했습니다. *.jpg, *.jpeg, *.png만 가능합니다.');
      });
  };

  return (
    <>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <div className="Div">
            <Row gutter={[32, 16]}>
              <div className="Col1">
                <Col>
                  <Image
                    width={150}
                    height={150}
                    src={customer.profile}
                    alt="프로필 이미지"
                  />
                  <br></br>
                  <br></br>
                  <div>
                    <form encType="multipart/form-data">
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                      />
                      <br></br>
                      <br></br>
                      <button type="button" onClick={handleUpload}>
                        프로필 변경
                      </button>
                    </form>
                  </div>

                  <br></br>
                  <Row>
                    <Button type="dashed" size="small" onClick={note}>
                      <FileTextOutlined />
                      노트 조회
                    </Button>
                  </Row>
                  <br></br>
                  <Row gutter={16}>
                    <Col>
                      <h4>결제정보</h4>
                    </Col>
                    <Col>
                      <h4>{customer.payment}</h4>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Button type="link" onClick={move}>
                      결제정보 확인
                    </Button>
                  </Row>
                </Col>
              </div>

              {/* <div className="Col2">
                  <Col>
                    <Row gutter={16}>
                      <Col>
                        <h4>회원번호</h4>
                      </Col>
                      <Col>
                        <h4>{customer.usernum}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>이름</h4>
                      </Col>
                      <Col>
                        <h4>{customer.name}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>성별</h4>
                      </Col>
                      <Col>
                        <h4>{customer.sex}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>생년월일</h4>
                      </Col>
                      <Col>
                        <h4>{customer.birthday}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>{customer.userheight} cm /</h4>
                      </Col>
                      <Col>
                        <h4>{customer.userwidth} kg</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>장애 유무</h4>
                      </Col>
                      <Col>
                        <h4>{customer.existence}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>장애 유형</h4>
                      </Col>
                      <Col>
                        <h4>{customer.obstacle_type}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>예방접종</h4>
                      </Col>
                      <Col>
                        <h4>{customer.vaccinate}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={10}>
                      <Col>
                        <h4>전화번호</h4>
                      </Col>
                      <Col>
                        <h4>{customer.phone}</h4>
                      </Col>
                    </Row>
                    <br></br>
                  </Col>
                </div> */}
              <div className="Col3">
                <Col>
                  {/* <Row gutter={16}>
                      <Col>
                        <h4>유형</h4>
                      </Col>
                      <Col>
                        <h4>{customer.category}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>상태</h4>
                      </Col>
                      <Col>
                        <h4>{customer.statement}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>담당자</h4>
                      </Col>
                      <Col>
                        <h4>{customer.manager}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>운동목적</h4>
                      </Col>
                      <Col>
                        <h4>{customer.user_purpose}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>가입일시</h4>
                      </Col>
                      <Col>
                        <h4>{customer.date_signup}</h4>
                      </Col>
                    </Row>
                    <br></br>
  
                    <Row gutter={16}>
                      <Col>
                        <h4>유입경로</h4>
                      </Col>
                      <Col>
                        <h4>{customer.inflow}</h4>
                      </Col>
                    </Row>
                    <br></br>
                    <Row gutter={16}>
                      <Col>
                        <h4>회원권</h4>
                      </Col>
                      <Col>
                        <h4>{customer.membership}</h4>
                      </Col>
                    </Row>
                    <br></br>
  
                    <Row gutter={16}>
                      <Col>
                        <h4>주소</h4>
                      </Col>
                      <Col>
                        <h4>{customer.address}</h4>
                      </Col>
                    </Row>
                    <br></br> */}
                  <br></br>
                  <div className="btns">
                    <div className="Div">
                      <Row gutter={[32, 16]}>
                        <div className="Col2">
                          <Col>
                            <Row gutter={16}>
                              <Col>
                                <h4>회원번호</h4>
                              </Col>
                              <Col>
                                {/* <Input
                                  size="small"
                                  style={{ width: 80 }}
                                  autoComplete="usernum"
                                  name="usernum"
                                  id="usernum"
                                  value={customer.usernum}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: value,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                ></Input> */}
                                <h4>{customer.usernum}</h4>
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>이름</h4>
                              </Col>
                              <Col>
                                <Input
                                  size="small"
                                  style={{ width: 80 }}
                                  autoComplete="name"
                                  name="name"
                                  id="name"
                                  value={customer.name}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: value,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                ></Input>
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>성별</h4>
                              </Col>
                              <Col>
                                <div
                                  autoComplete="sex"
                                  name="sex"
                                  id="sex"
                                  value={customer.sex}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: value,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                >
                                  <input type="radio" value="남" name="sex" />{' '}
                                  남
                                  <input
                                    type="radio"
                                    value="여"
                                    name="sex"
                                  />{' '}
                                  여
                                </div>
                              </Col>
                              
                            </Row>
                            
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>생년월일</h4>
                              </Col>
                              <Col>
                                <InputNumber
                                  size="small"
                                  autoComplete="birthday"
                                  placeholder="YYMMDD"
                                  style={{ width: 100 }}
                                  name="birthday"
                                  id="birthday"
                                  value={customer.birthday}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: value,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />{' '}
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <InputNumber
                                  size="small"
                                  style={{ width: 60 }}
                                  autoComplete="userheight"
                                  name="userheight"
                                  id="userheight"
                                  value={customer.userheight}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: value,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />{' '}
                                cm /
                              </Col>
                              <Col>
                                <InputNumber
                                  size="small"
                                  style={{ width: 60 }}
                                  autoComplete="userwidth"
                                  name="userwidth"
                                  id="userwidth"
                                  value={customer.userwidth}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: value,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />{' '}
                                kg
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>장애 유무</h4>
                              </Col>
                              <Col>
                                <div
                                  autoComplete="existence"
                                  name="existence"
                                  id="existence"
                                  value={customer.existence}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: value,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="유"
                                    name="existence"
                                  />{' '}
                                  유
                                  <input
                                    type="radio"
                                    value="무"
                                    name="existence"
                                  />{' '}
                                  무
                                </div>
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>장애 유형</h4>
                              </Col>
                              <Col>
                                <Input
                                  size="small"
                                  style={{ width: 100 }}
                                  autoComplete="obstacle_type"
                                  name="obstacle_type"
                                  id="obstacle_type"
                                  value={customer.obstacle_type}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: value,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>예방접종</h4>
                              </Col>
                              <Col>
                                <div
                                  autoComplete="vaccinate"
                                  name="vaccinate"
                                  id="vaccinate"
                                  value={customer.vaccinate}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: value,
                                      category: customer.category,
                                    });
                                  }}
                                >
                                  <input
                                    type="radio"
                                    value="유"
                                    name="vaccinate"
                                  />{' '}
                                  유
                                  <input
                                    type="radio"
                                    value="무"
                                    name="vaccinate"
                                  />{' '}
                                  무
                                </div>
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={10}>
                              <Col>
                                <h4>전화번호</h4>
                              </Col>
                              <Col>
                                <Input
                                  size="small"
                                  style={{ width: 150 }}
                                  allowClear
                                  autoComplete="phone"
                                  placeholder="01012341234"
                                  name="phone"
                                  id="phone"
                                  value={customer.phone}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: value,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
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
                                <h4>유형</h4>
                              </Col>
                              <Col>
                                <Select
                                  defaultValue="오프라인"
                                  size="small"
                                  onChange={handleChange}
                                  options={[
                                    { value: '온라인', label: '온라인' },
                                    { value: '오프라인', label: '오프라인' },
                                    { value: '가정방문', label: '가정방문' },
                                  ]}
                                  autoComplete="category"
                                  name="category"
                                  id="category"
                                  value={customer.category}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: value,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>상태</h4>
                              </Col>
                              <Col>
                                <Select
                                  defaultValue="이용중"
                                  size="small"
                                  onChange={handleChange}
                                  options={[
                                    { value: '이용증', label: '이용중' },
                                    { value: '휴면고객', label: '휴면고객' },
                                    { value: '상담예정', label: '상담예정' },
                                    { value: '상담완료', label: '상담완료' },
                                    { value: '단순문의', label: '단순문의' },
                                  ]}
                                  autoComplete="statement"
                                  name="statement"
                                  id="statement"
                                  value={customer.statement}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: value,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>담당자</h4>
                              </Col>
                              <Col>
                                {/* <InputNumber
                                      placeholder="담당자 번호"
                                      size="small"
                                      style={{ width: 120 }}
                                      autoComplete="manager"
                                      name="manager"
                                      id="manager"
                                      value={customer.manager}
                                      onChange={(e) => {
                                        let value = e;
                                        setCustomer({
                                          usernum: customer.usernum,
                                          userheight: customer.userheight,
                                          userwidth: customer.userwidth,
                                          sex: customer.sex,
                                          existence: customer.existence,
                                          name: customer.name,
                                          obstacle_type: customer.obstacle_type,
                                          phone: customer.phone,
                                          address: customer.address,
                                          memo: customer.memo,
                                          manager: value,
                                          payment: customer.payment,
                                          inflow: customer.inflow,
                                          statement: customer.statement,
                                          date_signup: customer.date_signup,
                                          birthday: customer.birthday,
                                          membership: customer.membership,
                                          user_purpose: customer.user_purpose,
                                          vaccinate: customer.vaccinate,
                                          category: customer.category,
                                        });
                                      }}
                                    /> */}
                                <Select
                                  size="small"
                                  style={{ width: 120 }}
                                  autoComplete="manager"
                                  name="manager"
                                  id="manager"
                                  value={customer.manager}
                                  onChange={handleChange}
                                  options={coachList}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: value,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>운동목적</h4>
                              </Col>
                              <Col>
                                <Select
                                  defaultValue="운동목적"
                                  size="small"
                                  onChange={handleChange}
                                  options={[
                                    { value: '근력강화', label: '근력강화' },
                                    { value: '체형교정', label: '체형교정' },
                                    {
                                      value: '신체컨디셔닝',
                                      label: '신체컨디셔닝',
                                    },
                                    { value: '트랜스퍼', label: '트랜스퍼' },
                                    { value: '건강관리', label: '건강관리' },
                                    {
                                      value: '운동습관형성',
                                      label: '운동습관형성',
                                    },
                                    { value: '통증경감', label: '통증경감' },
                                    { value: '체력향상', label: '체력향상' },
                                    {
                                      value: '일상기능회복',
                                      label: '일상기능회복',
                                    },
                                    {
                                      value: '전문적운동지도',
                                      label: '전문적운동지도',
                                    },
                                    {
                                      value: '골프트레이닝',
                                      label: '골프트레이닝',
                                    },
                                    { value: '기타', label: '기타' },
                                  ]}
                                  autoComplete="user_purpose"
                                  name="user_purpose"
                                  id="user_purpose"
                                  value={customer.user_purpose}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: value,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>가입일시</h4>
                              </Col>
                              <Col>
                                <h4>{customer.date_signup}</h4>
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>결제정보</h4>
                              </Col>
                              <Col>
                                <Select
                                  defaultValue="결제정보"
                                  size="small"
                                  onChange={handleChange}
                                  options={[
                                    { value: '바우처', label: '바우처' },
                                    { value: '실비', label: '실비' },
                                    {
                                      value: '바우처+실비',
                                      label: '바우처+실비',
                                    },
                                  ]}
                                  autoComplete="payment"
                                  name="payment"
                                  id="payment"
                                  value={customer.payment}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: value,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>소개정보</h4>
                              </Col>
                              <Col>
                                <Select
                                  defaultValue="유입경로"
                                  size="small"
                                  onChange={handleChange}
                                  options={[
                                    { value: '숨고', label: '숨고' },
                                    { value: '지인소개', label: '지인소개' },
                                    { value: '강사추천', label: '강사추천' },
                                    { value: '병원추천', label: '병원추천' },
                                    {
                                      value: '인터넷 검색',
                                      label: '인터넷 검색',
                                    },
                                    { value: 'SNS', label: 'SNS' },
                                  ]}
                                  autoComplete="inflow"
                                  name="inflow"
                                  id="inflow"
                                  value={customer.inflow}
                                  onChange={(e) => {
                                    let value = e;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: value,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>
                            <Row gutter={16}>
                              <Col>
                                <h4>회원권</h4>
                              </Col>
                              <Col>
                                <Input
                                  defaultValue="회원권"
                                  size="small"
                                  autoComplete="membership"
                                  name="membership"
                                  id="membership"
                                  value={customer.membership}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: customer.address,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: value,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                            <br></br>

                            <Row gutter={16}>
                              <Col>
                                <h4>주소</h4>
                              </Col>
                              <Col>
                                <Input
                                  placeholder="회원 주소"
                                  size="small"
                                  style={{ width: 130 }}
                                  allowClear
                                  autoComplete="address"
                                  name="address"
                                  id="address"
                                  value={customer.address}
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    setCustomer({
                                      usernum: customer.usernum,
                                      userheight: customer.userheight,
                                      userwidth: customer.userwidth,
                                      sex: customer.sex,
                                      existence: customer.existence,
                                      name: customer.name,
                                      obstacle_type: customer.obstacle_type,
                                      phone: customer.phone,
                                      address: value,
                                      memo: customer.memo,
                                      manager: customer.manager,
                                      payment: customer.payment,
                                      inflow: customer.inflow,
                                      statement: customer.statement,
                                      date_signup: customer.date_signup,
                                      birthday: customer.birthday,
                                      membership: customer.membership,
                                      user_purpose: customer.user_purpose,
                                      vaccinate: customer.vaccinate,
                                      category: customer.category,
                                    });
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}></Col>
        <Col span={4}>
          <Button type="primary" onClick={editHandler}>
            수정
          </Button>
          {/* </Modal> */}
          <Button type="primary" danger onClick={deleteInfo}>
            삭제
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CustomerInfo;
