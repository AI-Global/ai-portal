import React from 'react';
import {
  Layout,
  Content,
  Search,
  Row,
  Col,
  Card,
  Button,
  Tooltip,
  Space,
  Tag,
} from '../ant';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import LoginButton from '../components/LoginButton';

let TEMP_FRONTEND_ITEMS = [
  {
    name: 'AI Design Assistant',
    logoURL: '/demo/aiglobal.png',
    description:
      'A unified assessment to assure the responsible design, development and deployment of AI',
  },
  {
    name: 'Fawkes',
    logoURL: '/demo/fawkes-logo.png',
    description:
      'A software that gives individuals the ability to limit how their own images can be used to track them',
  },
  {
    name: 'The A-Z of AI',
    logoURL: '/demo/theazlogo.png',
    description: 'A nutrition label for datasets',
  },
];

let TEMP_TAGS = [
  {
    name: 'banking',
    color: '#42D3D4',
    type: 'topic',
  },
  {
    name: 'health',
    color: '#42D3D4',
    type: 'topic',
  },
  {
    name: 'designer',
    color: '#097AE8',
    type: 'path',
  },
  {
    name: 'developer',
    color: '#097AE8',
    type: 'path',
  },
  {
    name: 'algorithm',
    color: '#00CDFF',
    type: 'type',
  },
  {
    name: 'library',
    color: '#00CDFF',
    type: 'type',
  },
];

function Landing() {
  let history = useHistory();
  let [query, setQuery] = React.useState('');
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <a href="/" style={{ position: 'fixed' }}>
        <img alt="logo" src="/logo.png" width={'160px'} />
      </a>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <LoginButton />
      </div>
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem' }}>Responsible AI Resource Search</h1>
            <Tooltip
              placement="bottom"
              title="Search for relevant resources here"
            >
              <Search
                placeholder="Responsible AI Design Assistant"
                enterButton
                size="large"
                onChange={(e) => setQuery(e.target.value)}
                onSearch={() => history.push('/resources?q=' + query)}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Space>
              {TEMP_TAGS.map((tag) => (
                <Tooltip
                  placement="bottom"
                  title={
                    <p
                      style={{ textTransform: 'capitalize', marginBottom: '0' }}
                    >
                      Search by {tag.type}
                    </p>
                  }
                >
                  <Tag
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1em',
                      padding: '5px',
                    }}
                    color={tag.color}
                    key={tag.name}
                  >
                    <a href="/">{tag.name.toUpperCase()}</a>
                  </Tag>
                </Tooltip>
              ))}
            </Space>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '2rem' }} gutter={[24, 16]}>
          {TEMP_FRONTEND_ITEMS.map((feat) => (
            <Col span={4}>
              <FeatureCard feature={feat} />
            </Col>
          ))}
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
}

function FeatureCard({ feature }) {
  return (
    <Card
      onClick={() => (window.location = 'https://google.com')}
      hoverable
      style={{
        height: '100%',
        margin: 'auto',
      }}
      cover={
        <img
          alt="alt"
          src={feature.logoURL}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      }
    >
      <Card.Meta title={feature.name} description={feature.description} />
    </Card>
  );
}

export default Landing;
