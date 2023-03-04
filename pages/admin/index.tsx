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
      <Container className="sm:px-5 md:px-0 md:mx-auto md:max-w-6xl">
            <h2 className="text-2xl font-semibold py-4">Dashboard</h2>
            <section className="flex md:flex-row flex-col w-full">
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
                <FaSchool className="text-[48px] text-black dark:text-gray-300" />
                <div className="text-black dark:text-gray-300">
                  <h5>Courses</h5>
                  <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    1
                  </h2>
                </div>
              </div>
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
                <MdArticle className="text-[48px] text-black dark:text-gray-300" />
                <div className="text-black dark:text-gray-300">
                  <h5>Posts</h5>
                  <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    10
                  </h2>
                </div>
              </div>
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
                <FaTasks className="text-[48px] text-black dark:text-gray-300" />
                <div className="text-black dark:text-gray-300">
                  <h5>Tasks</h5>
                  <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    1
                  </h2>
                </div>
              </div>
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
                <GoInfo className="text-[48px] text-black dark:text-gray-300" />
                <div className="text-black dark:text-gray-300">
                  <h5>Announcement</h5>
                  <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    1
                  </h2>
                </div>
              </div>
            </section>

           
          </Container>
    </Admin>
  );
};

export default index