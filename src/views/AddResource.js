import React from 'react';
import {
  Layout,
  Content,
  Menu,
  Header,
  Button,
  Input,
  Select,
  Search,
  Form,
  Affix,
  Col,
  Space,
} from '../ant';
import {Typography,  DatePicker} from 'antd'
import Footer from '../components/Footer';
import ResourceField from '../components/ResourceField'


const {TextArea} = Input;
const { Title, Paragraph, Text } = Typography;
const {Option} = Select;

function addResources() {
  let onSubmit = async (values) => {

  };
  let onFail = (values) => {
  };
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
          </Menu>
        </Header>
      </Affix>
      <Layout>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content>
            <Space direction="vertical" style={{ width: '100%',textAlign: 'center'}}>
              <Col span={16}
                style={{ textAlign: 'center', backgroundColor: '#fff', padding: '26px', minWidth:'700px'}}>
                <Form
                  labelCol={{ span: 4}}
                  wrapperCol={{ span: 10 }}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onSubmit}
                  onFinishFailed={onFail}
                  style={{minWidth:'1000px', overflow: 'auto', justifyContent:'center'}}
                >
                  <Typography>            
                  <Title>Add a Resource</Title>
                  </Typography>
                  <Form.Item
                    label="Name of Resource"
                    name= "Name"
                    rules={[{ required: true, message: 'Please the name of the resource!' }]}
                  >
                    <Input/>
                  </Form.Item>
                  <ResourceField field={'Organization Type'} options={['Industry','Academia', 'Government','Civil Society']}/>
                  <ResourceField field={'Topics'} options={["Banking", "Health", "Labor", "Retail", "Education", "Law Enforcement", "Media", "Other"]}/>
                  <ResourceField field={'Formats'} options = {['Algorithm', 'API', 'Assessment', 'Benchmark', 'Datasets', 'Design Tool', 'Education Tool', 'Framework', 'Inspection', 'Library', 'Machine Learning Tool', 'Podcast', 'Principles', 'Research', 'Software', 'Strategy & Implementation', 'Toolkit', 'Vision Tool', 'Working Groups', 'Workshops']}/>
                  <ResourceField field={'Path'} options={['Designer Path','Developer Path', 'Policymaker Path', 'Riskmanager Path', 'Explorer']}/>

                  <ResourceField field={'Trust Index Categories'} options={['Explainability & Interpretability', 'Data Quality', 'Bias & Fairness', 'Accountability', 'Robustness']}/>
                  <Form.Item label= "Tech/Non-Tech">
                    <Select
                        labelInValue   >
                        <Option value="Technical">Technical</Option>
                        <Option value="Non-Technical">Non-Technical</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Upload Date">
                  <DatePicker/>
                </Form.Item>
                <Form.Item label="Creation Date" >
                  <DatePicker/>
                </Form.Item>
                <Form.Item label="Date Modified" >
                  <DatePicker/>
                </Form.Item>
                <Form.Item label ="Description">
                  <TextArea rows= {4}></TextArea>
                </Form.Item>
                <Form.Item 
                  label="URL Source"
                >
                  <Input />
                </Form.Item>
                <Form.Item  >
                  <Button type="primary" htmlType="submit" size="large" shape="round">Submit</Button>
                </Form.Item>
                </Form>
              </Col>
            </Space>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}



export default addResources;
