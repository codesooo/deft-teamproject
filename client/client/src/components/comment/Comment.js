import React, {useCallback, useEffect, useState} from "react";
import client from '../../lib/api/client';
import moment from 'moment';
import {Input, Button, Modal} from 'antd';
import { useSelector } from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {DeleteOutlined} from "@ant-design/icons";
import "./Comment.scss";
import { TextField } from "../../../node_modules/@material-ui/core/index";
import { DatePicker } from "../../../node_modules/antd/es/index";

const Comment = () => {
    const location = useLocation();
    const courseId = location.state.id;
    const navigate = useNavigate();
    const [commentList, setCommentList] = useState([]);
    // 입력한 댓글 내용
    const [content, setContent] = useState("");
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const userId = user.username;
    console.log(userId)
    

    const { TextArea } = Input;
    
    useEffect(() => {
       getCommentList();
    }, []);

    const getCommentList = async () => {
        client.get(`/api/course/comment/${courseId}`).then(
            res => {
                console.log(res);
                setCommentList(
                res.data.map(row => ({
                  userId: row.userId,
                  content: row.content,
                  date: row.date,
                  id: row._id
                }))
              );
            }
          );
    };

    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    
    const submit = (e) => {
        e.preventDefault();

        let body = {
            content: content,
            userId: userId,
            courseId: courseId,
            date: nowTime
        }

        client.post('/api/course/comment', body)
        .then((res) => 
        console.log(res)
        );
        window.location.reload();
    };

    console.log(commentList)

    const DeleteComment = (params, e) => {
        e.preventDefault();
        console.log(params);

        Modal.confirm({
          title: "정말로 삭제하시겠습니까?",
          okText: "Yes",
          okType: "danger",
          onOk: () => {
            client.delete(`/api/course/comment/${params}`).then((res) => 
            console.log(res)
            );
            alert("삭제완료");
            window.location.reload();
          },
        });
      };

    return ( 
        <div className="comments-wrapper">
            <div className="comments-header">
                <TextField
                    className="comments-header-testarea"
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    placeholder= "댓글을 입력해주세요"
                />
                {content !== "" ? (
                    <Button onClick={submit}>등록하기</Button>
                ): (
                    <Button disabled={true}>
                        등록하기
                    </Button>
                )}
            </div>
            <div className="comments-body">
                {commentList.map((item, index) => (
                    <div key={index} className="comments-comment">
                        <div className="comment-username-date">
                            <div className = "comment-date">
                                {item.date}
                            </div>
                        </div>
                        <p className="comment-content">{item.content}</p>
                        <p className="comment-username">{item.userId}</p>
                        <p className="comment-delete" onClick={(e) => {DeleteComment(item.id, e)}}><DeleteOutlined /></p>
                    </div>
                ))}

            </div>
        </div>
    );
  };
  
  export default Comment;
  