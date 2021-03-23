import React from 'react';
import AddComment from './AddComment';
import CommentsList from './CommentsList';
const Comments = ({ data, fetchResource }) => {
  return (
    <div>
      <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
        Comments ({data.length} replies)
      </h1>
      <div>
        <CommentsList data={data} />
      </div>
      <AddComment type="comment" renderComments={fetchResource} />
    </div>
  );
};
export default Comments;
