import React, { setResource, useEffect, useState } from 'react';
import { List, Comment } from '../ant';
import { Form, Button, Input } from '../ant';
import { useAppEnv } from './../env';

import AddReply from './AddReply';

const ReplysList = ({ data, leftMargin }) => {
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
  
  let userArray = async (input) => {
    let array = [];
    for(var i = 0; i < input.length; i++){
      let response = await api.get('/api/users/' + input[i].user);
      let resultJSON = JSON.parse(JSON.stringify(response));
      array.push(resultJSON);
    }
    return array;
  }

let newMarginLeft = `${leftMargin + 20}px`;
let styles = {
  marginLeft: newMarginLeft,
};

const [comments, setComments] = useState([]);

let objectArray = async() => {
  let array = [];
  for(var i = 0; i < data.length; i++){
    let response = await api.get('/api/comments/' + data[i]);
    let resultJSON = JSON.parse(JSON.stringify(response));
    array.push(resultJSON);
  }
  return array;
}

let fetchComments = async () => {
  let objResult = await objectArray();
  setComments(objResult);
};
useEffect(() => {
  fetchComments();
}, [data]);

//ReplysList will be added to return statement
  return (
    <List
      className="reply-list"
      header={`${comments.length} replies`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={item => (
        <li style={ styles }>
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