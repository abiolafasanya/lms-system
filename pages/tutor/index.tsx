import React, { useState, useLayoutEffect } from 'react';
import { FaSchool, FaTasks, FaInfoCircle } from 'react-icons/fa';
import { GoInfo } from 'react-icons/go';
import Tutor from 'components/layout/Tutor';
import Container from 'components/utility/Container';
import { sideBarMenu, sideFooter, headMenu } from 'data/index';
import { MdArticle } from 'react-icons/md';
import Alert from 'components/utility/Alert';
import { motion } from 'framer-motion';
import { motion1 } from 'data/motion';
import { ThreeCircles } from 'react-loader-spinner';

const index = () => {
  const [alert, setAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setAlert(false);
    setLoading(true);
    setTimeout(() => {
      setAlert(true);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <ThreeCircles
          height="100"
          width="100"
          color="#4b556380"
          wrapperStyle={{}}
          wrapperClass="flex items-center justify-center my-auto sm:my-60 lg:my-64"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#4b556380"
          innerCircleColor="#4b556380"
          middleCircleColor="#4b556380"
        />
      ) : (
        <Tutor menu={sideBarMenu} footer={sideFooter} header={headMenu}>
          {alert && (
            <Alert type={true} className="alert-info mx-5 md:mx-28">
              <h1 className="text-lg font-bold text-center my-2 flex items-center justify-center">
                <FaInfoCircle className="mr-2" /> Announcement
              </h1>
              <p className="text-base py-3">
                A new Assignment has been droped on the portal kindly visit the
                assignment area to find your course assignment
              </p>
            </Alert>
          )}
        <Container className="sm:px-5 md:px-0 md:mx-auto md:max-w-6xl">
            <h2 className="text-2xl font-semibold py-4">Dashboard &larr; Tutor</h2>
            <section className="flex md:flex-row flex-col w-full">
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
                <FaSchool className="text-[48px] text-black dark:text-gray-300" />
                <div className="text-black dark:text-gray-300">
                  <h5>Courses</h5>
                  <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    20
                  </h2>
                </div>
              </div>
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
                <MdArticle className="text-[48px] text-black dark:text-gray-300" />
                <div className="text-black dark:text-gray-300">
                  <h5>Posts</h5>
                  <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    20
                  </h2>
                </div>
              </div>
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
                <FaTasks className="text-[48px] text-black dark:text-gray-300" />
                <div className="text-black dark:text-gray-300">
                  <h5>Tasks</h5>
                  <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    20
                  </h2>
                </div>
              </div>
              <div className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border">
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
        </Tutor>
      )}
    </>
  );
};

export default index;
