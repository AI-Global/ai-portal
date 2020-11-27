import React, { useRef, useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Descriptions,
  Button,
  PageHeader,
  Collapse,
  Table,
  Tag,
} from '../ant';
import {
  FileDoneOutlined,
  SearchOutlined,
  EditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import FormHeader from '../components/FormHeader';
import Sidebar from '../components/Sidebar';
import API from '../api';
import { useParams } from 'react-router-dom';

const { Panel } = Collapse;
const emptyRes = {
  name: '',
  desc: '',
  type: [],
  path: [],
  avatarIcon: '',
  aiSystemsType: [],
  uploadDate: '',
  creationDate: '',
  modifiedDate: '',
  licenseName: '',
  trustIndexCategories: [''],
  fundedBy: '',
  creator: '',
  dataDictLink: '',
  sensitiveData: '',
  qualityReview: '',
  ethicsReview: '',
  usage: '',
  isConfidential: '',
  offensiveContent: '',
  numInstances: '',
  instances: [],
  label: '',
  rawData: '',
  distribution: '',
  personalInfoRemoved: '',
  privacyProcedure: '',
  individualsIdentified: '',
  noiseDescription: ' ',
  externalRestrictions: '',
  files: [
    {
      name: 'Resource A',
      link:
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'URL',
    },
    {
      name: 'Resource B',
      link:
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      type: 'URL',
    },
  ],
  topics: [''],
  organizations: [''],
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
      render: (text) => <a href={text}>{text}</a>,
    },
  ];
  return (
    <div>
      <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
        Files
      </h1>
      <Table columns={columns} dataSource={props.data} />
    </div>
  );
}

export default function ViewResource() {
  let [resource, setResource] = useState(emptyRes);
  let { resId } = useParams();
  console.log(`resource id is ${resId}`);

  useEffect(() => {
    let fetchResource = async () => {
      let resource = await API.get('/api/resources/' + resId);
      setResource(resource);
    };
    fetchResource();
  });

  let topRef = useRef(null);
  let fileRef = useRef(null);
  let detailRef = useRef(null);
  let children = [];
  for (let i = 0; i < resource.topics.length; i++) {
    children.push(<Tag color="blue"> {resource.topics[i]}</Tag>);
  }

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
      <FormHeader />
      <Layout>
        <Sidebar
          headings={['Overview', 'Details', 'Files']}
          icons={[
            <FileDoneOutlined />,
            <SearchOutlined />,
            <FolderOpenOutlined />,
          ]}
          refs={[topRef, detailRef, fileRef]}
        />
        <Content
          style={{
            padding: '24px 24px 24px',
          }}
        >
          <div ref={topRef}>
            <PageHeader
              title={resource.name}
              onBack={() => window.history.back()}
              className="site-page-header"
              subTitle={resource.organizations.join(', ')}
              tags={children}
              extra={[
                <Button
                  icon={<EditOutlined />}
                  key="3"
                  shape="round"
                  href={'/resources/' + resId + '/edit'}
                >
                  Edit Resource
                </Button>,
              ]}
            />
          </div>
          <div ref={detailRef}>
            <h1
              style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}
            >
              Details
            </h1>
            <Collapse defaultActiveKey={['1']}>
              <Panel
                header="Primary Details"
                key="1"
                showArrow={false}
                disabled={true}
              >
                <Descriptions column={1}>
                  <Descriptions.Item label="Resource Type/Format">
                    {resource.type.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Resource Path">
                    {resource.path.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Responsible AI Trust Index Categories">
                    {resource.trustIndexCategories.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="AI Systems Type">
                    <text>Not available yet</text>
                  </Descriptions.Item>
                </Descriptions>
              </Panel>

              <Panel header="More Details" key="2">
                <Descriptions column={1}>
                  <Descriptions.Item label="Creation Date"></Descriptions.Item>
                  <Descriptions.Item label="Modified Date"></Descriptions.Item>
                  <Descriptions.Item label="Upload Date"></Descriptions.Item>
                  <Descriptions.Item label="Creator">
                    {resource.creator}
                  </Descriptions.Item>
                  <Descriptions.Item label="Funded By"></Descriptions.Item>
                </Descriptions>
              </Panel>
            </Collapse>
          </div>
          <div ref={fileRef}>
            <FileTable data={emptyRes.files}></FileTable>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
