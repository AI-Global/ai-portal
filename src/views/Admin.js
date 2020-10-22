import React, { useState } from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Breadcrumb,
  Menu,
  SubMenu,
  Affix,
  Sider,
  Space,
  Tag,
  Table,
  Statistic,
} from '../ant';

import {
  AreaChartOutlined,
  TeamOutlined,
  FileProtectOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';

// convert string to color
var stringToColor = (str) => {
  var hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// resource columns
const resourcesColumns = [
  {
    title: 'Resource Name',
    dataIndex: 'resourceName',
    key: 'resourceName',
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // -> will now order alphabetically
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Date Uploaded',
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
      let color = stringToColor(topic);
      return (
        <Tag
          style={{ color: 'black', fontWeight: 'bold' }}
          color={color}
          key={topic}
        >
          {topic.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = stringToColor(tag);
          return (
            <Tag
              style={{ color: 'black', fontWeight: 'bold' }}
              color={color}
              key={tag}
            >
              {tag.toUpperCase()}
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
    render: (link) => (
      <a href={link} target="_blank">
        {link}
      </a>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Accept</a>
        <a>Reject</a>
      </Space>
    ),
  },
];

const resourcesData = [
  {
    key: '1',
    resourceName: 'IBM AI Fairness 360',
    date: '2015-03-25',
    topic: 'Finance',
    link: 'https://aif360.mybluemix.net/',
    tags: ['framework', 'toolkit'],
  },
  {
    key: '2',
    resourceName: 'IBM AI Fairness 360',
    date: '2015-03-25',
    topic: 'Banking',
    link: 'https://aif360.mybluemix.net/',
    tags: ['framework', 'toolkit'],
  },
  {
    key: '3',
    resourceName: 'IBM AI Fairness 360',
    date: '2015-03-28',
    topic: 'Retail',
    link: 'https://aif360.mybluemix.net/',
    tags: ['framework', 'toolkit'],
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function Admin() {
  const [selectionType, setSelectionType] = useState('checkbox');
  let history = useHistory();
  let [query, setQuery] = React.useState('');
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Row justify="start" align="middle">
        <Col span={3}>
          <a href="/" style={{ margin: '15px' }}>
            <img src="/logo.png" width={'160px'} />
          </a>
        </Col>
        <Col span={17}>
          <Breadcrumb style={{ marginLeft: '20px' }}>
            <Breadcrumb.Item>
              <a href="/">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">User Name</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Administration</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={4}>
          {/* configure displaying logout button */}
          <LoginButton />
        </Col>
      </Row>

      <Layout>
        <Affix offsetTop={60}>
          <Sider width={250}>
            <Menu
              mode="inline"
              theme="light"
              defaultOpenKeys={['users', 'resources']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item
                key="dashboard"
                icon={<AreaChartOutlined />}
                style={{ marginTop: '30px' }}
              >
                Dashboard
              </Menu.Item>
              <SubMenu key="users" title="Users" icon={<TeamOutlined />}>
                <Menu.Item key="11">User Type</Menu.Item>
                <Menu.Item key="12">Organizations</Menu.Item>
                <Menu.Item key="13">Administrators</Menu.Item>
              </SubMenu>
              <SubMenu
                key="resources"
                title="Resources"
                icon={<FileProtectOutlined />}
              >
                <Menu.Item key="21">Resource Type</Menu.Item>
                <Menu.Item key="22">Pending Approval</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </Affix>
        <Content
          style={{
            padding: '24px 24px 24px',
            marginTop: '10px',
          }}
          offsetTop={100}
        >
          <Card id="overview" style={{ marginBottom: '20px' }}>
            <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
              Administration Overview
            </h1>
            <Row gutter={16}>
              <Col span={4}>
                <Statistic title="Active Accounts" value={112893} />
              </Col>
              <Col span={4}>
                <Statistic title="Active Resources" value={112893} />
              </Col>
              <Col span={4}>
                <Statistic title="Pending Resources" value={112893} />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: '20px' }}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Weekly Active Users (WAU)"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Resource Requests"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </Card>

          <Card id="resources" style={{ marginBottom: '20px' }}>
            <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
              Pending Resources
            </h1>

            <p>Existing requests to add resources to Portal.</p>
            <Search
              style={{ width: '50%', marginBottom: '20px' }}
              placeholder="Resource Search"
              enterButton
              onSearch={console.log}
            />

            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={resourcesColumns}
              dataSource={resourcesData}
              onChange={onChange}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 240 }}
            />
          </Card>

          <Card id="users">
            <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>
              Manage Users
            </h1>

            <p>
              Edit user privileges and accounts. View individual user
              information by selecting the relevant person.
            </p>
            <Search
              style={{ width: '50%', marginBottom: '20px' }}
              placeholder="User Search"
              enterButton
              onSearch={console.log}
            />

            <Table
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={resourcesColumns}
              dataSource={resourcesData}
              onChange={onChange}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 240 }}
            />
          </Card>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default Admin;
