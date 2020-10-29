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
  Typography,
  DatePicker,
  Tooltip,
} from '../ant';
import Footer from '../components/Footer';
import ResourceField from '../components/ResourceField'


const {TextArea} = Input;
const { Title, Paragraph, Text } = Typography;
const {Option} = Select;

function AddResources() {
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
      <Layout  style={{ display: 'flex', alignItems: 'center',justifyContent:'center'}}>
        <Content justify="center">
          <Space direction="vertical" style={{ width: '100%',textAlign: 'center', alignContent:'center'}}>
            <Col span={18}
              style={{ backgroundColor: '#fff', minWidth:'700px'}}>
              <Form
                labelCol={{ span: 4}}
                wrapperCol={{ span: 10 }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFail}
                style={{minWidth:'1000px', overflow: 'auto'}}
              >
                <Form.Item>
                  <Typography><Title>Add a Resource</Title></Typography>
                </Form.Item>
                <Tooltip title="This is what your resource will be displayed as. Make sure capitalization and spelling is correct">
                  <Form.Item
                    label="Name of Resource"
                    name= "Name"
                    rules={[{ required: true, message: 'Please add the name of the resource!' }]}
                  >
                      <Input/>
                  </Form.Item>
                </Tooltip>

                <ResourceField name='name' label={'Organization Type'} mode="multiple"
                  options={['Industry','Academia', 'Government','Civil Society','Other']} 
                  text ="This is the type of organization that created this resource"
                  />
                <ResourceField name="topics" label='Topics' mode="multiple" 
                  options={["Banking", "Health", "Labor", "Retail", "Education", "Law Enforcement", "Media", "Other"]} 
                  text="These are the relevant topics for this resource"/>
                <ResourceField name="formats" label="Formats" mode="multiple"
                  options = {['Algorithm', 'API', 'Assessment', 'Benchmark', 'Datasets', 'Design Tool', 'Education Tool', 'Framework', 'Inspection', 'Library', 'Machine Learning Tool', 'Podcast', 'Principles', 'Research', 'Software', 'Strategy & Implementation', 'Toolkit', 'Vision Tool', 'Working Groups', 'Workshops', 'Other']}
                  text="These are the purposes of the resource"/>
                <ResourceField name='path'   label="Paths" mode="multiple" 
                  options={['Designer Path','Developer Path', 'Policymaker Path', 'Riskmanager Path', 'Explorer','Other']}
                  text={"These are the people who might find this resource relevant."}/>

                <ResourceField name="trustIndexCategories"  label='Trust Index Categories' mode="multiple"
                  options={['Explainability & Interpretability', 'Data Quality', 'Bias & Fairness', 'Accountability', 'Robustness', 'Other']}
                  text="These are issues/metrics mentioned and used in this resource"
                  />
                <Tooltip title="This is whether the resource has technical or non-technical content.">
                  <Form.Item label= "Tech/Non-Tech">
                      <Select
                          labelInValue   >
                          <Option value="Technical">Technical</Option>
                          <Option value="Non-Technical">Non-Technical</Option>
                      </Select>
                </Form.Item>
              </Tooltip>
              <Tooltip   title="This is today's date">
                <Form.Item label="Upload Date">
                  <DatePicker/>
                </Form.Item>
              </Tooltip>

              <Tooltip title="This is the date the resource was created. It can be left empty if the date is not available.">
                <Form.Item label="Creation Date" >
                  <DatePicker/>
                </Form.Item>
              </Tooltip>

              <Tooltip title="This is the date the resource was last modified. It can be left empty if the date is not available.">
                <Form.Item label="Date Modified">
                  <DatePicker/>
                </Form.Item>
              </Tooltip>

              <Tooltip title="A brief description about the resource">
                <Form.Item label ="Description">
                  <TextArea rows= {4}></TextArea>
                </Form.Item>
              </Tooltip>

              <Form.Item 
                label="URL Source"
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" shape="round">Submit</Button>
              </Form.Item>
              </Form>
            </Col>
          </Space>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}



export default AddResources;
