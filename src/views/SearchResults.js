import React from 'react';
import { Layout, Menu, Header, Search, Affix } from '../ant';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';
import { queryParamsFromProps } from '../util';
import { useAppEnv } from '../env';
import { useHistory } from 'react-router';
import ListAndFilterResources from './../components/ListAndFilterResources';
import ListAndFilterOrganizations from './../components/ListAndFilterOrganizations';

export default function SearchResults(props) {
  let { enums } = useAppEnv();
  let history = useHistory();
  let fileTypes = enums ? enums.FILE_TYPES : [];
  let orgTypes = enums ? enums.ORG_TYPES : [];
  let resourceTypes = enums ? enums.RESOURCE_TYPES : [];
  let resourcePath = enums ? enums.RESOURCE_PATHS : [];
  let { q } = queryParamsFromProps(props);
  let View = history.location.pathname.includes('/resources')
    ? ListAndFilterResources
    : ListAndFilterOrganizations;
  let search = history.location.search;
  return (
    <Layout>
      <Affix offsetTop={0}>
        <Header style={{ backgroundColor: '#fff', paddingLeft: '0' }}>
          <a href="/">
            <img
              alt="logo"
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
            <Menu.Item
              key="resources"
              onClick={() => history.push('/resources' + search)}
            >
              Resources
            </Menu.Item>
            <Menu.Item
              key="organizations"
              onClick={() => history.push('/organizations' + search)}
            >
              Organizations
            </Menu.Item>
            <Menu.Item
              key="upload"
              onClick={() => history.push('/resources/create')}
            >
              Upload
            </Menu.Item>
            <Menu.Item key="feedback" onClick={() => history.push('/feedback')}>
              Feedback
            </Menu.Item>
          </Menu>
          <div style={{ position: 'absolute', top: '0px', right: '20px' }}>
            <LoginButton />
          </div>
        </Header>
      </Affix>
      <View
        orgTypes={orgTypes}
        resourceTypes={resourceTypes}
        fileTypes={fileTypes}
        resourcePath={resourcePath}
        location={props.location}
        query={q}
      />
      <Footer />
    </Layout>
  );
}
