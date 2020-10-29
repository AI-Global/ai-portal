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
  Header,
  Sider,
  Menu,
  Affix,
  Search

} from '../ant';
import {notification, Typography} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Footer from '../components/Footer';
import API from '../api';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';

const { Title, Paragraph, Text } = Typography;

export default function ResourceInfo() {

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden', }}>
      <Affix offsetTop={0}>
        <Header style={{ backgroundColor: '#fff', paddingLeft: '0' }}>
          <a href="/">
            <img
              style={{ float: 'left', marginRight: '40px' }}
              src="/logo.png"
              width={'160px'}
            />
          </a>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="s" disabled>
              <Search
                className="menu-search"
                style={{ marginTop: '20px' }}
                placeholder="Search for Resources"
                enterButton
                onSearch={console.log}
              />
            </Menu.Item>
          </Menu>

        </Header>
      </Affix>      
      <Layout>
        <Sider>
          {/* TODO: search through ANT components (most likely use CARD) */}
        <Menu width={200}
          defaultSelectedKeys={['1']}
          mode="horizontal"
            theme="dark"
          >
          <Menu.Item key="1" >
              Option 1
           </Menu.Item>
        </Menu>
      </Sider>
      <Content>Content</Content>
      </Layout>
      
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}
