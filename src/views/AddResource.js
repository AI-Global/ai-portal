import React, { useState } from 'react';
import {
  Layout,
  Content,
  Button,
  Input,
  Form,
  Col,
  Typography,
  DatePicker,
  Tooltip,
  Row,
  Steps,
  message,
} from '../ant';
import Footer from '../components/Footer';
import MultiSelectField from '../components/FormMultiSelectField';
import FormField from '../components/FormField';
import FormHeader from '../components/FormHeader';
import FormQuestion from '../components/FormQuestion';
const { Step } = Steps;
const { Title } = Typography;

let questions_core1 = [
  {
    val: 'Do you own this resource (Yes/No)?',
    question_type: 'multiselect',
    options: ['Yes', 'No'],
    required: true,
    tooltip: '',
    example_val: '',
  },
];

let steps = [
  {
    title: 'Core 1',
    content: questions_core1,
  },
  // {
  //   title: 'Core 2',
  //   content: 'Second-content',
  // },
  // {
  //   title: 'Last',
  //   content: 'Last-content',
  // },
];

function AddResource2() {
  const [current, setCurrent] = React.useState(0);

  const next = (values) => {
    console.log('form submitted', JSON.stringify(values));
    setCurrent(current + 1);
    steps.push({ title: 'Models', content: 'pls work' });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = (values) => {
    message.success('Processing complete!');
  };

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'scroll' }}>
      <FormHeader />
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Row
          justify="center"
          style={{ marginTop: '4rem', marginBottom: '4rem' }}
        >
          <Col
            span={12}
            style={{
              textAlign: 'center',
              backgroundColor: '#fff',
              padding: '26px',
              minWidth: '1300px',
            }}
          >
            <Typography>
              <Title style={{ minWidth: '500px' }}>Add a Resource</Title>
            </Typography>
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>

            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 10 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={done}
              // onFinishFailed={onFail}
              style={{ minWidth: '1000px', overflow: 'auto' }}
            >
              {steps[current].content.map((question) => (
                <FormQuestion question={question} />
              ))}

              <div style={{ marginTop: '100px' }}>
                {current < steps.length - 1 && (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>
                  </Form.Item>
                )}
                {current === steps.length - 1 && (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Done
                    </Button>
                  </Form.Item>
                )}
                {current > 0 && (
                  <Form.Item>
                    <Button style={{ margin: '0 8px' }} htmlType="submit">
                      Previous
                    </Button>
                  </Form.Item>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
    // <>
  );
}

export default AddResource2;
