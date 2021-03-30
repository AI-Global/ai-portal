import React from 'react';
import { Layout, Row, Content, Col } from '../ant';
import Footer from '../components/Footer';
import { BackTop, Tabs } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import NavBar from '../components/NavBar';

const { TabPane } = Tabs;

function Topics({ topic }) {
  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
        <BackTop>
          <UpCircleOutlined style={{ fontSize: '3em', color: '#1890ff' }} />
        </BackTop>
        <Row
          justify="center"
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <Col span={15}>
            <h1 style={{ fontSize: '4em', fontWeight: 'bold' }}>
              [INSERT TOPIC NAME]
            </h1>
            <p
              style={{
                marginBottom: '20px',
                fontSize: '1.4em',
                textAlign: 'start',
              }}
            >
              The Responsible AI Community Portal is a{' '}
              <strong>
                selected repository of reports, standards, models, government
                policies, datasets, and open-source software
              </strong>{' '}
              designed to support Responsible AI development. If you'd like to
              learn more, watch the demo below or explore our .
            </p>
            <p
              style={{
                marginBottom: '15px',
                fontSize: '1.4em',
                textAlign: 'start',
              }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </Col>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <Col span={15}>
            <Tabs defaultActiveKey="updates">
              <TabPane
                tab={<p style={{ margin: '0', fontSize: '1.2em' }}>Updates</p>}
                key="updates"
              >
                <p
                  style={{
                    marginBottom: '15px',
                    fontSize: '1.4em',
                    textAlign: 'start',
                  }}
                >
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </TabPane>
              <TabPane
                tab={<p style={{ margin: '0', fontSize: '1.2em' }}>Data</p>}
                key="data"
              >
                <p
                  style={{
                    marginBottom: '15px',
                    fontSize: '1.4em',
                    textAlign: 'start',
                  }}
                >
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful of model sentence structures, to
                  generate Lorem Ipsum which looks reasonable. The generated
                  Lorem Ipsum is therefore always free from repetition, injected
                  humour, or non-characteristic words etc.
                </p>
              </TabPane>
              <TabPane
                tab={<p style={{ margin: '0', fontSize: '1.2em' }}>Apps</p>}
                key="apps"
              >
                <p
                  style={{
                    marginBottom: '15px',
                    fontSize: '1.4em',
                    textAlign: 'start',
                  }}
                >
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32.
                </p>
              </TabPane>
              <TabPane
                tab={
                  <p style={{ margin: '0', fontSize: '1.2em' }}>Developer</p>
                }
                key="dev"
              >
                <p
                  style={{
                    marginBottom: '15px',
                    fontSize: '1.4em',
                    textAlign: 'start',
                  }}
                >
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?"
                </p>
              </TabPane>
              <TabPane
                tab={
                  <p style={{ margin: '0', fontSize: '1.2em' }}>
                    Contact Agriculture
                  </p>
                }
                key="contact"
              >
                <p
                  style={{
                    marginBottom: '15px',
                    fontSize: '1.4em',
                    textAlign: 'start',
                  }}
                >
                  "But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally
                  encounter consequences that are extremely painful. Nor again
                  is there anyone who loves or pursues or desires to obtain pain
                  of itself, because it is pain, but because occasionally
                  circumstances occur in which toil and pain can procure him
                  some great pleasure. To take a trivial example, which of us
                  ever undertakes laborious physical exercise, except to obtain
                  some advantage from it? But who has any right to find fault
                  with a man who chooses to enjoy a pleasure that has no
                  annoying consequences, or one who avoids a pain that produces
                  no resultant pleasure?"
                </p>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
}

export default Topics;