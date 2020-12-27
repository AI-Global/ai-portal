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
} from '../ant';
import { useAppEnv } from '../env';
import { FilterTwoTone } from '@ant-design/icons';
import OrganizationCard from './OrganizationCard';

export default function ListAndFilterOrganizations({ orgTypes, query }) {
  let { api } = useAppEnv();
  let [orgs, setOrgs] = useState(null);
  let [filterVals, setFilterVals] = useState({});
  useEffect(() => {
    api
      .get('/api/organizations', { query: query, ...filterVals })
      .then((orgs) => setOrgs(orgs));
  }, [query, api, filterVals]);
  let updateFilters = (newFilters) => {
    setFilterVals({ ...filterVals, ...newFilters });
  };
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
          </Menu>
        </Sider>
      </Affix>
      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content>
          {orgs != null && (
            <Space direction="vertical" style={{ width: '100%' }}>
              {orgs.map((org) => (
                <OrganizationCard key={org._id} organization={org} />
              ))}
            </Space>
          )}
          {orgs == null && <Spin />}
        </Content>
      </Layout>
    </Layout>
  );
}
