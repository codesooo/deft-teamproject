import React, {useEffect, useState} from 'react';
import client from '../../lib/api/client';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {DeleteOutlined} from "@ant-design/icons";
import {Row, Col, Button, Modal, Divider, Input, Card} from 'antd';

const EditPaymentInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const usernum = location.state.usernum;
  const id = location.state.id;
  const sex = location.state.sex;
  const name = location.state.name;
  const phone = location.state.phone;
  const birthday = location.state.birthday;
  const address = location.state.address;
  const obstacle_type = location.state.obstacle_type;
  const inflow = location.state.inflow;
  const user_purpose = location.state.user_purpose;
  console.log(usernum);
  console.log(id);
  
  const submitHandler = (e) => {
    console.log(state);

    client
      .patch(`/api/consumer/payment/${id}`, state)
      .then((res) => 
         console.log(res)
         );
         alert("수정 완료");
         window.location.reload();
    };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  const [state, setstate] = useState("");
  const [customerInfo, setCustomerInfo] = useState("");
  useEffect(() => {
    getData(id);
    getCustomerInfo(id);
  }, []);

  const getData = id => {
    client.get(`/api/consumer/payment/${id}`)
    .then(d => {
        let row = d.data;
        setstate({
            pay_amount: row.pay_amount,
            usernum: row.usernum,
            product: row.product,
            pay_method: row.pay_method,
            pay_date: row.pay_date,
            id: row._id
          });
      }
    );
  };

  const getCustomerInfo = id => {
    client.get(`/api/consumer/info/${id}`)
    .then(d => {
        let row = d.date;
        setCustomerInfo({
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
        })
    })
  }

  
  const DeletePayment = (params, e) => {
    console.log(params);

    Modal.confirm({
      title: "정말로 삭제하시겠습니까?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        client.delete(`/api/consumer/payment/${id}`).then((res) => 
        console.log(res)
        );
        alert("삭제완료");
        const auth_ = localStorage.getItem('auth');
        if (auth_ == '"coach"'){
          navigate('/coach/customers/paymentinfo', { state : 
            {usernum: usernum,
            id: id,
            sex: sex,
            name: name,
            phone: phone,
            birthday: birthday,
            address: address,
            obstacle_type: obstacle_type,
            inflow: inflow,
            user_purpose: user_purpose
          }
    });
        }
        else {
          navigate('/home/customers/paymentinfo', { state : 
            {usernum: usernum,
            id: id,
            sex: sex,
            name: name,
            phone: phone,
            birthday: birthday,
            address: address,
            obstacle_type: obstacle_type,
            inflow: inflow,
            user_purpose: user_purpose
          }
    });
        }
        
      },
    });
  };

  return (
    <>
       <Card
              title={state.product}
              bordered={false}
              // style={{
              //   width: 300,
              // }}
            >
              <Divider orientation="left" orientationMargin="0">
        <h5>결제금액</h5>
      </Divider>
      <Col>
                                      <Input
                                      size="small"
                                      placeholder="숫자만 입력해주세요"
                                      style={{ width: 150 }}
                                      name="pay_amount"
                                      value={state.pay_amount}
                                      onChange={e => {
                                        let value = e.target.value;
                                        setstate({
                                          pay_amount: value,
                                          product: state.product,
                                          pay_method: state.pay_method,
                                          pay_date: state.pay_date
                                        });
                                      }}
                                    />{" "}
                                    원
                                </Col>
      <Divider orientation="left" orientationMargin="0">
        <h5>결제정보</h5>
      </Divider>
      <Col>
                                    <Input
                                      size="small"
                                      placeholder="결제정보"
                                      style={{ width: 150 }}
                                      name="pay_method"
                                      value={state.pay_method}
                                      onChange={e => {
                                        let value = e.target.value;
                                        setstate({
                                          pay_amount: state.pay_amount,
                                          product: state.product,
                                          pay_method: value,
                                          pay_date: state.pay_date
                                        });
                                      }}
                                    ></Input>
                                </Col>
      <Divider orientation="left" orientationMargin="0">
        <h5>결제일시</h5>
      </Divider>
      <Col>
                                    <Input
                                      size="small"
                                      placeholder="YYYY-MM-DD"
                                      style={{ width: 150 }}
                                      name="pay_date"
                                      value={state.pay_date}
                                      onChange={e => {
                                        let value = e.target.value;
                                        setstate({
                                          pay_amount: state.pay_amount,
                                          product: state.product,
                                          pay_method: state.pay_method,
                                          pay_date: value
                                        });
                                      }}
                                    ></Input>
                                </Col>  
                                <br></br><br></br>    
        <Button type="primary" onClick={submitHandler}>
            수정
        </Button>
        <Button onClick={DeletePayment} id={customerInfo.id} usernum={customerInfo.usernum}>삭제</Button>
       </Card>

    </>
  );
};

export default EditPaymentInfo;
