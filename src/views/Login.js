import React, { useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Form,
  Row,
  Col,
  Button,
  Input,
  Checkbox,
  notification,
  Typography,
} from '../ant';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Footer from '../components/Footer';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';
import { queryParamsFromProps } from '../util';

const { Title } = Typography;

export default function Login(props) {
  let [showLogin, setShowLogin] = useState(true);
  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <a href="/">
        <img
          alt="logo"
          style={{ float: 'left', marginRight: '40px' }}
          src="/logo.png"
          width={'160px'}
        />
      </a>
      <Content
        style={{
          padding: '0 50px',
          backgroundImage:
            'radial-gradient(circle, rgba(0,166,156,1) 0%, rgba(0,173,238,1) 100%)',
        }}
      >
        <Row justify="center" style={{ marginTop: '4rem' }}>
          {showLogin ? (
            <LoginView {...props} setShowLogin={setShowLogin} />
          ) : (
            <LoginForgetView {...props} setShowLogin={setShowLogin} />
          )}
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}

function LoginView(props) {
  let { username, redirect } = queryParamsFromProps(props);
  useEffect(() => {
    if (username) {
      notification.info({
        message: `Login as ${username} and verify your account by visiting the url sent to your email.`,
      });
    }
  }, [username]);
  let { setUser, setKey, api } = useAppEnv();
  let history = useHistory();
  let onSubmit = async (values) => {
    let result = await api.post('/api/auth/login', values);
    if (result.errors) {
      for (let error of result.errors) {
        notification.error({
          message: error.msg,
        });
      }
      return;
    }
    setUser(result.user);
    setKey('token', result.token);
    if (redirect) {
      // TODO: validate redirect & issue new token
      window.location = redirect + '?token=' + result.token;
    } else {
      history.push('/resources');
    }
  };
  let onFail = (values) => {
    for (let err of values.errorFields) {
      notification.error({
        message: err.errors[0],
      });
    }
  };
  return (
    <Col
      span={8}
      style={{
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '26px',
        minWidth: '700px',
      }}
    >
      <Typography>
        <Title style={{ minWidth: '500px' }}>Login</Title>
      </Typography>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFail}
        style={{ minWidth: '600px' }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round" block>
            Log In
          </Button>
        </Form.Item>
        <p>
          <a onClick={() => props.setShowLogin(false)} href="#">
            Forgot login?
          </a>
        </p>
      </Form>
    </Col>
  );
}

function LoginForgetView(props) {
  let { setUser, setKey, api } = useAppEnv();
  let history = useHistory();
  let onSubmit = async ({ username }) => {
    let result = await api.post('/api/auth/reset/password', { username });
    if (result.errors) {
      for (let error of result.errors) {
        notification.error({
          message: error.msg,
        });
      }
      return;
    } else {
      notification.info({
        message: 'Email sent!',
      });
    }
  };
  let onFail = (values) => {
    for (let err of values.errorFields) {
      notification.error({
        message: err.errors[0],
      });
    }
  };
  return (
    <Col
      span={8}
      style={{
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '26px',
        minWidth: '700px',
      }}
    >
      <Typography>
        <Title style={{ minWidth: '500px' }}>Reset Login</Title>
      </Typography>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFail}
        style={{ minWidth: '600px' }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" shape="round" block>
            Send Reset Email
          </Button>
        </Form.Item>
        <p>
          <a onClick={() => props.setShowLogin(true)} href="#">
            Login
          </a>
        </p>
      </Form>
    </Col>
  );
}
