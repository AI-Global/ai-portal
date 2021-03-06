import React from 'react';
import { Footer as AntFooter } from '../ant';

function Footer() {
  return (
    <AntFooter
      style={{ textAlign: 'center', backgroundColor: '#fff', width: '100%' }}
    >
      &copy; RAI 2021
    </AntFooter>
  );
}

export default Footer;
