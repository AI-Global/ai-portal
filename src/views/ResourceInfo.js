import React, { useState, useRef } from 'react';
import {
  Layout,
  Content,
  Form,
  Descriptions,
  Row,
  Col,
  Input,
  Space,
  Divider,
  Checkbox,
  Button,
  Header,
  Anchor,
  Sider,
  Menu,
  Affix,
  Search,
  Card,
  PageHeader,
  Collapse,
  Table,
  Tag,

} from '../ant';
import {notification, Typography} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Footer from '../components/Footer';
import API from '../api';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';
const { Link } = Anchor;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const resourceData = [
  {
    name: 'Living Dictionary',
    desc: '',
    type: '',
    path: '',
    uploadDate: '',
    creationDate: '',
    modifiedDate:'',
    licenseName :'',
    technical: '',
    trustIndexCategories: [],
    fundedBy: '',
    creator: '',
    dataDictLink: '',
    sensitiveData: '',
    qualityReview: '',
    ethicsReview: '',
    usage : '',
    isConfidential: '',
    offensiveContent: '',
    numInstances: '',
    instances: [],
    label: '', 
    rawData: '',
    distribution: '',
    personalInfoRemoved: '',
    privacyProcedure :'',
    individualsIdentified : '',
    noiseDescription :' ',
    externalRestrictions:'',
    files: [],
    topics: [],
    organizations: []
  }
];
function FileTable() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    }
  ]
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    }
  ]
  return (
    <div>
    <Title style ={{padding: "10px"}} level={5}>Files</Title>
    <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default function showExample() {
  return (
    <ResourceInfo resource = {resourceData}/>
  );
}

function ResourceInfo(props) {
//   let onClick  = (e) => {
//     console.log(e);
//     let offset = 100;
//     window.onload =  window.scrollTo({
//     behavior: "smooth",
//     top:document.getElementById("inner").getBoundingClientRect().top -
//     document.body.getBoundingClientRect().top -100
// });
  //};
  
  // const titleRef = useRef()
  // let onClick = (e) => {
  //   titleRef.current.scrollIntoView({ behavior: 'smooth' })
  // };
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
        <Sider width="300px" style = {{  background: "#fff"}}>
         <PageHeader
          className= {{border: "1px solid"}}
          onBack={() => null}
          title="Resource Example"
          style = {{background : "#00ADEE"}}
        >
          <p>Key Word 1 || Key Word 2</p>
        </PageHeader> 
        <Menu width={200}
            defaultSelectedKeys={['1']}
            mode="inline"
            defaultSelectedKeys={['1']}
            theme="light"
            // onClick={onClick}
          >
          <Menu.Item key="1" >Option 1       </Menu.Item>

          <Menu.Item key="2" >Option 2 </Menu.Item>
          <Menu.Item key="3" >Option 3 </Menu.Item>

        </Menu> 
      </Sider>
      <Content>
      {/* <Space split={<Divider type="vertical" />}> */}
      <div></div>
      <Descriptions title="Resource Info" style ={{padding: "10px"}}>
        <Paragraph>
        The model analyzed in this card detects one or more faces within an image or a video frame, and returns a box around each face along with the location of the faces' major landmarks. The model's goal is exclusively to identify the existence and location of faces in an image. It does not attempt to discover identities or demographics.
        On this page, you can learn more about how well the model performs on images with different characteristics, including face demographics, and what kinds of images you should expect the model to perform well or poorly on.
        </Paragraph>
        </Descriptions>
   
    <Title style ={{padding: "10px"}} level={5}>Details</Title>

    <Collapse defaultActiveKey={['1']}  >
    <Panel header="Primary Details" key="1">
     <Descriptions  column= {1} >
     <Descriptions.Item label="Resource Type">empty</Descriptions.Item>
    <Descriptions.Item label="Resource Path">empty</Descriptions.Item>
    <Descriptions.Item label="Upload Date">empty</Descriptions.Item>
    <Descriptions.Item label="Creation Date">empty</Descriptions.Item>
    <Descriptions.Item label="Modified Date">empty    </Descriptions.Item>
    <Descriptions.Item label="License Name">empty</Descriptions.Item>

    <Descriptions.Item label="Technical">empty</Descriptions.Item>
    <Descriptions.Item label="Featured">empty</Descriptions.Item>

    <Descriptions.Item label="Trust Index Categories">empty</Descriptions.Item> 
    </Descriptions>
   </Panel>
    <Panel header="More Details" key="2">
      <p>he</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" >
      <p>he</p>
    </Panel>
  </Collapse>
    <FileTable ></FileTable>
      </Content>
      
      </Layout>
      
    </Layout>
  );
}
