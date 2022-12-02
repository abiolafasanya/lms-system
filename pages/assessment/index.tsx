import React, { useEffect, useState } from 'react';
import Dashboard from '@layout/Dashboard';
import { sideBarMenu, sideFooter } from './../../data/index';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { PrismaClient } from '@prisma/client';
import Container from '@utility/Container';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import Axios from 'api/axios';
import { AlertMsg } from '@utility/Alert';
import Modal from '@utility/Modal';
import { useRouter } from 'next/router';

type Props = {
  assessments: [];
};
const prisma = new PrismaClient();

const Assessment = (props: any) => {
  const router = useRouter();
  const [assessments, setAssessment] = useState<any[]>([]);
  const [isAccessment, setIsAccessment] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    setAssessment(props.assessments);

    // console.log(assessments);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  // }, [assessments, success, error]);

  async function createAssessment(e: any) {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    if (title === '' && description === '') {
      setError(true);
      setSuccess(false);
      setMessage('fill in all required fields');
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
      return;
    }
    const body = { title, description };
    const { data, status } = await Axios.post('/api/assessment/create', body);
    if (data.error) {
      setError(true);
      setSuccess(false);
      setMessage(data.error);
      title = '';
      description = '';

      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
      // throw new Error(data.error);
    }
    if (status === 400 || status === 401) {
      title = '';
      description = '';
      throw new Error('Bad request check your credentials');
    }
    if (status === 200 || status === 201) {
      setError(false);
      setSuccess(true);
      setMessage(data.message);
      setAssessment(props.assessments);
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
        title = '';
        description = '';
        router.reload();
      }, 5000);
      console.log(data);
    }
  }

  async function removeItem(e: React.SyntheticEvent, id: any) {
    e.preventDefault();
    console.log(id);
    setIsModal(true);
    setId(id);
  }

  async function confirmDelete() {
    const POST_URL = `/api/assessment/${id}/delete`;
    try {
      const { data, status } = await Axios.delete(POST_URL);
      console.log({ data, status });
      if (data.error) {
        setIsModal(false);
        setSuccess(false);
        setError(true);
        setMessage(data.message);
        setTimeout(() => {
          setSuccess(false);
          setError(false);
          setMessage('');
        }, 3000);
      }
      if (status === 200) {
        setIsModal(false);
        setError(false);
        setSuccess(true);
        setMessage(data.message);
        setAssessment(props.assessments);
        setTimeout(() => {
          setSuccess(false);
          setError(false);
          setMessage('');
          router.reload();
        }, 3000);
        return;
      }
      if (status === 404 || status === 400) {
        setIsModal(false);
        setError(true);
        setSuccess(false);
        setMessage(data.error);
        setTimeout(() => {
          setSuccess(false);
          setError(false);
          setMessage('');
        }, 3000);
        return;
      }
    } catch (err) {
      setIsModal(false);
      setSuccess(false);
      setError(false);
      setMessage(err as string);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
        setMessage('');
      }, 3000);
    }
  }

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={`min-h-screen px-5 mx-auto`}>
        {isModal && (
          <Modal
            action={confirmDelete}
            title="Delete Assessment"
            close={() => setIsModal(!isModal)}
          />
        )}
        {success && <AlertMsg message={message} type="alert-success" />}
        {error && <AlertMsg message={message} type="alert-error" />}
        <h1 className="text-2xl ml-2">Assessment</h1>
        <section className="flex md:flex-row flex-col md:space-x-8">
          <div className="flex flex-col w-full">
            {assessments.length > 0 ? (
              assessments.map((item: any) => (
                <div className="card" key={item.id}>
                  <h1 className="text-xl">{item.title}</h1>
                  <div className="flex justify-between items-center">
                    <p className="text-base">{item.description}</p>
                    <div className="flex space-x-2">
                      <Link
                        href={`/assessment/${item.id}`}
                        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/assessment/${item.id}/edit`}
                        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </Link>
                      <button>
                        <FaTrashAlt
                          className="text-red-500 hover:text-red-600"
                          onClick={(e) => removeItem(e, item.id)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card">No Assessment</div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex">
              <button
                className="btn ml-auto"
                onClick={() => setIsAccessment(!isAccessment)}
              >
                Create Assessment
              </button>
            </div>
            {isAccessment && (
              <section className="mt-4">
                <div className="card">
                  <h1 className="text-2xl">Create Assessement</h1>
                  <form onSubmit={createAssessment}>
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input type="text" id="title" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn">Create</button>
                    </div>
                  </form>
                </div>
              </section>
            )}
          </div>
        </section>
      </Container>
    </Dashboard>
  );
};

export default Assessment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const assessments = await prisma.assessment
    .findMany()
    .finally(async () => await prisma.$disconnect());

  return {
    props: {
      assessments: JSON.parse(JSON.stringify(assessments)),
    },
  };
};

// async function getAssessments() {
//   const { data, status } = await Axios.get('/api/assessment/');
//   if (status === 200) {
//     console.log(data.assessment, status);
//     return;
//   }
//   if (data.error) {
//     console.log(data.error);
//     return;
//   }
// }
// getAssessments();
