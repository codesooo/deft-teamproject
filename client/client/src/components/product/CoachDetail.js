import React, {useCallback, useEffect, useState} from "react";
import client from '../../lib/api/client';
import {Input, Button, Modal} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";
import { TextField } from "../../../node_modules/@material-ui/core/index";

const CoachDetail = () => {
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

    return ( 
        <>
        <h3>{name}</h3>
        
            <div className="comments-body">
                {detailList.map((item, index) => (
                    <div key={index} className="comments-comment">
                        <div>{item.count}회</div>
                        <div>{item.price}원</div>
                    </div>
                ))}

            </div>
        </>
    );
  };
  
  export default CoachDetail;
  