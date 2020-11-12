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
import { UserOutlined, LockOutlined , EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import Footer from '../components/Footer';
import API from '../api';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';
import FormHeader from '../components/FormHeader';
const { Link } = Anchor;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const resourceData = {
    name: 'Living Dictionary',
    desc: 'An interactive dictionary of technical computer science and social science terms in plain language',
    type: ['Education Tool'],
    path: ['Explorer Path'],
    avaterIcon: "",
    aiSystemsType:[],
    uploadDate: '',
    creationDate: '',
    modifiedDate:'',
    licenseName :'',
    technical: '',
    trustIndexCategories: ['Explainability & Interpretability'],
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
    files: [{name: "Dictionary", link: "https://montrealethics.ai/dictionary/", type:"URL"},
  {name:"Click me", link:"www.google.com", type:"URL"}],
    topics: [],
    organizations: ["Montreal AI Ethics Institute"]
  };
function FileTable(props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: text => <a href={text}>{text}</a>
    },
  ]
  return (
    <div>
    <Title style ={{padding: "10px"}} level={5}>Files</Title>
    <Table columns={columns} dataSource={props.data} />
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
      <FormHeader/>
      <Layout>
        <Sider width="300px" style = {{  background: "#fff"}}>
        <Menu width={200}
            defaultSelectedKeys={['1']}
            mode="inline"
            defaultSelectedKeys={['1']}
            theme="light"
            // onClick={onClick}
          >
          <Menu.Item key="1" >Overview</Menu.Item>

          <Menu.Item key="2" >Details </Menu.Item>
          <Menu.Item key="3" >Files </Menu.Item>

        </Menu> 
      </Sider>
      <Content>
      <div></div>
      <PageHeader
    title={props.resource.name}
    onBack={() => window.history.back()}
    className="site-page-header"
    subTitle={props.resource.organizations.join(", ")}
    tags={<Tag color="blue">Running</Tag>}
    extra={[
    <Button icon=     {  <EditOutlined />}
      key="3" shape="round">Edit Resource</Button>,

      // <DropdownMenu key="more" />,
    ]}
    
  >
            {props.resource.desc}

  </PageHeader>,
   
    <Title style ={{padding: "10px"}} level={5}>Details</Title>

    <Collapse defaultActiveKey={['1']}  >
    <Panel header="Primary Details" key="1">
     <Descriptions  column= {1} >
  <Descriptions.Item label="Resource Type/Format">{props.resource.type.join(", ")}</Descriptions.Item>
    <Descriptions.Item label="Resource Path">{props.resource.path.join(", ")}</Descriptions.Item>
  <Descriptions.Item label="Responsible AI Trust Index Categories">{props.resource.trustIndexCategories.join(", ")}</Descriptions.Item>
    <Descriptions.Item label="AI Systems Type">{props.resource.aiSystemsType.join(", ")}</Descriptions.Item>
    </Descriptions>
   </Panel>
    <Panel header="More Details" key="2">
      <p>he</p>
    </Panel>
  </Collapse>
    <FileTable data={props.resource.files}></FileTable>
      </Content>
      
      </Layout>
      
    </Layout>
  );
}