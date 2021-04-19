import React from 'react';
import { Layout, Content, } from '../ant';
import FormHeader from '../components/FormHeader.js';
import Footer from '../components/Footer.js';
import DiscussionCard from '../components/DiscussionCard.js';

export default function DiscussionForum() {
  return (
    <Layout>
      <FormHeader />
      <Content>
        {/* This is where the main UI of the discussion forum view will reside. For now, I've stuck it underneath AI Global's FormHeader 
        component, but we might have to manually code that section because the Content component might depend on some variables defined
        in the FormHeader (see dependencies and compare Layout code in the SearchResults, Feedback, FAQ, and AddResource views. */}
        <DiscussionCard></DiscussionCard>
      </Content>
      <Footer />
    </Layout>
  );
}