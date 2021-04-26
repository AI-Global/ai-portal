import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select } from '../ant';
import { useAppEnv } from './../env';

export default function CreateDiscussionPostModal({
  modalVisible,
  setModalVisible,
}) {
  let { api, enums, user, refresh } = useAppEnv();
  let [topics, setTopics] = useState([]);

  useEffect(() => {
    api.get('/api/topics').then((topics) => setTopics(topics));
  }, [api]);

  const submitPost = async (values, topics) => {
    const { header, path, text, type } = values;

    const types = [];

    type.forEach((type) => {
      const newTopic = topics.find((topic) => topic.name == type);
      types.push(newTopic._id);
    });

    await api.post('/api/discussionposts', {
      title: header,
      text: text,
      type: types,
      path: path,
    });
  };

  return (
    <Modal
      title={'Create Discussion Post'}
      centered
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={[]}
      width={600}
    >
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 24 }}
        onFinish={(values) => submitPost(values, topics)}
      >
        <Form.Item
          hasFeedback
          name="header"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title!' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="text"
          label="Body"
          rules={[{ required: true, message: 'Please enter a post body!' }]}
        >
          <Input.TextArea rows={5} placeholder="Body" />
        </Form.Item>
        <Form.Item name="type" label="Topics">
          <Select showSearch style={{ width: '100%' }} mode="multiple">
            {topics.map((topic) => (
              <Select.Option value={topic.name}>{topic.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="path" label="Paths">
          <Select showSearch style={{ width: '100%' }} mode="multiple">
            {enums?.RESOURCE_PATHS.map((path) => (
              <Select.Option value={path}>{path}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ marginTop: '10px', alignSelf: 'centered' }}
            htmlType="submit"
          >
            Submit Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
