import React from 'react';
import { Button } from '../ant';
import { useHistory } from 'react-router';

export default function LoginButton() {
  let history = useHistory();
  return (
    <div>
      <Button type="primary" onClick={() => history.push('/login')}>
        Login
      </Button>
      <Button
        style={{ marginLeft: '10px' }}
        onClick={() => history.push('/register')}
      >
        Create Account
      </Button>
    </div>
  );
}
