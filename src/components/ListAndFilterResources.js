import React, { useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Menu,
  SubMenu,
  Sider,
  Select,
  Affix,
  Space,
  Spin,
} from '../ant';
import ResourceCard from '../components/ResourceCard';
import { useAppEnv } from '../env';
import { FilterTwoTone } from '@ant-design/icons';

export default function ListAndFilterResources({
  orgTypes,
  resourceTypes,
  fileTypes,
  resourcePath,
  query,
}) {
  let { api } = useAppEnv();
  let [resources, setResources] = useState(null);
  let [topics, setTopics] = useState([]);
  let [orgs, setOrgs] = useState([]);
  useEffect(() => {
    api
      .get('/api/resources', { query: query })
      .then((resources) => setResources(resources));
    api.get('/api/organizations').then((orgs) => setOrgs(orgs));
    api.get('/api/topics').then((topics) => setTopics(topics));
  }, [query, api]);
  return (
    <Layout>
      <Affix offsetTop={64}>
        <Sider width={200}>
          <Menu
            mode="inline"
            theme="light"
            defaultSelectedKeys={['topics']}
            defaultOpenKeys={['topics', 'groups']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item style={{ marginTop: '10px' }}>
              <h1
                style={{
                  fontSize: '1.2em',
                  width: '100%',
                  fontWeight: 'bolder',
                }}
              >
                <FilterTwoTone style={{ fontSize: '1em' }} />
                Filters
              </h1>
            </Menu.Item>
            <Menu.Item key="orgs" disabled>
              <Select
                showSearch
                defaultValue="Organization"
                style={{ width: '100%' }}
              >
                {orgs.map((res) => (
                  <Select.Option value={res.name}>{res.name}</Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item key="orgTypes" disabled>
              <Select
                showSearch
                defaultValue="Organization Type"
                style={{ width: '100%' }}
              >
                {orgTypes.map((res) => (
                  <Select.Option value={res}>{res}</Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item key="resourceTypes" disabled>
              <Select
                showSearch
                defaultValue="Resource Type"
                style={{ width: '100%' }}
              >
                {resourceTypes.map((res) => (
                  <Select.Option value={res}>{res}</Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item key="paths" disabled>
              <Select
                showSearch
                defaultValue="Resource Path"
                style={{ width: '100%' }}
              >
                {resourcePath.map((res) => (
                  <Select.Option value={res}>{res}</Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item key="fileTypes" disabled>
              <Select defaultValue="Format" style={{ width: '100%' }}>
                {fileTypes.map((res) => (
                  <Select.Option value={res.ext}>{res.name}</Select.Option>
                ))}
              </Select>
            </Menu.Item>
            <Menu.Item key="sort" disabled>
              <Select defaultValue="Sort By" style={{ width: '100%' }}>
                <Select.Option value="relevance">Relevance</Select.Option>
                <Select.Option value="title">Title</Select.Option>
                <Select.Option value="date">Date</Select.Option>
              </Select>
            </Menu.Item>
            <SubMenu key="topics" title="Topics">
              {topics.map((res, index) => (
                <Menu.Item key={'1' + String(index + 1)}>{res.name}</Menu.Item>
              ))}
            </SubMenu>
            <SubMenu key="groups" title="Categories">
              <Menu.Item key="21">Fairness</Menu.Item>
              <Menu.Item key="22">Bias</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </Affix>
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content>
          {resources != null && (
            <Space direction="vertical" style={{ width: '100%' }}>
              {resources.map((res) => (
                <ResourceCard key={res._id} resource={res} />
              ))}
            </Space>
          )}
          {resources == null && <Spin />}
        </Content>
      </Layout>
    </Layout>
  );
}
