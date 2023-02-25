import React, { useId, useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import { sideBarMenu, sideFooter } from 'data/index';
import Axios from 'helper/axios';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Alert from '@utility/Alert';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';

const animatedComponents = makeAnimated();

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const index = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const { data: session, status: authSession } = useSession();
  const email = session?.user?.email;

  const [id, setId] = useState<any>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [headlines, setHeadline] = useState<string>('');
  const [category, setCategory] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const optionsCat = [
    { value: 'announcement', label: 'Announcement' },
    { value: 'course', label: 'Course' },
    { value: 'general', label: 'General' },
    { value: 'sport', label: 'Sport' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'random', label: 'Random' },
  ];

  async function createPost(e: React.SyntheticEvent) {
    e.preventDefault();
    let formData = { title, content, tags, headlines, category, email };
    try {
      if (authSession !== 'authenticated') throw new Error('not authenticated');
      const { data, status } = await Axios.post('/api/post/create', formData);

      if (status === 400 || status === 401) {
        setSuccess(false);
        setError(true);
        setMessage(data.message);
        console.log(data.message);
      }
      if (status === 200 || status === 201) {
        setSuccess(data.success);
        setError(false);
        setMessage(data.message);
        setTitle('');
        setHeadline('');
        setContent('');
        setTags([]);
        setCategory([]);
        setTimeout(() => {
          setSuccess(false);
          Router.push('/tutor/post');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Tutor menu={sideBarMenu} footer={sideFooter}>
      <Container className={'sm:px-2 md:px-0 md:max-w-6xl min-h-screen'}>
        <h2 className="text-2xl">Post</h2>
        <div className="text-gray-500">
          <span>
            <Link href="/tutor/post">Post</Link> &rarr; Create Post
          </span>
        </div>

        <section className="p-5 max-w-6xl mt-4 bg-white rounded-sm shadow-sm border">
          {success && (
            <Alert className="bg-green-300 border-green-500 text-green-800">
              <p className="py-2 font-semibold">{message}</p>
            </Alert>
          )}

          <form onSubmit={createPost}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="headline" className="form-label">
                headline
              </label>
              <input
                type="text"
                id="headline"
                className="form-control"
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName border"
                editorClassName="editorClassName p-3"
                placeholder="Write something"
                onEditorStateChange={(newState) => {
                  setEditorState(newState);
                  setContent(
                    draftToHtml(convertToRaw(newState.getCurrentContent()))
                  );
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <Select
                instanceId={useId()}
                closeMenuOnSelect={false}
                components={animatedComponents}
                inputId="category"
                defaultValue={[optionsCat[2]]}
                isMulti
                name="colors"
                onChange={(e) => setCategory(e.map((item) => item.value))}
                options={optionsCat}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <CreatableSelect
                instanceId={useId()}
                inputId="tags"
                isClearable
                isMulti
                onChange={(e) => setTags(e.map((item: any) => item.value))}
              />
            </div>
            <div className="form-group">
              <div className="flex items-center space-x-12">
                <div className="flex space-x-2 items-center">
                  <input type="checkbox" id="commenting" />
                  <label htmlFor="commenting">Commenting</label>
                </div>
                <div className="flex space-x-2 items-center">
                  <input type="checkbox" id="publish" />
                  <label htmlFor="publish">Publish</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button className="btn bg-blue-500 text-blue-50 hover:bg-blue-600">
                Create Post
              </button>
            </div>
          </form>
        </section>
      </Container>
    </Tutor>
  );
};

export default index;
