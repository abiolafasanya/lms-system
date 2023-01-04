import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import { studentSideBar } from 'data/index';
import React, { useState } from 'react';

const index = () => {
  const [token] = useState(() => {
    localStorage.getItem('token');
    let token = window.localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  });

  return (
    <Dashboard sidebar={studentSideBar}>
      <Container>token is {token}</Container>
    </Dashboard>
  );
};

export default index;
