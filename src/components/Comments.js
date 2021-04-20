import React from 'react';
import AddComment from './AddComment';
import CommentsList from './CommentsList';
import { Button } from '../ant';
import { useHistory } from 'react-router';

const Comments = ({ data, fetchResource, isUserSignedIn }) => {
  let history = useHistory();
  if (isUserSignedIn == 1) {
    return (
      <div>
        <AddComment type="comment" fetchResource={fetchResource} />
        <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
          Comments ({data.length} replies)
      </h1>
        <div>
          <CommentsList data={data} fetchResource={fetchResource} />
        </div>
        <br></br>
      </div>
    );
  }
  else {
    return (
      <div>
        <h1 style={{ padding: '10px', fontSize: '2em', fontWeight: 'bold' }}>
          Comments ({data.length} replies)
      </h1>
        <div>
          <CommentsList data={data} fetchResource={fetchResource} />
        </div>
        <br></br>
        <Button
          style={{ marginLeft: '10px' }}
          onClick={() => history.push('/register')}
        >
          Sign in
      </Button>
        <big> to make comments!</big>

      </div>
    );
  }
};
export default Comments;