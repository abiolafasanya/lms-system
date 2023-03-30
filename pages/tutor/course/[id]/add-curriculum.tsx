import React, { useState, useId, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import Axios from 'helper/axios';
import Link from 'next/link';
import UseAuth from 'hooks/useAuth';
import { AlertMsg } from '@utility/Alert';
import { PrismaClient, Course } from '@prisma/client';
import { NextPage, GetServerSideProps } from 'next';

const animatedComponents = makeAnimated();

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

type Iprops = {
  course: Course;
};

const curriculum: NextPage<Iprops> = ({ course }) => {
  const { auth } = UseAuth();
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const [author, setAuthor] = useState(auth.session?.user);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const [tab, setTab] = useState(false);

  // return console.log(auth.session?.user)

  useEffect(() => {
    setAuthor(() => auth.session?.user);
  }, [author, auth]);

  async function handleCurriculum(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLInputElement & {
      title: { value: string };
    };
    const title = target.title.value;
    const EndPoint = `/api/course/${course.id}/addCurriculum`
    // course/640914ea0c1dc09178729cc3/add-curriculum
    console.log(title, EndPoint);
    const body = {title}

    const { data, status } = await Axios.post(EndPoint, body);
    if (data.error) {
      setError(true);
      setMessage('An error was encountered try again later!');
      cleanup();
    }
    if (status === 200) {
      setSuccess(true);
      setMessage('Curriculum created');
      cleanup();
    }
  }

  async function handleTopics(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function cleanup() {
    setTimeout(() => {
      setSuccess(false);
      setError(false);
      setMessage('');
    }, 3000);
  }

  return (
    <Tutor>
      <Container
        className={`min-h-screen md:max-w-6xl mx-auto dark:text-gray-100`}
      >
        <main className="w-full">
          <section>
            <div className="text-gray-500 mb-4 flex justify-between items-center">
              <span>
                <Link href="/tutor/course">Course</Link> &larr; Create Course
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                {tab ? (
                  <h1 className="text-2xl">Create Curriculum</h1>
                ) : (
                  <h1 className="text-2xl">Create Topic</h1>
                )}
              </div>
              <div className="flex space-x-5">
                <button
                  onClick={() => setTab((tab) => !tab)}
                  className="px-5 py-2 text-blue-500 hover:text-blue-600"
                >
                  {tab && 'Curriculum'}
                </button>
                <button
                  onClick={() => setTab((tab) => !tab)}
                  className="px-5 py-2 text-blue-500 hover:text-blue-600"
                >
                  {!tab && 'Content'}
                </button>
              </div>
            </div>
            <div className="card text-dark ">
              {error && <AlertMsg type="alert-error" message={message} />}
              {success && <AlertMsg type="alert-success" message={message} />}

              {tab ? (
                <form onSubmit={handleTopics}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Course Name
                    </label>
                    <input type="text" id="name" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      toolbarClassName="border"
                      wrapperClassName="border focus:border-blue-500"
                      editorClassName="p-3 text-black dark:text-white"
                      placeholder="Write something"
                    />
                  </div>
                  <div className="flex md:justify-between md:space-x-8 items-center">
                    <div className="form-group w-full">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group w-full">
                      <label htmlFor="author" className="form-label">
                        Author Id
                      </label>
                      <input
                        disabled={true}
                        defaultValue={author?.id}
                        type="text"
                        id="author"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="btn">Create Course</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleCurriculum}>
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input type="text" id="title" className="form-control" />
                  </div>
                  <div className="form-group">
                    <button className="btn">Add Curriculum</button>
                  </div>
                </form>
              )}
            </div>
          </section>
          <section></section>
        </main>
      </Container>
    </Tutor>
  );
};

export default curriculum;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const id = context.query.id as string;
  const course = await prisma.course.findUnique({ where: { id } });
  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
    },
  };
};
