import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';

const show = () => {
  return (
    <Dashboard>
      <Container>Show Task</Container>
    </Dashboard>
  );
};

export default show;
