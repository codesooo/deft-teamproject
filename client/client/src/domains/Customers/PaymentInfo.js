import { 
  Col,
   Row, 
   Input, 
   Typography, 
   Tag, 
   Space, 
   Table, 
   Button,
   InputNumber,
   Select,
   Modal} from "antd";
import React, {useState, useEffect} from "react";
import "./PaymentInfo.css";
import {  PushpinFilled, PlusOutlined } from "@ant-design/icons";
import { useLocation,useNavigate } from "react-router-dom";
import client from '../../lib/api/client';
import axios from 'axios';
import EditPaymentInfo from "./EditPaymentInfo";
import { SelectAll } from "../../../node_modules/@material-ui/icons/index";

const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const { Text } = Typography;


const columns = [
    {
      key: "1",
      title: '결제 일시',
      dataIndex: 'pay_date',
      key: 'pay_date',
      sorter: (a, b) => a.age - b.age,
    },
    {
        key: "2",
        title: '상품 이름',
        dataIndex: 'product',
        key: 'product',
        render: (text) => <a>{text}</a>,
      },
    {
      key: "3",
      title: '결제 금액',
      dataIndex: 'pay_amount',
      key: 'pay_amount',
    },
    {
      key: "4",
      title: '결제 정보',
      dataIndex: 'pay_method',
      key: 'pay_method',
    },    
  ];

const PaymentInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('state', location.state);
    const usernum = location.state.usernum;
    const name = location.state.name;
    const sex = location.state.sex;
    const phone = location.state.phone;
    const birthday = location.state.birthday;
    const address = location.state.address;
    const obstacle_type = location.state.obstacle_type;
    const inflow = location.state.inflow;
    const user_purpose = location.state.user_purpose;
    const [state, setstate] = useState([]);
    const [detail, setDetail] = useState();
    const [commodity, setCommodity] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10);
    const [priceList, setPriceList] = useState([]);

    const [pay_amount, setPay_amount] = useState("");
    const [product, setProduct] = useState("");
    const [pay_method, setPay_method] = useState("");
    const [pay_date, setPay_date] = useState("");
    const [product_name, setProductNameData] = useState('');

    const pay_amountHandler = (e) => {
      setPay_amount(e);
    };
    const productHandler = (e) => {
      setProduct(e);
      console.log(e);
      getProductDetail(e);
    };

    const getProductDetail = async (e) => {
      client.get(`/api/product/get/${e}`).then(
        res => {
          console.log(res);
          console.log(res.data._id);
          setDetail(res.data._id);
          getPriceList(res.data._id);
        }
      );
    };

    const getPriceList = async (e) => {
      client.get(`/api/product/detail/${e}`).then(
          res => {
              console.log(res);
              setPriceList(res.data);
          }
      )
  };

  let productpriceList = [];
    for (let i = 0; i < priceList.length; i++) {
      let op = {};
      op.value = priceList[i].price;
      op.label = priceList[i].price;
      productpriceList.push(op);
    }  
    

    const pay_methodHandler = (e) => {
      e.preventDefault();
      setPay_method(e.target.value);
    };
    const pay_dateHandler = (e) => {
      e.preventDefault();
      setPay_date(e.target.value);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };

    const [options, setOptions] = useState([]);

    useEffect(() => {
      getData();
      getCommodity();
    }, []);

    const getData = async () => {
      await client.get(`/api/consumer/payment/user/${usernum}`).then(
        res => {
          setstate(
            res.data.map(row => ({
              pay_amount: row.pay_amount,
              usernum: row.usernum,
              product: row.product,
              pay_method: row.pay_method,
              pay_date: row.pay_date,
              id: row._id
            }))
          );
        }
      );
    };

    const getCommodity = async () => {
      await client.get("/api/product/list").then(
        (res) => {
          setProductNameData(res.data);
          console.log(res.data);
        }
      );
    };

    let productnameList = [];
    for (let i = 0; i < product_name.length; i++) {
      let op = {};
      op.value = product_name[i].name;
      op.label = product_name[i].name;
      productnameList.push(op);
    }  

    const handleOk = (e) => {
      e.preventDefault();

      let body = {
        pay_amount: pay_amount,
        usernum: usernum,
        product: product,
        pay_method: pay_method,
        pay_date: pay_date,
      }

      client
      .post("/api/consumer/payment/create", body)
      .then((res) => 
         console.log(res)
         );
          alert("등록 완료");
          setIsModalOpen(false);
          window.location.reload();
      };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return(
      <>
        <Row>
            <div className="con1">
                <Text type="secondary">회원 정보</Text>
                <Row>
                    <Col span={6}>
                        <Row>
                            <h2>{name}</h2>
                            <Tag color="purple" style={{ height:25, width:25}}>{sex}</Tag>
                        </Row>
                    </Col>
                    <Col span={6} >
                        <h5>전화번호</h5>
                        <h5>{phone}</h5>
                        <br></br>
                        <h5>장애유형</h5>
                        <h5>{obstacle_type}</h5>
                    </Col>
                    <Col span={6}>
                        <h5>생년월일</h5>
                        <h5>{birthday}</h5>
                        <br></br>
                        <h5>유입경로</h5>
                        <h5>{inflow}</h5>
                    </Col>
                    <Col span={6}>
                        <h5>주소</h5>
                        <h5>{address}</h5>
                        <br></br>
                        <h5>운동목적</h5>
                        <h5>{user_purpose}</h5>
                    </Col>
                </Row>
            </div>
        </Row>
        <br></br>
        <Row>
            <div className="con2">
                <Text type="secondary">결제 정보</Text>
                <Button type="link" className="newMember" onClick={showModal}>
                  <PlusOutlined />결제정보 추가
                </Button>
                          <Modal
                          title="결제정보 추가"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                                <Row gutter={16}>
                                <Col>
                                    상품이름
                                  </Col>
                                  <Col>
                                    <Select
                                      size="small"
                                      placeholder="상품이름"
                                      style={{ width: 150 }}
                                      name="product"
                                      value={product}
                                      options={productnameList}
                                      onChange={productHandler}
                                    ></Select>
                                </Col>
                                <br></br><br></br>
                                </Row>
                                <Row gutter={16}>
                                <Col>
                                    결제금액
                                </Col>
                                <Col>
                                      {/* <Input
                                      size="small"
                                      placeholder="숫자만 입력해주세요"
                                      style={{ width: 150 }}
                                      name="pay_amount"
                                      value={pay_amount}
                                      onChange={pay_amountHandler}
                                    /> */}
                                     <Select
                                      size="small"
                                      placeholder=""
                                      style={{ width: 150 }}
                                      name="pay_amount"
                                      value={pay_amount}
                                      options={productpriceList}
                                      onChange={pay_amountHandler}
                                    />                                     
                                    
                                    {" "}
                                    원
                                </Col>
                                </Row>
                                <br></br>
                                <Row gutter={16}>
                                <Col>
                                  결제정보
                                  </Col>
                                  <Col>
                                    <Input
                                      size="small"
                                      placeholder="결제정보"
                                      style={{ width: 150 }}
                                      name="pay_method"
                                      value={pay_method}
                                      onChange={pay_methodHandler}
                                    ></Input>
                                </Col>
                                </Row>
                                <br></br>
                                <Row gutter={16}>
                                <Col>
                                    결제일시
                                  </Col>
                                  <Col>
                                    <Input
                                      size="small"
                                      placeholder="YYYY-MM-DD"
                                      style={{ width: 150 }}
                                      name="pay_date"
                                      value={pay_date}
                                      onChange={pay_dateHandler}
                                    ></Input>
                                </Col>
                              </Row>
                        </Modal>
                        <Table
                        columns={columns}
                        dataSource={state}
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
                          const id = record.id;
                          return {
                            onClick: (e) => {
                              console.log(usernum);
                              console.log(id);
                              const auth_ = localStorage.getItem('auth');
                              if (auth_ == '"coach"'){
                                navigate('/coach/customers/paymentinfo/edit', {
                                  state: {
                                    usernum: usernum,
                                    id: id,
                                    sex: sex,
                                    name: name,
                                    phone: phone,
                                    birthday: birthday,
                                    address: address,
                                    obstacle_type: obstacle_type,
                                    inflow: inflow,
                                    user_purpose: user_purpose           
                                  },
                                });
                              }
                              else {
                                navigate('/home/customers/paymentinfo/edit', {
                                  state: {
                                    usernum: usernum,
                                    id: id,
                                    sex: sex,
                                    name: name,
                                    phone: phone,
                                    birthday: birthday,
                                    address: address,
                                    obstacle_type: obstacle_type,
                                    inflow: inflow,
                                    user_purpose: user_purpose           
                                  },
                                });
                              }
                              
                            }
                          };
                        }}
                      />
            </div>

        </Row>
      </> 
      
    );
    

};

export default PaymentInfo;