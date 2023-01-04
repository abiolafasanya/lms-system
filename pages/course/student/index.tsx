import React from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import { sideBarMenu, sideFooter } from 'data/index';

const index = () => {
  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'bg-[#eee] p-5 min-h-screen'}></Container>
    </Dashboard>
  );
};

export default index;
