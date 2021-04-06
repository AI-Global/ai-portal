import React from 'react';
import AddComment from './AddComment';
import CommentsList from './CommentsList';
import { useAppEnv } from '../env';
const Comments = ({ data, fetchResource }) => {
  let { user } = useAppEnv();
  return (
    <div>
      <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
        Comments
      </h1>
      <div>
        <CommentsList data={data} renderComments={fetchResource} />
      </div>
      {user ? <AddComment /> : null}
    </div>
  );
};
export default Comments;
