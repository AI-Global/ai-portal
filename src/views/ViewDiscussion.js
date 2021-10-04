import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import {
  Layout,
  Content,
  Descriptions,
  Button,
  PageHeader,
  Collapse,
  Table,
  Tag,
  Spin,
  notification,
} from '../ant';
import {
  FileDoneOutlined,
  SearchOutlined,
  EditOutlined,
  FolderOpenOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import FormHeader from '../components/FormHeader';
import Sidebar from '../components/Sidebar';
import Pin from '../components/Pin';
import { useParams } from 'react-router-dom';
import { useAppEnv } from './../env';
import ManageResourceModal from './../components/ManageResourceModal';
import Comments from '../components/Comments';

const { Panel } = Collapse;

const getFormattedDate = date => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date
      .getDate()
      .toString()
      .padStart(2, '0');

  return month + '/' + day + '/' + year;
};

export default function ViewDiscussion() {
  let [discussion, setDiscussion] = useState(null);
  let [loading, setLoading] = useState(true);
  let [showModal, setShowModal] = useState(false);
  let [pinned, setPinned] = useState(false);
  let { api, user } = useAppEnv();
  let { disId } = useParams();
  let fetchDiscussion = useCallback(async () => {
    let discussion = await api.get('/api/discussionposts/' + disId);
    setDiscussion(discussion);
    setLoading(false);
  }, [api, disId]);
  useEffect(() => {
    fetchDiscussion();
  }, [api, disId, user, fetchDiscussion]);
  useLayoutEffect(() => {
    setPinned(user?.pinnedResources.includes(disId));
  }, [api, user, disId])
  let topRef = useRef(null);
  let detailRef = useRef(null);
  let commentRef = useRef(null);
  let canEdit =
    discussion?.user?._id === user?._id || ['mod', 'admin'].includes(user?.role);

  let isUserSignedIn = user == null ? 0 : 1
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large"></Spin>
      </div>
    );
  }
  else{
    
  return(
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'hidden' }}>
        <FormHeader />
        <Layout>
        <Sidebar
            headings={['Overview', 'Details', 'Comments']}
            icons={[
              <FileDoneOutlined />,
              <SearchOutlined />,
              <CommentOutlined />,
            ]}
            refs={[topRef, detailRef, commentRef]}
          />
        <Content
          style={{
            padding: '24px 24px 24px',
          }}>
            <div ref={topRef}>
              <PageHeader
                title={discussion.header}
                onBack={() => window.history.back()}
                className="site-page-header"
                tags={discussion.type.map(t => {
                  return (
                    <Tag
                      color={'#00CDFF'}
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: '2px',
                      }}
                    >
                      {' '}
                      {t}
                    </Tag>
                  );
                })}
              >
                {discussion.text}
              </PageHeader>
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
                    <Descriptions.Item label="Role(s)">
                      {discussion.path.join(', ')}
                    </Descriptions.Item>
                    {discussion.timestamp && (
                      <Descriptions.Item label="Date Created">
                        {getFormattedDate(new Date(discussion.timestamp))}
                      </Descriptions.Item>
                    )}
                    {discussion.lastUpdated && (
                      <Descriptions.Item label="Date Updated">
                        {getFormattedDate(new Date(discussion.lastUpdated))}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Panel>
              </Collapse>
            </div>
            <div ref={commentRef}>
              <Comments
                data={discussion.comments}
                fetchResource={fetchDiscussion}
                isUserSignedIn={isUserSignedIn}
              />
            </div>
        </Content>
      </Layout>
    </Layout>
  );
  }
}
