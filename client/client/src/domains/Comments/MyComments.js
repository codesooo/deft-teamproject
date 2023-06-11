import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Input, Form, Space } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import client from '../../lib/api/client';
import { useSelector } from "react-redux";

const MyComments = () => {
   
    const navigate = useNavigate();
    const { user } = useSelector(({ user }) => ({ user: user.user }));
    const [commentList, setCommentList] = useState([]);
    const [singleCommentList, setSingleCommentList] = useState([]);
    
    
    
    // 입력한 댓글 내용

    const columns = [
        {
          key: "1",
          title: "작성 날짜",
          dataIndex: "Date"
        },
        {
            key: "2",
            title: "댓글",
            dataIndex: "Content"
          }
      ]

      const username = user.username;
      console.log(username);
        
    const getCommentList = async () => {
      
        client.get(`/api/course/comment/user/${username}`).then(
            res => {
                console.log(res);
                setCommentList(
                res.data.map(row => ({
                  CourseId: row.courseId,
                  Content: row.content,
                  Date: row.date,
                  id: row._id
                }))
              );
            }
          );
    };

    useEffect(() => {
         getCommentList();
    }, []);

   
  return (
    <>
      <div>
          <h2>내가 작성한 댓글</h2>
            <Table
              columns={columns}
              dataSource={commentList}
              onRow={(record, index) => {
                const courseId = record.CourseId;
                const id = record._id;
                return {
                  onClick: (e) => {

                    const auth_ = localStorage.getItem('auth');

                    if (auth_ == '"coach"'){
                      navigate('/coach/curriculum/edit', {
                        state: {
                          id: courseId,
                        },
                      });
                    } else {
                      navigate('/home/curriculum/edit', {
                        state: {
                          id: courseId,
                        },
                      });
                    }
                  }
                };
              }}
              size="middle" 
            />
      </div>
    </>
  );
};

export default MyComments;