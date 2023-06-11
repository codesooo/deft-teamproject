import React, {useCallback, useEffect, useState} from "react";
import client from '../../lib/api/client';
import {Input, Button, Modal, Row, Col} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";
import { TextField } from "../../../node_modules/@material-ui/core/index";
import "./Detail.css";

const Detail = () => {
    const location = useLocation();
    const name = location.state.name;
    const productId = location.state.id;
    const navigate = useNavigate();
    const [detailList, setDetailList] = useState([]);
    // 입력한 상품 detail 내용
    const [count, setCount] = useState("");
    const [price, setPrice] = useState("");
    
    

    const { TextArea } = Input;
    
    useEffect(() => {
       getProductList();
    }, []);

    console.log(productId);



    const getProductList = async () => {
        client.get(`/api/product/detail/${productId}`).then(
            res => {
                console.log(res);
                setDetailList(
                    res.data.map(row => ({
                        count: row.count,
                        price: row.price,
                        id: row._id
                    }))
                );
            }
        )
    };

    const submit = (e) => {
        e.preventDefault();

        let body = {
            count: count,
            price: price,
            productId: productId,
        }

        client.post('/api/product/detail', body)
        .then((res) => 
        console.log(res)
        );
        window.location.reload();
    };

    const DeleteProduct = (params, e) => {
        e.preventDefault();
        console.log(params);

        Modal.confirm({
          title: "정말로 삭제하시겠습니까?",
          okText: "Yes",
          okType: "danger",
          onOk: () => {
            client.delete(`/api/product/detail/${params}`).then((res) => 
            console.log(res)
            );
            alert("삭제완료");
            window.location.reload();
          },
        });
      };

      const Delete = (e) => {
        Modal.confirm({
            title: "정말로 삭제하시겠습니까?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
              client.delete(`/api/product/${productId}`).then((res) => 
              console.log(res)
              );
              alert("삭제완료");
              navigate('/home/commodity');
            },
          });
       };

    return ( 
        <>
        <div className="body">
        <h2>{name}</h2>
        <div className="comments-wrapper">
            <div className="comments-header">
                <Row gutter={16}>
                    <Col span={8}>
                        <TextField
                        className="comments-header-testarea"
                        onChange={(e) => {
                            setCount(e.target.value)
                        }}
                        placeholder= "횟수"
                    /> 
                    </Col>
                    <Col span={8}>
                        <TextField
                        className="comments-header-testarea"
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        placeholder= "가격"
                    /> 
                    </Col>
                    <Col span={5}>
                         {count !== "" ? (
                        <Button onClick={submit}>등록하기</Button>
                    ): (
                        <Button disabled={true}>
                            등록하기
                        </Button>
                    )}
                    </Col>
                </Row>
              
            </div>
            <div className="comments-body">
                <div className="comments">
                {detailList.map((item, index) => (
                    <div key={index} className="comments-comment">
                        <Row>
                            <Col span={16}>
                                <div>{item.count}회</div>
                                <div>{item.price}원</div>
                            </Col>
                            <Col span={7}>
                                <div className="comment-delete" onClick={(e) => {DeleteProduct(item.id, e)}}><DeleteOutlined /></div>
                            </Col>
                        </Row>
                        
                    </div>
                ))}
                </div>
            </div>
            <br/>
            <Button type="primary" danger onClick={Delete}>상품 삭제</Button>
        </div>
        </div>
        </>
    );
  };
  
  export default Detail;
  