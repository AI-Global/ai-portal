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
  Row,
  Col,
} from '../ant';
import DiscussionCard from './DiscussionCard';
import CreateDiscussionPostModal from './../components/CreateDiscussionPostModal';
import { useAppEnv } from '../env';
import { FilterTwoTone, RedoOutlined } from '@ant-design/icons';

export default function ListAndFilterDiscussionForums({
  orgTypes,
  resourceTypes,
  fileTypes,
  resourcePath,
  query,
  filterVals,
  updateSearch,
}) {
  let { api, user } = useAppEnv();
  let { enums } = useAppEnv();
  let [discussionPosts, setDiscussionPosts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [topics, setTopics] = useState([]);
  let [showModal, setShowModal] = useState(false);
  let updateFilters = newFilters => {
    updateSearch(query, { ...filterVals, ...newFilters });
  };
  useEffect(() => {
    api.get('/api/topics').then(topics => setTopics(topics));
  }, [api]);
  useEffect(() => {
    setLoading(true);
    api
      .get('/api/discussionposts', {
        query: query,
        approved: true,
        ...filterVals,
      })
      .then(discussionPosts => {
        setDiscussionPosts(discussionPosts);
        setLoading(false);
      });
  }, [query, filterVals, api]);

  let isUserSignedIn = user != null;

  return (
    <Layout>
      <CreateDiscussionPostModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
      />
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
              onChange={e => updateFilters({ type: e })}
              placeholder="Topics"
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
              style={{ width: '100%', padding: '5px 10px' }}
              showArrow={true}
              allowClear={true}
            >
              <Select.Option value="byCreationDateAsc">
                Date Created (Ascending)
              </Select.Option>
              <Select.Option value="byCreationDateDesc">
                Date Created (Descending)
              </Select.Option>
              <Select.Option value="byUpdatedDateAsc">
                Date Updated (Ascending)
              </Select.Option>
              <Select.Option value="byUpdatedDateDesc">
                Date Updated (Descending)
              </Select.Option>
              <Select.Option value="byNameAsc">Name (Ascending)</Select.Option>
              <Select.Option value="byNameDesc">
                Name (Descending)
              </Select.Option>
              <Select.Option value="byUpvotesAsc">
                Upvotes (Ascending)
              </Select.Option>
              <Select.Option value="byUpvotesDesc">
                Upvotes (Descending)
              </Select.Option>
            </Select>
            <Menu.Item disbled selectable={false}>
              <Button href="/discussion">
                Reset Filters <RedoOutlined style={{ marginRight: '0' }} />
              </Button>
            </Menu.Item>
          </Menu>
        </Sider>
      </Affix>

      <Layout style={{ padding: '24px 24px 24px' }}>
        <Content style={{ minHeight: '750px' }}>
          {isUserSignedIn && (
            <Button type="primary" onClick={() => setShowModal(prev => !prev)}>
              Create New Post
            </Button>
          )}
          {!loading && (
            <Space direction="vertical" style={{ width: '100%' }}>
              {discussionPosts.map(res => (
                <DiscussionCard key={res._id} discussion={res} />
              ))}
            </Space>
          )}
          {!loading && discussionPosts.length === 0 && (
            <div>
              <h3 style={{ marginTop: '5px' }}>
                Your search did not match any discussion forums. Try a different
                search or use the filters.
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
