import React, { setResource, useState } from 'react';
import { List, Comment } from '../ant';
import { Form, Button, Input } from '../ant';
import { useAppEnv } from './../env';

import AddReply from './AddReply';

const ReplysList = ({ data }) => {
  const getFormattedDate = date => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date
      .getDate()
      .toString()
      .padStart(2, '0');

    return month + '/' + day + '/' + year;
  };

  let { api } = useAppEnv();

  let objectArray = async () => {
    let array = [];
    for(var i = 0; i < data.length; i++){
      let response = await api.get('/api/comments/' + data[i]);
      let resultJSON = JSON.parse(JSON.stringify(response));
      array.push(resultJSON);
    }
    return array;
  }
  let objectArray2 = [{
    "text": "Test 5 Reply",
    "replies": [],
    "upvotes": 0,
    "deleted": false,
    "parent": "605ad56c1d93920b173935d7",
    "resource": "5fdb923ca7970a30f4066811",
    "_id": "605ad5a61d93920b173935d8",
    "user": "603511ff0cc0e5008adc8a0e",
    "timestamp": "2021-03-24T06:01:10.125Z",
    "__v": 0
},
{
  "text": "Test 4 Reply",
  "replies": [],
  "upvotes": 0,
  "deleted": false,
  "parent": "605a41e7dfc1610a234d7524",
  "resource": "5fdb923ca7970a30f4066811",
  "_id": "605a4201dfc1610a234d7525",
  "user": "603511ff0cc0e5008adc8a0e",
  "timestamp": "2021-03-23T19:31:13.737Z",
  "__v": 0
}];

  return (
    <List
      className="reply-list"
      header={`${objectArray2.length} replied`}
      itemLayout="horizontal"
      dataSource={objectArray2}
      renderItem={item => (
        <li>
          <Comment
            author={item.user}
            avatar={item.avatar}
            content={item.text}
            datetime={getFormattedDate(new Date(item.timestamp))}
          />
          <AddReply type="reply" commentID={0}></AddReply>
        </li>
      )}
    />
  );
};
export default ReplysList;