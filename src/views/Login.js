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
import {notification} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Footer from '../components/Footer';
import API from '../api';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';
import Background from './nn.jpg'

export default function Login() {
  let { setUser, setKey, goTo } = useAppEnv();
  let history = useHistory();
  let onSubmit = async (values) => {
    // TODO: handle failure
    //in cases: values is an array -> throw error for each item in values.errors

    let result = await API.post('/api/auth/login', values);
    if (result.errors) {
     alert(JSON.stringify(result.errors));
      notification['error']({
        message: 'Login Failure',
        description:
          'Invalid Username or Password.',
      });
      return;
    }
    setUser(result.user);
    setKey('token', result.token);
    history.push('/');
  };
  let onFail = (values) => {
    // TODO: handle failure
    //background: gradient images or scale image
    //in cases: values is an array -> throw error for each item in values.errors
    //dont have account --> create account
    notification['error']({  message: 'Something is wrong',});
  };
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden', }}>
      <a href="/">
        <img
          style={{ float: 'left', marginRight: '40px' }}
          src="/logo.png"
          width={'160px'}
        />
      </a>
      {/* backgroundColor: '#00ADEE',  */}
      <Content style={{ padding: '0 50px',backgroundImage: `url(${Background})`}}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col
            span={8}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
            }}
          >
            <div>
              <h1  style={{fontSize:'26px', fontWeight:'bold', fontFamily:'courier'}} >Login</h1>
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onFail}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" shape="round" block>
                  Log In
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
