import Admin from '@layout/Admin'
import React from 'react'
import { motion } from 'framer-motion';
import Container from '@utility/Container';
import { FaSchool, FaTasks } from 'react-icons/fa';
import { MdArticle } from 'react-icons/md';
import { GoInfo } from 'react-icons/go';
import { motion1 } from 'data/motion';

const index = () => {
  return (
    <Admin>
      <Container className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold py-4">Dashboard</h2>
        <section className="flex md:flex-row flex-col">
          <div className="card flex space-x-4 items-center p-5 rounded border">
            <FaSchool className="text-[48px] text-black dark:text-gray-300" />
            <div className="text-black dark:text-gray-300">
              <h5>Total courses</h5>
              <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                20
              </h2>
            </div>
          </div>
          <div className="card flex space-x-4 items-center p-5 rounded border">
            <MdArticle className="text-[48px] text-black dark:text-gray-300" />
            <div className="text-black dark:text-gray-300">
              <h5>Total courses</h5>
              <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                20
              </h2>
            </div>
          </div>
          <div className="card flex space-x-4 items-center p-5 rounded border">
            <FaTasks className="text-[48px] text-black dark:text-gray-300" />
            <div className="text-black dark:text-gray-300">
              <h5>Total Tasks</h5>
              <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                20
              </h2>
            </div>
          </div>
          <div className="card flex space-x-4 items-center p-5 rounded border">
            <GoInfo className="text-[48px] text-black dark:text-gray-300" />
            <div className="text-black dark:text-gray-300">
              <h5>Announcement</h5>
              <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                20
              </h2>
            </div>
          </div>
        </section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={motion1}
          className="grid grid-cols-1 md:grid-cols-4 gap-5 p-5"
        >
          <div className="shadow-md dark:bg-inherit bg-white border rounded p-5">
            <h1 className="text-2xl">Title of info</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              quas, iure unde reprehenderit quod placeat assumenda? Rerum ea
              accusamus unde.
            </p>
          </div>
          <div className="shadow-md dark:bg-inherit border bg-white rounded p-5">
            <h1 className="text-2xl">Title of info</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              quas, iure unde reprehenderit quod placeat assumenda? Rerum ea
              accusamus unde.
            </p>
          </div>
          <div className="shadow-md dark:bg-inherit border bg-white rounded p-5">
            <h1 className="text-2xl">Title of info</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              quas, iure unde reprehenderit quod placeat assumenda? Rerum ea
              accusamus unde.
            </p>
          </div>
          <div className="shadow-md dark:bg-inherit border bg-white rounded p-5">
            <h1 className="text-2xl">Title of info</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              quas, iure unde reprehenderit quod placeat assumenda? Rerum ea
              accusamus unde.
            </p>
          </div>
          <div className="shadow-md dark:bg-inherit border bg-white rounded p-5">
            <h1 className="text-2xl">Title of info</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              quas, iure unde reprehenderit quod placeat assumenda? Rerum ea
              accusamus unde.
            </p>
          </div>
          <div className="shadow-md dark:bg-inherit border bg-white rounded p-5">
            <h1 className="text-2xl">Title of info</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              quas, iure unde reprehenderit quod placeat assumenda? Rerum ea
              accusamus unde.
            </p>
          </div>
          <div className="shadow-md dark:bg-inherit border bg-white rounded p-5">
            <h1 className="text-2xl">Title of info</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              quas, iure unde reprehenderit quod placeat assumenda? Rerum ea
              accusamus unde.
            </p>
          </div>
        </motion.section>
      </Container>
    </Admin>
  );
};

export default index