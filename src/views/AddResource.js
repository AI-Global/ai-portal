import React, { useState, useEffect } from 'react';
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
import Paragraph from 'antd/lib/skeleton/Paragraph';
const { Step } = Steps;
const { Title } = Typography;

const example = {
  name: 'Where in the Word is AI? Map',
  desc:
    'An interactive web visualization and dataset with 300+ helpful and harmful AI cases worldwide',
  formats: ['Education Tool', 'Dataset'],
  topics: [
    'Banking',
    'Health',
    'Insurance',
    'Labor',
    'Retail',
    'Education',
    'Law Enforcement',
    'Media',
  ],
  organization: ['AI Global'],
  org_types: ['Civil Society'],
  trust_index: ['Explainbility & Interpretability'],
  paths: ['Policymaker Path', 'Risk Manager Path', 'Explorer Path'],
  ai_system_type: 'OECD',
  url: 'https://map.ai-global.org/',
  creation_date: '03/01/2020',
  modified_data: '11/15/2020',
  keywords: ['Data Visualization', 'Helpful AI', 'Harmful AI'],
  version: 2.0,
  update_frequency: 'Weekly',
  license: 'Creative Commons (CC BY 4.0)',
  purpse:
    'Where in the World is AI? Map highlights helpful and harmful AI cases worldwide to start discussions around responsible AI',
};

let questions_core1 = [
  {
    string: 'Do you own this resource (Yes/No)?',
    val: 'isOwner',
    type: 'select',
    options: ['Yes', 'No'],
    required: true,
    tip: '',
    example_ans: '',
  },
  {
    string: 'Resource Title',
    val: 'name',
    type: 'type',
    options: null,
    required: true,
    tips: '',
    example_ans: example.name,
  },
  {
    string: 'Resource Description',
    val: 'desc',
    type: 'text-area',
    options: null,
    required: true,
    tip: 'A short summary sentence of the resource',
    example_ans: example.desc,
  },
  {
    string: 'Format(s)',
    val: 'formats',
    type: 'multiple',
    options: [
      'Algorithm',
      'API',
      'Assessment',
      'Benchmark',
      'Datasets',
      'Design Tool',
      'Education Tool',
      'Framework',
      'Inspection',
      'Library',
      'Machine Learning Tool',
      'Podcast',
      'Principles',
      'Research',
      'Software',
      'Strategy & Implementation',
      'Toolkit',
      'Vision Tool',
      'Working Groups',
      'Workshops',
      'Other',
    ],
    required: true,
    tip:
      'Select any tags that are relevant. If we are missing a tag, please let us know.',
    example_ans: example.formats,
  },
  {
    string: 'Topic of Resource (Ex: Health Services, Law Enforcement)',
    val: 'topics',
    type: 'multiple',
    options: [
      'Banking',
      'Health',
      'Insurance',
      'Labor',
      'Retail',
      'Education',
      'Law Enforcement',
      'Media',
      'Other',
    ],
    required: true,
    tip: 'Select any topics that are relevant',
    example_ans: example.topics,
  },
  {
    string: 'Which organization(s) is the resource from?',
    val: 'organizations',
    type: 'tags',
    options: ['Org A', 'Org B', 'Org C'],
    required: true,
    tip: 'Please avoid any abbreviations or acronyms',
    example_ans: example.organization,
  },
  {
    string: 'What type(s) of organization(s) (Ex: Industry, Academia)',
    val: 'org_types',
    type: 'multiple',
    options: [
      'Industry',
      'Academia',
      'Government',
      'Civil Society',
      'International Organization',
      'Other',
    ],
    required: true,
    tip:
      'If you are unsure of what the organization type is, select civil society',
    example_ans: example.org_types,
  },
  {
    string: 'Responsible AI Trust Index',
    val: 'trust-index',
    type: 'multiple',
    options: [
      'Explainability & Interpretability',
      'Data Quality',
      'Bias & Fairness',
      'Accountability',
      'Robustness',
      'Other',
    ],
    required: true,
    tip: 'Learn more about our Trust Index Values [here](NEED LINK)',
    example_ans: example.trust_index,
  },
  {
    string: 'Who is your resource intended for?',
    val: 'paths',
    type: 'multiple',
    options: [
      'Designer Path',
      'Developer Path',
      'Policymaker Path',
      'Risk Manager Path',
      'Explorer Path',
      'Other',
    ],
    required: true,
    tip: '',
    example_ans: example.paths,
  },
  {
    string: 'Which AI System type does the resource align with?',
    val: 'ai-system-type',
    type: 'multiple',
    options: [
      'Intelligent Process Automation',
      'Image and Object Recognition',
      'Text and Speech Analysis',
      'Advanced Data Analytics',
      'NLP/ Content Generation',
      'Other',
    ],
    required: true,
    tip: 'AI System type values are defined by OECD.',
    example_ans: example.ai_system_type,
  },
  {
    //TODO: make new question type for this one
    string: 'Where can we access the resource?',
    val: 'resources',
    type: 'type',
    options: null,
    required: true,
    tip: 'Please add a url or upload any files via Google Drive url.',
    example_ans: example.url,
  },
  {
    string: 'When was the resource created?',
    val: 'creationDate',
    type: 'date',
    options: null,
    required: true,
    tip: '',
    example_ans: '',
  },
  {
    string: 'If applicable, when was the resource modified?',
    val: 'modifiedDate',
    type: 'date',
    options: null,
    required: false,
    tip: 'If resource was not modified, enter resource created',
    example_ans: '',
  },
  {
    string: 'What version is the resource?',
    val: 'version',
    type: 'type',
    options: null,
    required: false,
    tip: 'Please list any version numbers of indicators',
    example_ans: example.version,
  },
  {
    string: 'How often is this resource updated?',
    val: 'updateFrequency',
    type: 'select',
    options: ['Weekly', 'Monthly', 'Annually'],
    required: false,
    tip: 'Maintenance/Update Frequency',
    example_ans: example.update_frequency,
  },
  {
    string: 'If applicable, are there any licenses to this resource?',
    val: 'licenseName',
    type: 'type',
    options: null,
    required: false,
    tip: 'List any licenses or acknowledgements to the resource',
    example_ans: example.license,
  },
  {
    string: 'Select up to 5 keywords for the resource',
    val: 'keywords',
    type: 'tags',
    options: [],
    required: true,
    tip: '',
    example_ans: example.keywords,
  },

  // {
  //   string: ,
  //   val: ,
  //   type: ,
  //   options: ,
  //   required: ,
  //   tip: ,
  //   example_ans:
  // }
];

let questions_core2 = [
  {
    string: 'What is the purpose of the resource?',
    val: 'purpose',
    type: 'text-area',
    options: null,
    required: false,
    tip: 'A short sentence about the purpose of the resource',
    example_ans: example.purpose,
  },
];

let steps = [
  {
    title: 'Core 1',
    content: questions_core1,
  },
  {
    title: 'Core 2',
    content: questions_core2,
  },
  // {
  //   title: 'Last',
  //   content: 'Last-content',
  // },
];
let data = {
  0: {},
  1: {},
  2: {},
};

function AddResource2() {
  const [form] = Form.useForm();
  // console.log(JSON.stringify(form.getFieldsValue()));
  const [current, setCurrent] = React.useState(0);

  const next = (values) => {
    console.log('inside next');
    data[current] = form.getFieldsValue();
    console.log('updated data', JSON.stringify(data));
    if (current === steps.length - 1) {
      message.success('Processing complete!');
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = (values) => {
    setCurrent(current - 1);
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
            span={22}
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
            <p>
              Thank you for starting to upload a resource! In order to ensure we
              follow best practices from{' '}
              <a href="https://datanutrition.org/">
                The Data Nutrition Project
              </a>
              , and help build a more responsible tech future, we have a few
              questions about your resource to finalize the process. Your
              resource will be checked by an AI Global team member and approved
              based on your responses.{' '}
            </p>
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>

            <Form
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 11 }}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={next}
              form={form}
              // onFinishFailed={onFail}
              style={{ minWidth: '1000px', overflow: 'auto' }}
            >
              <p>
                Not sure about some of these questions? Fill out our
                <a href="/feedback"> suggestion form </a>
                to suggest a resource or work with us to answer these fields.
                #TODO LINK
              </p>
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
