import React, { useId, useState, useRef, useEffect } from 'react';
import dynamic, { DynamicOptions, Loader } from 'next/dynamic';
import Dashboard from '../../../components/layout/Dashboard';
import Container from '../../../components/utility/Container';
import { sideBarMenu, sideFooter } from '../../../data/index';
import Axios from '../../../api/axios';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Alert from '../../../components/utility/Alert';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
// import htmlToDraft from 'html-to-draftjs';

const prisma = new PrismaClient();

const animatedComponents = makeAnimated();

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const edit: NextPage = ({ post }: any) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const router = useRouter();

  const { data: session, status: authSession } = useSession();

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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    console.log(post);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setTags(post.tags);
    setHeadline(post.headlines);
    console.log(post);
    if (typeof window === 'object') {
      const htmlToDraft = require('html-to-draftjs').default;
      const contentBlock = htmlToDraft(post.content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [post]);

  const optionsCat = [
    { value: 'announcement', label: 'Announcement' },
    { value: 'course', label: 'Course' },
    { value: 'general', label: 'General' },
    { value: 'sport', label: 'Sport' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'random', label: 'Random' },
  ];

  async function editPost(e: React.SyntheticEvent) {
    e.preventDefault();
    let formData = { title, content, tags, headlines, category };
    try {
      if (authSession !== 'authenticated') throw new Error('not authenticated');
      const { data, status } = await Axios.post(
        `/api/post/${post.id}/update`,
        formData
      );

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
        setTimeout(() => {
          setSuccess(false);
          router.push('/post');
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'bg-[#eee] p-5 min-h-screen'}>
        <h2 className="text-2xl">Post</h2>
        <div className="text-gray-500">
          <span>
            <Link href="/post">Post</Link> &rarr; Edit Post
          </span>
        </div>

        <section className="p-5 max-w-6xl mt-4 bg-white rounded-sm shadow-sm border">
          {success && (
            <Alert className="bg-green-300 border-green-500 text-green-800">
              <p className="py-2 font-semibold">{message}</p>
            </Alert>
          )}
          <form onSubmit={editPost}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="headlines" className="form-label">
                headlines
              </label>
              <input
                type="text"
                id="headlines"
                className="form-control"
                value={headlines}
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
                // defaultValue={[optionsCat[2]]}
                value={category.map((cat) => {
                  return { value: cat, label: cat };
                })}
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
                value={tags.map((tag) => {
                  return { value: tag, label: tag };
                })}
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
                Update Post
              </button>
            </div>
          </form>
        </section>
      </Container>
    </Dashboard>
  );
};

export default edit;

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   const posts = await prisma.post.findMany();
//   const paths = posts.map((post) => {
//     return {
//       params: { id: post.id.toString() },
//     };
//   });
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const post = await prisma.post.findFirst({
    where: { id: id },
    include: { user: true },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      editor: [],
    },
  };
};
