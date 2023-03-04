import Tutor from '@layout/Tutor';
import React from 'react';

const grade = () => {
  return (
    <Tutor>
      <section>
        <h2 className="text-2xl">Grade Tasks</h2>

        <div className="card mt-8">
          <form>
            <div className="form-group flex sm:flex-wrap md:flex-nowrap">
              <input type="number" className="form-control" />
              <input type="number" className="form-control" />
              <input type="number" className="form-control" />
            </div>
          </form>
        </div>
      </section>
    </Tutor>
  );
};

export default grade;
