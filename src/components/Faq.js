import React from 'react';
import {
  QuestionCircleOutlined,
  DiffOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Collapse } from 'antd';
const { Panel } = Collapse;

function FAQ({ abridged }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {!abridged && (
        <h1 style={{ fontWeight: 'bold' }}>
          <QuestionCircleOutlined style={{ fontSize: '0.9em' }} />
          &nbsp;General
        </h1>
      )}
      <div style={{ width: '100%' }}>
        <Collapse
          accordion
          defaultActiveKey={['1']}
          bordered={false}
          style={{ fontSize: '1.2em' }}
        >
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
              open-source software to inform and support responsible AI
              development. These resources are collected and classified by AI
              Global.
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
              difficult to access.The purpose of this portal is to allow easy
              and quick access to 300+ resources that bring awareness to ethical
              AI issues and how to mitigate harm of technology.
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
              It has a recommendation tool with resources classified by AI
              Global. Anyone is able to search terms or filter by type of
              resource and be directed to relevant resources. Users with an
              account can upload their own or others resources to share with our
              community <a href="/resources/create">here</a>.
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
              This is part of AI Global’s initiative to mitigate harm and
              unintended consequences of technology by building practical tools
              to support the responsible development of AI systems for
              individuals and teams.
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
              Our primary audience is the community working on the development
              of AI. This includes developers, product designers, researchers,
              business owners, policymakers, and risk managers. Part of our
              objective is to get these roles to work more harmoniously by
              bringing their different perspectives forward.
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
              AI Global members will continue to add and approve resources.
              Owners of a resource and admins will be able to edit information
              about a resource.
            </p>
          </Panel>
        </Collapse>
      </div>

      {!abridged && (
        <div style={{ marginTop: '4rem', width: '100%' }}>
          <h1 style={{ fontWeight: 'bold' }}>
            <DiffOutlined style={{ fontSize: '0.9em' }} />
            &nbsp;Viewing &amp; Uploading Resources
          </h1>
          <Collapse
            accordion
            defaultActiveKey={['1']}
            bordered={false}
            style={{ fontSize: '1.2em' }}
          >
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How do I find a resource?
                </p>
              }
              key="1"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can type in relevant words into the search bar and filters
                by different types of resources. Clicking a resource’s ‘More
                Information’ button will lead to the resource’s details and
                files.
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How can I upload a resource?
                </p>
              }
              key="2"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can upload resources (that you own or that are not current
                on the portal) by filling out this{' '}
                <a href="/resources/create">form</a>. The request will then be
                approved by an admin and be added to the portal.
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  What type of data formats can a resource be in?
                </p>
              }
              key="3"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                Resources can be a URL link or files (pdfs, csv, etc.).
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  What if I do not know all the information on the form to
                  upload a resource?
                </p>
              }
              key="4"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can leave the optional fields empty. If you don’t know the
                mandatory fields, you can suggest a resource on our{' '}
                <a href="/feedback">Feedback Form</a>.
              </p>
            </Panel>
          </Collapse>
        </div>
      )}

      {!abridged && (
        <div style={{ marginTop: '4rem', width: '100%', marginBottom: '4rem' }}>
          <h1 style={{ fontWeight: 'bold' }}>
            <ExclamationCircleOutlined style={{ fontSize: '0.9em' }} />
            &nbsp;Support
          </h1>
          <Collapse
            accordion
            defaultActiveKey={['1']}
            bordered={false}
            style={{ fontSize: '1.2em' }}
          >
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How do I reset my password?
                </p>
              }
              key="1"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can{' '}
                <a href="https://portal.dev.ai-global.org/login#!">
                  reset your password here
                </a>{' '}
                by typing in your username. An email to reset your password will
                be sent to the account’s email address.
              </p>
            </Panel>
            <Panel
              header={
                <p style={{ fontWeight: 'bold', marginBottom: '0' }}>
                  How can I contact support?
                </p>
              }
              key="2"
              style={{ textAlign: 'start' }}
            >
              <p style={{ marginLeft: '25px' }}>
                You can fill out this <a href="/feedback">Feedback Form</a> to
                report broken links or to give suggestions.
              </p>
            </Panel>
          </Collapse>
        </div>
      )}
    </div>
  );
}

export default FAQ;
