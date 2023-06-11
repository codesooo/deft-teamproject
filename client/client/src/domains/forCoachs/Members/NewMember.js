import React, { useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const NewMember = () => {
  const [form] = Form.useForm();
  const [formLayout] = useState("vertical");
  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 8
          }
        }
      : null;

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div className="Div1">
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout
        }}
        style={{
          resize: "none",
          width: 800
        }}
      >
        <Form.Item label="상품 이름">
          <Input placeholder="상품 이름을 입력해 주세요." />
        </Form.Item>
      </Form>

      <div>등록 횟수/가격</div>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "first"]}
                    rules={[
                      {
                        required: true,
                        message: "등록 횟수를 입력해 주세요."
                      }
                    ]}
                  >
                    <Input placeholder="횟수" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[
                      {
                        required: true,
                        message: "가격을 입력해 주세요."
                      }
                    ]}
                  >
                    <Input placeholder="가격" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  횟수/가격 추가
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>

      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout
        }}
      >
        <Form.Item label="회원권 종목">
          <Select>
            <Select.Option value="demo">APT 1:1</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
          <Button>닫기</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewMember;
