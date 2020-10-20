import React, { useState } from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Breadcrumb,
  Header,
  Menu,
  Select,
  SubMenu,
  Affix,
  Sider,
  Space,
  Tag,
  Table,
  Statistic,
  Button,
  Radio,
  Divider,
  Input,
  InputNumber,
  Popconfirm,
  Form,
} from '../ant';

import {
  AreaChartOutlined,
  TeamOutlined,
  FileProtectOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

// import antd - changed dependencies
// import { Collapse } from 'antd';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
let TEMP_FRONTEND_ITEMS = [
  { name: 'AI Design Assistant', logoURL: '/demo/aiglobal.png' },
  { name: 'Fawkes', logoURL: '/demo/fawkes.png' },
  { name: 'The A-Z of AI', logoURL: '/demo/theazlogo.png' },
];

// mock data
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
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
              {/* <Menu.Item>
                <h1 style={{ fontSize: '1.5em' }}>Actions</h1>
              </Menu.Item> */}
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
              columns={columns}
              dataSource={data}
              onChange={onChange}
              pagination={{ pageSize: 3 }}
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
              columns={columns}
              dataSource={data}
              onChange={onChange}
              pagination={{ pageSize: 3 }}
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
