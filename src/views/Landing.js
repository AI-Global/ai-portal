import React from 'react';
import { Layout, Content, Search, Row, Col, Card } from '../ant';
import LoginButton from '../components/LoginButton';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { useHistory } from 'react-router';

let TEMP_FRONTEND_ITEMS = [
  { name: 'AI Design Assistant', logoURL: '/demo/aiglobal.png' },
  { name: 'Fawkes', logoURL: '/demo/fawkes.png' },
  { name: 'The A-Z of AI', logoURL: '/demo/theazlogo.png' },
];

function Landing() {
  let history = useHistory();
  let [query, setQuery] = React.useState('');
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Logo />
      <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
        <LoginButton />
      </div>
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '4rem' }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem' }}>Responsible AI Resource Search</h1>
            <Search
              placeholder="Search for Resources"
              enterButton
              size="large"
              onChange={(e) => setQuery(e.target.value)}
              onSearch={() => history.push('/datasets?q=' + query)}
            />
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
      style={{ width: '100%' }}
      cover={<img height={'200px'} alt="alt" src={feature.logoURL} />}
    >
      <Card.Meta
        title={feature.name}
        description="See how tech startup is dealing with bias."
      />
    </Card>
  );
}

export default Landing;
