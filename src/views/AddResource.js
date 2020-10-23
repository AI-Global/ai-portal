import React from 'react';
import {
  Layout,
  Content,
  Menu,
  SubMenu,
  Sider,
  Header,
  Button,
  Input,
  Select,
  Search,
  Form,
  Card,
  Affix,
  Badge,
  Space,
  Tag,
} from '../ant';
import {notification, Typography,  DatePicker} from 'antd'
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import API from '../api';
import ResourceField from '../components/ResourceField'


const {TextArea} = Input;
const { Title, Paragraph, Text } = Typography;
const {Option} = Select;
const children = [];
const topics = ["Banking", "Health", "Labor", "Retail", "Education", "Law Enforcement", "Media", "Other"];
for (let i = 0; i < topics.length; i++) {
children.push(<Option key={topics[i]} >{topics[i]}</Option>);
}

const format_children = []
const formats = ['Algorithm', 'API', 'Assessment', 'Benchmark', 'Datasets', 'Design Tool', 'Education Tool', 'Framework', 'Inspection', 'Library', 'Machine Learning Tool', 'Podcast', 'Principles', 'Research', 'Software', 'Strategy & Implementation', 'Toolkit', 'Vision Tool', 'Working Groups', 'Workshops'];
for (let i = 0; i < formats.length; i++) {
  format_children.push(<Option key={formats[i]} >{formats[i]}</Option>);
  }

const trust_children = []
const trust = ['Explainability & Interpretability', 'Data Quality', 'Bias & Fairness', 'Accountability', 'Robustness']
for (let i = 0; i < trust.length;i++) {
  trust_children.push(<Option key={trust[i]} >{trust[i]}</Option>);
}


function addResources() {

  return (
    <Layout>
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
            <Menu.Item key="1">20 Datasets</Menu.Item>
            <Menu.Item key="2">5 Tools</Menu.Item>
            <Menu.Item key="3">520 Articles</Menu.Item>
            <Menu.Item key="4">&#43; Suggest Resource</Menu.Item>
          </Menu>
          <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
            <LoginButton />
          </div>
        </Header>
      </Affix>
      <Layout>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Form
                labelCol= {{xs: { span: 24 }, sm: { span: 8 },}}
                wrapperCol= {{xs: { span: 24 },sm: { span: 16 },}}
                name="basic"
                initialValues={{ remember: true }}
                style={{minWidth:'600px', overflow: 'auto'}}
              >
                <Form.Item style={{justifyContent:"center",width:'900px'}}
                  label="Name of Resource"
                  name= "Name"
                  rules={[{ required: true, message: 'Please the name of the resource!' }]}
                >
                  <Input/>
                </Form.Item>
                <ResourceField field={'Organization Type'} options={['Industry','Academia', 'Government','Civil Society']}/>
                <ResourceField field={'Topics'} options={["Banking", "Health", "Labor", "Retail", "Education", "Law Enforcement", "Media", "Other"]}/>
                <ResourceField field={'Formats'} options = {['Algorithm', 'API', 'Assessment', 'Benchmark', 'Datasets', 'Design Tool', 'Education Tool', 'Framework', 'Inspection', 'Library', 'Machine Learning Tool', 'Podcast', 'Principles', 'Research', 'Software', 'Strategy & Implementation', 'Toolkit', 'Vision Tool', 'Working Groups', 'Workshops']}/>
                <ResourceField field={'Path'} options={['Designer Path','Developer Path', 'Policymaker Path', 'Riskmanager Path']}/>

                <ResourceField field={'Trust Index Categories'} options={['Explainability & Interpretability', 'Data Quality', 'Bias & Fairness', 'Accountability', 'Robustness']}/>
                <Form.Item label= "Tech/Non-Tech" style={{justifyContent:"center", width:'900px'}}>
                  <Select
                      labelInValue   >
                      <Option value="Technical">Technical</Option>
                      <Option value="Non-Technical">Non-Technical</Option>
                  </Select>
              </Form.Item>
              <Form.Item label="Creation Date" style={{justifyContent:"center", width:'900px'}} >
                <DatePicker/>
              </Form.Item>
              <Form.Item label="Modified Date" style={{justifyContent:"center", width:'900px'}} >
                <DatePicker/>
              </Form.Item>
              <Form.Item label="Upload Date" style={{justifyContent:"center", width:'900px'}} >
                <DatePicker/>
              </Form.Item>
              <Form.Item label ="Description" style={{justifyContent:"center", width:'900px'}} >
                <TextArea rows= {4}></TextArea>
              </Form.Item>
              <Form.Item style={{justifyContent:"center", width:'900px'}}
                label="URL Source"
              >
                <Input />
              </Form.Item>
              <Form.Item style={{justifyContent:"center", width:'900px'}} >
                <Button type="primary" htmlType="submit" shape="round" block>Create Account</Button>
              </Form.Item>
              </Form>
            </Space>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}



export default addResources;
