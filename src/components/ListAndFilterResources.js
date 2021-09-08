import React, { useEffect, useState } from 'react';
import {
  Layout,
  Content,
  Menu,
  Sider,
  Select,
  Affix,
  Space,
  Spin,
  Tooltip,
  Button,
} from '../ant';
import ResourceCard from '../components/ResourceCard';
import { useAppEnv } from '../env';
import { FilterTwoTone, RedoOutlined } from '@ant-design/icons';

export default function ListAndFilterResources({
  orgTypes,
  resourceTypes,
  fileTypes,
  resourcePath,
  query,
  filterVals,
  updateSearch,
}) {
  let { api } = useAppEnv();
  let [resources, setResources] = useState(null);
  let [loading, setLoading] = useState(true);
  let [topics, setTopics] = useState([]);
  let [orgs, setOrgs] = useState([]);
  useEffect(() => {
    api.get('/api/organizations').then(orgs => setOrgs(orgs));
    api.get('/api/topics').then(topics => setTopics(topics));
  }, [api]);
  useEffect(() => {
    setLoading(true);
    api
      .get('/api/resources', { query: query, approved: true, ...filterVals })
      .then(resources => {
        setResources(resources);
        setLoading(false);
      });
  }, [query, filterVals, api]);
  let updateFilters = newFilters => {
    updateSearch(query, { ...filterVals, ...newFilters });
  };
  let updateFiltersByName = (namesSelected, type) => {
    if (type === 'organization') {
      const organizationIds = [];
      namesSelected.forEach(name => {
        orgs.forEach(org => {
          if (org.name === name) {
            organizationIds.push(org._id);
          }
        });
      });
      updateSearch(query, { ...filterVals, organizations: organizationIds });
    }
    if (type === 'topics') {
      const topicIds = [];
      namesSelected.forEach(name => {
        topics.forEach(topic => {
          if (topic.name === name) {
            topicIds.push(topic._id);
          }
        });
      });
      updateSearch(query, { ...filterVals, topics: topicIds });
    }
  };
  return (
    <Layout>
      <Affix offsetTop={64}>
        <Sider width={200}>
          <Menu
            mode="inline"
            theme="light"
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item style={{ marginTop: '10px' }} disabled>
              <Tooltip
                placement="right"
                title={() => (
                  <t>
                    Learn more on our&nbsp;
                    <a href="/faq">FAQ</a>
                  </t>
                )}
              >
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
              </Tooltip>
            </Menu.Item>
            <Select
              onChange={v => updateFiltersByName(v, 'organization')}
              placeholder="Organization"
              style={{ width: '95%', padding: '2px 10px' }}
              mode="multiple"
              showArrow={true}
              allowClear={true}
            >
              {orgs.map(org => (
                <Select.Option value={org.name}>{org.name}</Select.Option>
              ))}
            </Select>
            <Select
              showSearch
              onChange={e => updateFilters({ organizationType: e })}
              placeholder="Organization Type"
              style={{ width: '95%', padding: '5px 10px' }}
              mode="multiple"
              showArrow={true}
              allowClear={true}
            >
              {orgTypes.map(res => (
                <Select.Option value={res}>{res}</Select.Option>
              ))}
            </Select>
            <Select
              showS
              onChange={e => updateFilters({ type: e })}
              placeholder="Resource Type"
              style={{ width: '95%', padding: '5px 10px' }}
              mode="multiple"
              showArrow={true}
              allowClear={true}
            >
              {resourceTypes.map(res => (
                <Select.Option value={res}>{res}</Select.Option>
              ))}
            </Select>
            <Select
              showSearch
              onChange={e => updateFilters({ path: e })}
              placeholder="Roles"
              style={{ width: '95%', padding: '5px 10px' }}
              mode="multiple"
              showArrow={true}
              allowClear={true}
            >
              {resourcePath.map(res => (
                <Select.Option value={res}>
                  {res.replace('Path', '')}
                </Select.Option>
              ))}
            </Select>
            <Select
              onChange={e => updateFilters({ sortBy: e })}
              placeholder="Sort By"
              style={{ width: '95%', padding: '5px 10px' }}
              showArrow={true}
              allowClear={true}
            >
              <Select.Option value="byCreationDateDesc">
                Date Created (Newest)
              </Select.Option>
              <Select.Option value="byUploadDateAsc">
                Date Uploaded(Oldest)
              </Select.Option>
              <Select.Option value="byUploadDateDesc">
                Date Uploaded (Newest)
              </Select.Option>
              <Select.Option value="byNameAsc">Name</Select.Option>
            </Select>
            <Select
              onChange={e => updateFiltersByName(e, 'topics')}
              placeholder="Topics"
              style={{ width: '95%', padding: '5px 10px' }}
              mode="multiple"
              showArrow={true}
              allowClear={true}
            >
              {topics.map(res => (
                <Select.Option value={res.name}>{res.name}</Select.Option>
              ))}
            </Select>

            <Menu.Item disbled selectable={false}>
              <Button href="/resources?q=">
                Reset Filters <RedoOutlined style={{ marginRight: '0' }} />
              </Button>
            </Menu.Item>
          </Menu>
        </Sider>
      </Affix>
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content style={{ minHeight: '750px' }}>
          {!loading && (
            <Space direction="vertical" style={{ width: '100%' }}>
              {resources.map(res => (
                <ResourceCard key={res._id} resource={res} />
              ))}
            </Space>
          )}
          {!loading && resources.length === 0 && (
            <div>
              <h3 style={{ marginTop: '5px' }}>
                Your search did not match any resources. Try a different search
                or use the filters.
              </h3>
            </div>
          )}
          {loading && (
            <div
              style={{
                position: 'absolute',
                right: '50%',
                top: '50%',
                bottom: '50%',
                left: '50%',
              }}
            >
              <Spin />{' '}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
