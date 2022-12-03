import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import { studentSideBar } from 'data/index';
import React from 'react';

const index = () => {
  return (
    <Dashboard sidebar={studentSideBar}>
      <Container></Container>
    </Dashboard>
  );
};

export default index;
