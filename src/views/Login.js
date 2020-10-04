import React, { useState } from 'react';
import {
  Layout,
  Content,
  Form,
  Row,
  Col,
  Button,
  Input,
  Checkbox,
} from '../ant';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <Logo />
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col
            span={8}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
            }}
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={console.log}
              onFinishFailed={console.log}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}
