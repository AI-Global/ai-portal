import React from 'react';
import { useHistory } from 'react-router';

export default function Logo({ style }) {
  let history = useHistory();
  let logoStyle = { cursor: 'pointer', ...style };
  return (
    <img
      onClick={() => history.push('/')}
      src="/logo.png"
      alt="logo"
      width={'160px'}
      style={logoStyle}
    />
  );
}
