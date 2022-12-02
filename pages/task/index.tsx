import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';

const Tasks = () => {
  async function submitHandler(e: any) {
    e.preventDefault();
    console.log('submitHandler');
  }
  return (
    <Dashboard>
      <Container className="min-h-screen">
        <div className="flex md:flex-row flex-col justify-between">
          <section className="md:w-1/2">
            <h2 className="text-2xl">Task</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur voluptates dolor optio quibusdam autem nemo dolores
              eum deleniti cupiditate expedita.
            </p>
          </section>
          <section className="md:w-1/2">
            <h2 className="text-2xl">Submit Task</h2>
            <div className="card">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="" className="form-label"></label>
                  <input type="text" name="" id="" className="form-control" />
                </div>
                <div className="mb-3 w-96">
                  <label htmlFor="" className="form-label"></label>
                  <input type="file" name="" id="" className="file-input" />
                </div>
              </form>
            </div>
          </section>
        </div>
      </Container>
    </Dashboard>
  );
};

export default Tasks;
