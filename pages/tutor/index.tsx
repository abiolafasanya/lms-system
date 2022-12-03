import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import React from 'react';
import { tutorSidebar } from 'data/index';

const index = () => {
  return (
    <Dashboard sidebar={tutorSidebar} className=" dark:bg-gray-800">
      <Container className={`min-h-screen`}></Container>
    </Dashboard>
  );
};

export default index;
