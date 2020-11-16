import React, { useState, useEffect } from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Breadcrumb,
  Space,
  Tag,
  Table,
  Button,
  Tooltip,
} from '../ant';

import {
  QuestionCircleTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import Sidebar from '../components/Sidebar';
import API from '../api';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function Dashboard({ user }) {
  return (
    <Card id="overview" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        User Overview &nbsp;
        <Tooltip title="View your profile information" placement="right">
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Row>
        <Col span={8}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3>
              <strong>Username: &nbsp;</strong>
              <span id="username" style={{ fontWeight: 'normal' }}>
                {user.username}
              </span>
            </h3>
            <h3>
              <strong>Name: &nbsp;</strong>
              <span id="name" style={{ fontWeight: 'normal' }}>
                {user.name}
              </span>
            </h3>
            <h3>
              <strong>Email: &nbsp;</strong>
              <span id="email" style={{ fontWeight: 'normal' }}>
                {user.email}
              </span>
            </h3>
            <hr />
            <Space>
              <Tooltip title="Edit your profile information" placement="bottom">
                <Button type="primary" href="#">
                  Edit Information
                </Button>
              </Tooltip>
              <Tooltip title="Change your current password" placement="bottom">
                <Button href="#">Change Password</Button>
              </Tooltip>
              {user.verified && (
                <Tooltip title="Verify your account email" placement="bottom">
                  <Button danger href="#">
                    <ExclamationCircleTwoTone twoToneColor="red" /> Verify Email
                  </Button>
                </Tooltip>
              )}
            </Space>
          </div>
        </Col>
        <Col span={10}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              marginLeft: '40px',
            }}
          >
            <h3>
              <strong>Role:</strong>{' '}
              <span id="role" style={{ fontWeight: 'normal' }}>
                {user.role}
              </span>
            </h3>
            <h3>
              <strong>Description: </strong>
              <span id="description" style={{ fontWeight: 'normal' }}>
                {user.description}
              </span>
            </h3>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

function Resources({ resources }) {
  const resourcesColumns = [
    {
      title: 'Resource Name',
      dataIndex: 'resourceName',
      key: 'resourceName',
      sorter: (a, b) => a.resourceName.localeCompare(b.resourceName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Upload Date',
      dataIndex: 'date',
      sorter: (a, b) => {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        return aDate.getTime() - bDate.getTime();
      },
    },
    {
      title: 'Topic',
      key: 'topic',
      dataIndex: 'topic',
      sorter: (a, b) => a.topic.localeCompare(b.topic),
      sortDirections: ['descend', 'ascend'],
      render: (topic) => {
        return (
          <Tag
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
            color={'#42D3D4'}
            key={topic}
          >
            {topic.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Path',
      key: 'path',
      dataIndex: 'path',
      sorter: (a, b) => a.path.localeCompare(b.path),
      sortDirections: ['descend', 'ascend'],
      render: (path) => {
        return (
          <Tag
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
            color={'#097AE8'}
            key={path}
          >
            {path.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ['descend', 'ascend'],
      render: (type) => {
        return (
          <Tag
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}
            color={'#00CDFF'}
            key={type}
          >
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Keywords',
      key: 'keywords',
      dataIndex: 'keywords',
      render: (keywords) => (
        <>
          {keywords.map((keyword) => {
            return (
              <Tag
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '2px',
                }}
                color={'#009B72'}
                key={keyword}
              >
                {keyword.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Link',
      key: 'link',
      dataIndex: 'link',
      render: (
        link // create clickable link to new tab
      ) => (
        <a href={link} rel="noopener noreferrer" target="_blank">
          {link}
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="/">Edit</a> | <a href="/">Remove</a>
        </Space>
      ),
    },
  ];
  return (
    <Card id="resources" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Uploaded Resources &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              View the resources you've added and edit them if necessary
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Tooltip title="Search for a resource" placement="right">
        <Search
          style={{ width: '50%', marginBottom: '20px' }}
          placeholder="Responsible AI Design Assistant"
          enterButton
          onSearch={console.log}
        />
      </Tooltip>
      <Table
        columns={resourcesColumns}
        dataSource={resources}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
    </Card>
  );
}

function Organizations({ organizations }) {
  const columns = [
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
      sorter: (a, b) => a.organization.localeCompare(b.organization),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ['descend', 'ascend'],
      render: (type) => {
        return (
          <Tag
            style={{ color: 'white', fontWeight: 'bold' }}
            color={'#097AE8'}
            key={type}
          >
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'User Role',
      key: 'role',
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortDirections: ['descend', 'ascend'],
      render: (role) => {
        return (
          <Tag
            style={{ color: 'white', fontWeight: 'bold' }}
            color={'red'}
            key={role}
          >
            {role.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Total Members',
      dataIndex: 'members',
      key: 'members',
      sorter: (a, b) => a.members.localeCompare(b.members),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => <a href="/">Leave</a>,
    },
  ];
  return (
    <Card id="users" style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
        Manage Organizations &nbsp;
        <Tooltip
          title={
            <p style={{ textAlign: 'center', marginBottom: '0' }}>
              View your existing organization memberships and leave if you
              choose
            </p>
          }
          placement="right"
        >
          <QuestionCircleTwoTone style={{ fontSize: '0.8em' }} />{' '}
        </Tooltip>
      </h1>
      <Tooltip title="Search for an organization" placement="right">
        <Search
          style={{ width: '50%', marginBottom: '20px' }}
          placeholder="The Galactic Empire"
          enterButton
          onSearch={console.log}
        />
      </Tooltip>
      <Table
        columns={columns}
        dataSource={organizations}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      />
    </Card>
  );
}

function UserSettings() {
  let [user, setUsers] = useState([]);
  useEffect(() => {
    API.get('/api/users/').then(setUsers);
  }, []);
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Row justify="start" align="middle">
        <Col span={3}>
          <a href="/" style={{ margin: '15px' }}>
            <img alt="logo" src="/logo.png" width={'160px'} />
          </a>
        </Col>
        <Col span={17}>
          <Breadcrumb style={{ marginLeft: '20px' }}>
            <Breadcrumb.Item>
              <a href="/">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">User Name</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={4}>
          <LoginButton />
        </Col>
      </Row>
      <Layout>
        <Sidebar
          mod={false}
          headings={['User Overview', 'Uploaded Resources', 'Organizations']}
        />
        <Content
          style={{
            padding: '24px 24px 24px',
            marginTop: '10px',
          }}
          offsetTop={100}
        >
          {user && <Dashboard user={user} />}
          {user && <Resources resources={user.resources} />}
          {user && <Organizations organizations={user.organizations} />}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default UserSettings;
