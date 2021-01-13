import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, DatePicker, Space, Form } from '../ant';
import { useAppEnv } from './../env';
import moment from 'moment';
export default function ManageResourceModal({
  resource,
  modalVisible,
  setModalVisible,
}) {
  let [editedResource, setEditedResource] = useState(
    JSON.parse(JSON.stringify(resource))
  );
  let [topics, setTopics] = useState([]);
  useEffect(() => {
    setEditedResource(JSON.parse(JSON.stringify(resource)));
  }, [resource]);

  let { api, enums, refresh } = useAppEnv();
  useEffect(() => {
    api.get('/api/topics').then((topics) => setTopics(topics));
  }, [api]);
  let unsavedEdit = JSON.stringify(resource) !== JSON.stringify(editedResource);
  let saveChanges = () => {
    api
      .put(`/api/resources/${resource._id}`, {
        name: editedResource.name,
        desc: editedResource.desc,
        type: editedResource.type,
        topics: editedResource.topics,
        path: editedResource.path,
        downloadURL: editedResource.downloadURL,
        modifiedDate: editedResource.modifiedDate,
      })
      .then(() => refresh());
    //console.log('new', JSON.stringify(editedResource));
  };
  return (
    <Modal
      title={resource ? `${resource.name}` : 'Loading...'}
      centered
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={[]}
      width={600}
    >
      {resource && editedResource && (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="Name">
            <Input
              placeholder="Name"
              value={editedResource.name}
              onChange={(e) =>
                setEditedResource({ ...editedResource, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              rows={3}
              placeholder="Description"
              value={editedResource.desc}
              onChange={(e) =>
                setEditedResource({ ...editedResource, desc: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Types">
            <Select
              showSearch
              defaultValue={editedResource.type}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newTypes) => {
                setEditedResource({ ...editedResource, type: newTypes });
              }}
            >
              {enums?.RESOURCE_TYPES.map((type) => (
                <Select.Option value={type}>{type}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Topics">
            <Select
              showSearch
              defaultValue={editedResource.topics.map((topic) => topic.name)}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newTopics) => {
                setEditedResource({
                  ...editedResource,
                  topics: newTopics.map((topic) => {
                    return { name: topic, desc: 'A topic' };
                  }),
                });
              }}
            >
              {topics.map((topic) => (
                <Select.Option value={topic.name}>{topic.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Paths">
            <Select
              showSearch
              defaultValue={editedResource.path}
              style={{ width: '100%' }}
              mode="multiple"
              onChange={(newPaths) => {
                setEditedResource({ ...editedResource, path: newPaths });
              }}
            >
              {enums?.RESOURCE_PATHS.map((path) => (
                <Select.Option value={path}>{path}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Download URL">
            <Input
              placeholder="Download URL"
              value={editedResource.downloadURL}
              onChange={(e) =>
                setEditedResource({
                  ...editedResource,
                  downloadURL: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Modified Date">
            <DatePicker
              defaultValue={
                editedResource.modifiedDate
                  ? moment(editedResource.modifiedDate)
                  : null
              }
              onChange={(date) =>
                setEditedResource({
                  ...editedResource,
                  modifiedDate: date,
                })
              }
            />
          </Form.Item>
          <Button
            type="primary"
            style={{ marginTop: '10px' }}
            disabled={!unsavedEdit}
            onClick={saveChanges}
          >
            Apply Changes
          </Button>
        </Form>
      )}
    </Modal>
  );
}
