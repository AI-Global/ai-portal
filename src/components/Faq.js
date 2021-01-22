import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;

function FAQ() {
  return (
    <Collapse accordion defaultActiveKey={['1']} bordered={false}>
      <Panel
        header={
          <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
            What is the Responsible AI Community Portal?
          </p>
        }
        key="1"
        style={{ textAlign: 'start' }}
      >
        <p style={{ marginLeft: '25px' }}>
          The Responsible AI Community Portal is an evolving repository of
          reports, standards, models, government policies, datasets, and
          open-source software to inform and support responsible AI development.
          These resources are collected and classified by AI Global.
        </p>
      </Panel>
      <Panel
        header={
          <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
            What is the purpose of this tool?
          </p>
        }
        key="2"
        style={{ textAlign: 'start' }}
      >
        <p style={{ marginLeft: '25px' }}>
          Resources are often scattered on different platforms and can be
          difficult to access.The purpose of this portal is to allow easy and
          quick access to 300+ resources that bring awareness to ethical AI
          issues and how to mitigate harm of technology.
        </p>
      </Panel>
      <Panel
        header={
          <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
            What can I do on this platform?
          </p>
        }
        key="3"
        style={{ textAlign: 'start' }}
      >
        <p style={{ marginLeft: '25px' }}>
          It has a recommendation tool with resources classified by AI Global.
          Anyone is able to search terms or filter by type of resource and be
          directed to relevant resources. Users with an account can upload their
          own or others resources to share with our community{' '}
          <a href="/resources/create">here</a>.
        </p>
      </Panel>
      <Panel
        header={
          <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
            Why is AI Global releasing this tool?
          </p>
        }
        key="4"
        style={{ textAlign: 'start' }}
      >
        <p style={{ marginLeft: '25px' }}>
          This is part of AI Global’s initiative to mitigate harm and unintended
          consequences of technology by building practical tools to support the
          responsible development of AI systems for individuals and teams.
        </p>
      </Panel>
      <Panel
        header={
          <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
            Who is the intended audience of this tool?
          </p>
        }
        key="5"
        style={{ textAlign: 'start' }}
      >
        <p style={{ marginLeft: '25px' }}>
          Our primary audience is the community working on the development of
          AI. This includes developers, product designers, researchers, business
          owners, policymakers, and risk managers. Part of our objective is to
          get these roles to work more harmoniously by bringing their different
          perspectives forward.
        </p>
      </Panel>
      <Panel
        header={
          <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
            Who is responsible for maintaining the resources?
          </p>
        }
        key="6"
        style={{ textAlign: 'start' }}
      >
        <p style={{ marginLeft: '25px' }}>
          AI Global members will continue to add and approve resources. Owners
          of a resource and admins will be able to edit information about a
          resource.
        </p>
      </Panel>
    </Collapse>
  );
}

export default FAQ;
