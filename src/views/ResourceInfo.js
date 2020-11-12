import React, { useState, useRef } from 'react';
import {
  Layout,
  Content,
  Descriptions,
  Button,
  Anchor,
  Sider,
  Menu,
  Affix,
  PageHeader,
  Collapse,
  Table,
  Tag,

} from '../ant';
import { FileDoneOutlined, SearchOutlined , EditOutlined, FolderOpenOutlined} from '@ant-design/icons';
import FormHeader from '../components/FormHeader';

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
    topics: ["Other topic"],
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
    <h1 style={{ padding:'10px',fontSize: '2em', fontWeight: 'bold'}}>Files</h1>
    <Table columns={columns} dataSource={props.data} />
    </div>
  )
}

function SideBar(props){
  return(
  <Affix offsetTop={60}>

  <Sider width={250}>
    <Menu
      mode="inline"
      theme="light"
      defaultOpenKeys={['users', 'resources']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item 
        key="overview" 
        icon={<FileDoneOutlined/>}
        style={{ marginTop: '30px' }}
        onClick={() => {
          props.topRef.current.scrollIntoView();
        }}>
          Overview
      </Menu.Item>

      <Menu.Item 
        key="details"  
        icon={<SearchOutlined/>}                     
        onClick={() => {
          props.detailRef.current.scrollIntoView();
        }} >
          Details 
      </Menu.Item>
      <Menu.Item 
        key="files"
        icon={<FolderOpenOutlined/>}
        onClick={() => {
          props.fileRef.current.scrollIntoView();
        }} >
          Files 
      </Menu.Item>
    </Menu>
  </Sider>
  </Affix> );
}


export default function ShowExample() {
  return (
    <ResourceInfo resource = {resourceData}/>
  );
}

function ResourceInfo(props) {
  let topRef = useRef(null);
  let fileRef = useRef(null);
  let detailRef = useRef(null);
  let children= [];
  for (let i = 0; i < props.resource.topics.length; i++) {
    children.push(<Tag color='blue'> {props.resource.topics[i]}</Tag>)
  }

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden', }}>
      <FormHeader/>
      <Layout>
        <SideBar topRef={topRef} fileRef={fileRef} detailRef={fileRef}/>

        <Content>
          <div ref = {topRef}>
            <PageHeader
              title={props.resource.name}
              onBack={() => window.history.back()}
              className="site-page-header"
              subTitle={props.resource.organizations.join(", ")}
              tags={children}
              extra={[
                <Button 
                  icon={  <EditOutlined />}
                  key="3" 
                  shape="round">
                    Edit Resource
                </Button>,
              ]}
            >
              {props.resource.desc}
            </PageHeader>,
          </div>
    {/* <Title style ={{padding: "10px"}} level={5}>Details</Title> */}
    <div ref={detailRef}></div>

    <h1 style={{ padding:'10px',fontSize: '2em', fontWeight: 'bold'}}>Details</h1>
    <Collapse defaultActiveKey={['1']}  >
    <Panel header="Primary Details" key="1" showArrow={false}>
     <Descriptions  column= {1} >
  <Descriptions.Item label="Resource Type/Format">{props.resource.type.join(", ")}</Descriptions.Item>
    <Descriptions.Item label="Resource Path">{props.resource.path.join(", ")}</Descriptions.Item>
  <Descriptions.Item label="Responsible AI Trust Index Categories">{props.resource.trustIndexCategories.join(", ")}</Descriptions.Item>
    <Descriptions.Item label="AI Systems Type">{props.resource.aiSystemsType.join(", ")}</Descriptions.Item>
    </Descriptions>
   </Panel>

    <Panel header="More Details" key="2">
    <Descriptions  column= {1} >
  <Descriptions.Item label="Creation Date"></Descriptions.Item>
    <Descriptions.Item label="Modified Date"></Descriptions.Item>
  <Descriptions.Item label="Upload Date"></Descriptions.Item>
    <Descriptions.Item label="Technical"></Descriptions.Item>
    <Descriptions.Item label="Creator"></Descriptions.Item>
    <Descriptions.Item label="Funded By"></Descriptions.Item>

    </Descriptions>
    </Panel>
  </Collapse>
  <div ref={fileRef}></div>
    <FileTable  data={props.resource.files}></FileTable>
      </Content>

      </Layout>
      
    </Layout>
  );
}