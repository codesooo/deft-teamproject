import {
    Col,
    Typography,
    Select,
    Image,
    Row,
    InputNumber,
    Button,
    Table,
    Input,
    Radio,
    Checkbox
  } from "antd";
  import React, { useState } from "react";
  import { DeleteOutlined } from "@ant-design/icons";
  const { Text } = Typography;
  
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onTextChange = (e) => {
    console.log(e);
  };
  
  const CustomerEdit = () => (
    <div className="Div">
      <Row gutter={[32, 16]}>
        <div className="Col1">
          <Col>
            <Image
              width={150}
              height={150}
              src="https://pbs.twimg.com/profile_images/1459562606956793856/rMEpug4T_400x400.jpg"
            />
            <br></br>
            <br></br>
            <Button size="small">사진 추가/변경</Button>
            <Button size="small">
              <DeleteOutlined />
            </Button>
            <br></br>
            <br></br>
            <h4>상담</h4>
            <Checkbox>초기 상담지</Checkbox>
            <br></br>
            <Checkbox>계약서</Checkbox>
            <br></br>
            <Checkbox>개인정보수집이용동의서</Checkbox>
          </Col>
        </div>
  
        <div className="Col2">
          <Col>
            <Row gutter={16}>
              <Col>
                <h4>회원번호</h4>
              </Col>
              <Col>
                <h4>486</h4>
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
                  placeholder="곰도리"
                  style={{ width: 80 }}
                ></Input>
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>성별</h4>
              </Col>
              <Col>
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>남</Radio>
                  <Radio value={2}>여</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>나이</h4>
              </Col>
              <Col>
                <InputNumber placeholder="2001" size="small" /> (년생)
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <InputNumber
                  size="small"
                  placeholder="160"
                  style={{ width: 60 }}
                />{" "}
                cm /
              </Col>
              <Col>
                <InputNumber
                  size="small"
                  placeholder="60"
                  style={{ width: 60 }}
                />{" "}
                kg
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>장애 유무</h4>
              </Col>
              <Col>
                <Radio.Group defaultValue={"normal"}>
                  <Radio value="disablity">유</Radio>
                  <Radio value="normal">무</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>장애 유형</h4>
              </Col>
              <Col>
                <Select
                  defaultValue="lucy"
                  size="small"
                  style={{ width: 100 }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "jack",
                      label: "Jack"
                    },
                    {
                      value: "lucy",
                      label: "Lucy"
                    },
                    {
                      value: "Yiminghe",
                      label: "yiminghe"
                    }
                  ]}
                />
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>예방접종</h4>
              </Col>
              <Col>
                <Select
                  defaultValue="lucy"
                  size="small"
                  style={{ width: 100 }}
                  onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" }
                  ]}
                />
              </Col>
            </Row>
            <br></br>
            <Row gutter={10}>
              <Col>
                <h4>전화번호</h4>
              </Col>
              <Col>
                <Input
                  placeholder="전화번호"
                  size="small"
                  style={{ width: 150 }}
                  allowClear
                  onChange={onTextChange}
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
                    { value: "온라인", label: "온라인" },
                    { value: "오프라인", label: "오프라인" },
                    { value: "가정방문", label: "가정방문" }
                  ]}
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
                    { value: "이용증", label: "이용중" },
                    { value: "휴면고객", label: "휴면고객" },
                    { value: "상담예정", label: "상담예정" },
                    { value: "상담완료", label: "상담완료" },
                    { value: "단순문의", label: "단순문의" }
                  ]}
                />
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>담당자</h4>
              </Col>
              <Col>
                <Select
                  defaultValue="담당자"
                  size="small"
                  onChange={handleChange}
                  options={[
                    { value: "김광운", label: "김광운" },
                    { value: "문하늘", label: "문하늘" },
                    { value: "김지수", label: "김지수" }
                  ]}
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
                    { value: "근력강화", label: "근력강화" },
                    { value: "체형교정", label: "체형교정" },
                    { value: "신체컨디셔닝", label: "신체컨디셔닝" },
                    { value: "트랜스퍼", label: "트랜스퍼" },
                    { value: "건강관리", label: "건강관리" },
                    { value: "운동습관형성", label: "운동습관형성" },
                    { value: "통증경감", label: "통증경감" },
                    { value: "체력향상", label: "체력향상" },
                    { value: "일상기능회복", label: "일상기능회복" },
                    { value: "전문적운동지도", label: "전문적운동지도" },
                    { value: "골프트레이닝", label: "골프트레이닝" },
                    { value: "기타", label: "기타" }
                  ]}
                />
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>가입일시</h4>
              </Col>
              <Col>
                <h4>2023</h4>
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
                    { value: "바우처", label: "바우처" },
                    { value: "실비", label: "실비" },
                    { value: "바우처+실비", label: "바우처+실비" }
                  ]}
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
                  defaultValue="소개정보"
                  size="small"
                  onChange={handleChange}
                  options={[
                    { value: "숨고", label: "숨고" },
                    { value: "지인소개", label: "지인소개" },
                    { value: "강사추천", label: "강사추천" },
                    { value: "병원추천", label: "병원추천" },
                    { value: "인터넷 검색", label: "인터넷 검색" },
                    { value: "SNS", label: "SNS" }
                  ]}
                />
              </Col>
            </Row>
            <br></br>
            <Row gutter={16}>
              <Col>
                <h4>회원권</h4>
              </Col>
              <Col>
                <Select
                  defaultValue="회원권"
                  size="small"
                  onChange={handleChange}
                  options={[
                    { value: "A.P.T", label: "A.P.T" },
                    { value: "M.P.T", label: "M.P.T" },
                    { value: "입문자PT", label: "입문자PT" }
                  ]}
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
                  style={{ width: 150 }}
                  allowClear
                  onChange={onTextChange}
                />
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </div>
  );
  
  export default CustomerEdit;
  