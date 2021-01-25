import React, { useRef, useState, useEffect } from 'react';
import {
  Layout,
  Content,
  Button,
  Form,
  Col,
  Typography,
  Row,
  Steps,
  message,
  Header,
  Affix,
  Breadcrumb,
  Menu,
  notification,
  Spin,
} from '../ant';
import Footer from '../components/Footer';
import FormQuestion from '../components/FormQuestion';
import { useAppEnv } from './../env';
import { useHistory } from 'react-router';

import {
  getQuestionsCore1,
  QUESTIONS_CORE2,
  QUESTIONS_DATASET,
  QUESTIONS_MODEL,
} from '../components/ResourceQuestions';
const { Step } = Steps;
const { Title } = Typography;

let core2Page = {
  title: 'Core 2',
  content: QUESTIONS_CORE2,
};

let datasetPage = {
  title: 'Dataset',
  content: QUESTIONS_DATASET,
};

let modelPage = {
  title: 'Model',
  content: QUESTIONS_MODEL,
};

let steps = [];
function AddResource() {
  let { api, enums } = useAppEnv();
  let history = useHistory();
  let [topics, setTopics] = useState([]);
  let [orgs, setOrgs] = useState([]);
  let [loading, setLoading] = useState(true);
  console.log('num pages', steps.length);
  console.log('loading', loading);
  useEffect(() => {
    setLoading(true);
    api.get('/api/topics').then((topics) => {
      setTopics(topics);
      api.get('/api/organizations').then((orgs) => {
        setOrgs(orgs);
        steps.push({
          title: 'Core 1',
          content: getQuestionsCore1(topics, orgs),
        });
        setLoading(false);
      });
    });
  }, [api]);

  let topRef = useRef(null);
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(0);
  const updatePages = () => {
    if (current === 0) {
      let data = form.getFieldValue();
      //if owner, add core2 Pages
      if (data['isOwner'] && !steps.includes(core2Page)) {
        steps.splice(1, 0, core2Page);
      }
      //add model and dataset pages if applicable
      if (data['formats'].includes('Dataset') && !steps.includes(datasetPage)) {
        steps.push(datasetPage);
      }
      //Q: what field to check for model?
      if (data['formats'].includes('Algorithm') && !steps.includes(modelPage)) {
        steps.push(modelPage);
      }
      //remove core2, model, or dataset pages if answers has changed
      if (!data['isOwner'] && steps.includes(core2Page)) {
        steps = steps.filter((value) => value !== core2Page);
      }
      if (!data['formats'].includes('Dataset') && steps.includes(datasetPage)) {
        steps = steps.filter((value) => value !== datasetPage);
      }
      if (!data['formats'].includes('Algorithm') && steps.includes(modelPage)) {
        steps = steps.filter((value) => value !== modelPage);
      }
    }

    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  let submit = async (formVal) => {
    console.log('form answers', JSON.stringify(formVal));
    // TODO: need to deal with adding an organization (create schema)
    //TODO:if it's not model and dataset (or an owner uploading), those fields will be blank
    console.log('sample', formVal.sample);
    console.log('issample', formVal.sample === undefined);

    var isTechnical =
      formVal.formats.includes('Algorithm') ||
      formVal.formats.includes('API') ||
      formVal.formats.includes('Framework') ||
      formVal.formats.includes('Framework') ||
      formVal.formats.includes('Library') ||
      formVal.formats.includes('Software');

    let result = await api.post('/api/resources', {
      name: formVal.name,
      desc: formVal.desc,
      type: formVal.formats,
      path: formVal.paths,
      keywords: formVal.keywords,
      creationDate: formVal.creationDate,
      modifiedDate: formVal.modifiedDate,
      licenseName: formVal.licenseName,
      downloadURL: formVal.url,
      technical: isTechnical, //TODO: HOW TO DECIDE THAT?
      trustIndexCategories: formVal.trust_index,
      fundedBy: formVal.fundedBy,
      creator: formVal.creators,
      dataDictLink: formVal.dataDictLink,
      sensitiveData: formVal.sensitiveData,
      qualityReview: formVal.qualityReview,
      ethicsReview: formVal.ethicsReview,
      usage: formVal.purpose,
      isConfidential:
        formVal.isConfidential == true || formVal.isConfidential == false
          ? formVal.isConfidential
          : false,
      offensiveContent: formVal.offensiveContent,
      numInstances: formVal.numInstances,
      label: formVal.labels,
      rawData: formVal.rawData,
      personalInfoRemoved: formVal.personalInfoRemoved,
      privacyProcedure: formVal.privacyProcedure,
      individualsIdentified: formVal.individualsIdentified,
      noiseDescription: formVal.noiseDescription,
      externalRestrictions: formVal.externalRestrictions,
      aiSystemTypes: formVal.aiSystemType,
      version: formVal.version,
      updateFrequency: formVal.updateFrequency,
      unintendedUse: formVal.unrelatedTasks,
      ownerEmail: formVal.contactEmail,
      location: formVal.location,
      missingInfo: formVal.missingInfo,
      audience: formVal.intendedAudience,
      removalRequest: formVal.removalRequest,
      dataset: {
        collectorOwnerRelation: formVal.dataCollectorOwnerRelation,
        collectionProcess: formVal.dataCollection,
        infoCollected: formVal.infoCollected,
        accessPermissions: formVal.externalRestrictions,
        tasks: formVal.datasetTasks,
        populationDemographics: formVal.datasetDemographics,
        consentProcedures: formVal.individualsConsent,
        fieldsRelationship: formVal.fieldsRelationship,
        instanceRepresentation: formVal.instances,
        multipleInstanceTypes: formVal.multipleInstanceTypes,
        completeness: formVal.completeness,
        isSample:
          formVal.sample === '' || formVal.sample === undefined
            ? false
            : formVal.sample,
        sampleStrategy: formVal.sampleStrategy,
        populationDataSource: formVal.populationDataSource,
        sampleCoverage: formVal.representLargetSet,
        recommendedSplit: formVal.recommendedSplit,
        carefulHandling: formVal.handledCarefully,
        accurateUserRepresentation: formVal.accurateRepresentation,
        rawOrProcessed: formVal.rawOrProcessed,
        driftProtection: formVal.dataDrift,
        reusedOrReinterpreted: formVal.dataReuse,
        lifeCycleState: formVal.lifeCycleState,
        selfContainmen: formVal.dataContainment,
        stabilityOverTime: formVal.dataConsistent,
        archivalVersions: formVal.archivalVersions,
        externalResourcesRestrictions: formVal.restrictions,
      },
      model: {
        modelType: formVal.modelType,
        inputs: formVal.modelInputs,
        outputs: formVal.modelOutputs,
        limitations: formVal.modelTradeOffs,
        hyperparameters: formVal.hyperparameters,
        architecture: formVal.modelArchitecture,
        taskType: formVal.modelTask,
        learningType: formVal.learningType,

        numParameters: formVal.numParameters,
        attributes: formVal.modelAttributes,
        framework: formVal.framework,
        libraryDependencies: formVal.modelDependencies,
        hardware: formVal.hardwareRequirements,
        otherPretrainedModels: formVal.pretrainModels,
        metrics: formVal.modelMetrics,
      },
      topics: formVal.topics,
      organizations: formVal.organizations,
    });

    if (result.errors) {
      for (let msg of result.errors) {
        console.log(msg.msg);
        notification['error']({
          message: msg.msg,
        });
      }
      return;
    } else {
      message.success('Form successfully submitted');
    }
    history.push('/resources');
  };

  //next page
  const next = (formVal) => {
    updatePages();
    if (current === steps.length - 1) {
      // window.gtag('event', 'resource_form_submit', {
      //   event_category: 'upload_resource',
      // });
      submit(form.getFieldValue());
    } else {
      console.log('next page', current + 1);
      console.log('num pages', steps.length);
      console.log('content', steps[current + 1], 'content');
      setCurrent(current + 1);
    }
  };

  //back page
  const prev = (values) => {
    updatePages();
    setCurrent(current - 1);
  };

  const breadcrumb_menu = (
    <Menu>
      <Menu.Item>
        <a href="/resources">Resources</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/organizations">Organizations</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/feedback">Suggestions</a>
      </Menu.Item>
      <Menu.Item></Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: `${window.innerHeight}px`, overflow: 'scroll' }}>
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
          <Breadcrumb
            style={{
              paddingTop: '40px',
            }}
          >
            <Breadcrumb.Item>
              <a href="/" style={{ fontSize: '16px' }}>
                Home
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={breadcrumb_menu}>
              <a href="/resources" style={{ fontSize: '16px' }}>
                Resources
              </a>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ fontSize: '16px' }}>
              Create
            </Breadcrumb.Item>
          </Breadcrumb>
        </Header>
      </Affix>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Row
          justify="center"
          style={{ marginTop: '4rem', marginBottom: '4rem' }}
        >
          {!loading && (
            <Col
              span={16}
              style={{
                textAlign: 'center',
                backgroundColor: '#fff',
                padding: '26px',
                minWidth: '1300px',
              }}
            >
              <div ref={topRef}>
                <Typography>
                  <Title style={{ minWidth: '500px' }}>Add a Resource</Title>
                </Typography>
                <p>
                  Thank you for starting to upload a resource! In order to
                  ensure we follow best practices from{' '}
                  <a href="https://datanutrition.org/">
                    The Data Nutrition Project
                  </a>
                  , and help build a more responsible tech future, we have a few
                  questions about your resource to finalize the process. Your
                  resource will be checked by an AI Global team member and
                  approved based on your responses.{' '}
                </p>
              </div>
              <Steps
                current={current}
                style={{ width: '60%', padding: '26px' }}
              >
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <Form
                labelCol={{ span: 15 }}
                wrapperCol={{ span: 11 }}
                name="basic"
                layout="vertical"
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
                </p>
                {steps.length > current &&
                  steps[current].content.map((question) => (
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
                        Submit
                      </Button>
                    </Form.Item>
                  )}
                  {current > 0 && (
                    <Form.Item>
                      <Button style={{ margin: '0 8px' }} onClick={prev}>
                        Previous
                      </Button>
                    </Form.Item>
                  )}
                </div>
              </Form>
            </Col>
          )}
          {loading && <Spin />}
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}

export default AddResource;
