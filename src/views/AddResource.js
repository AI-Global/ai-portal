import React, { useRef } from 'react';
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
} from '../ant';
import Footer from '../components/Footer';
import FormQuestion from '../components/FormQuestion';
import { useAppEnv } from './../env';

import {
  QUESTIONS_CORE1,
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
let steps = [
  {
    title: 'Core 1',
    content: QUESTIONS_CORE1,
  },
];

function AddResource() {
  let { api } = useAppEnv();
  let topRef = useRef(null);
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(0);
  const updatePages = () => {
    if (current === 0) {
      let data = form.getFieldValue();
      //if owner, add core2 Pages
      if (data['isOwner'] === 'Yes' && !steps.includes(core2Page)) {
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
      if (data['isOwner'] === 'No' && steps.includes(core2Page)) {
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
    console.log(formVal);
    // TODO: need to deal with adding an organization (create schema)
    //TODO:if it's not model and dataset (or an owner uploading), those fields will be blank
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
      technical: formVal.desc, //TODO: HOW TO DECIDE THAT?
      trustIndexCategories: formVal.trust_index,
      fundedBy: formVal.fundedBy,
      creator: formVal.creators,
      dataDictLink: formVal.dataDictLink,
      sensitiveData: formVal.sensitiveData,
      qualityReview: formVal.qualityReview,
      ethicsReview: formVal.ethicsReview,
      usage: formVal.purpose,
      isConfidential: formVal.isConfidential,
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
        isSample: formVal.sample,
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
    });
    // if (result.errors) {
    //   for (let msg of result.errors) {
    //     notification['error']({
    //       message: msg.msg,
    //     });
    //   }
    //   return;
    // }
    // message.success('Form successfully submitted');

    // history.push('/resources');
  };

  //next page
  const next = (formVal) => {
    updatePages();
    console.log(JSON.stringify(form.getFieldValue()));
    if (current === steps.length - 1) {
      message.success('Form completed!');
      console.log('answers are ', JSON.stringify(form.getFieldValue()));
      window.gtag('event', 'resource_form_submit', {
        event_category: 'upload_resource',
      });
      submit(formVal);
    } else {
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
                Thank you for starting to upload a resource! In order to ensure
                we follow best practices from{' '}
                <a href="https://datanutrition.org/">
                  The Data Nutrition Project
                </a>
                , and help build a more responsible tech future, we have a few
                questions about your resource to finalize the process. Your
                resource will be checked by an AI Global team member and
                approved based on your responses.{' '}
              </p>
            </div>
            <Steps current={current} style={{ width: '60%', padding: '26px' }}>
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
        </Row>
      </Content>
      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
    </Layout>
  );
}

export default AddResource;
