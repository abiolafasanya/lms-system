import React, {
  useState,
  useId,
  useEffect,
} from 'react';
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
import UseAuth from 'hooks/useAuth'
import {AlertMsg} from '@utility/Alert'

const animatedComponents = makeAnimated();

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const create = () => {
  const {auth} = UseAuth()
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const [author, setAuthor] = useState(auth.session?.user);
  const [requirements, setRequirements] = useState<any>();
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('');

  // return console.log(auth.session?.user)

useEffect(() => {
  setAuthor(() => auth.session?.user)
},[author, auth])


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      author: { value: string };
      price: { value: string };
      image: { files: string | Blob };
    };
    

    const name = target.name.value;
    const description = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const price = target.price.value;
    const [image]: any = target.image.files;

    let formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'my-uploads');
    let URLCloudinary =
      'https://api.cloudinary.com/v1_1/fastbeetech/image/upload';

      const uploadImage = await fetch(URLCloudinary, {
        method: 'POST',
        body: formData,
      })
      const res = await uploadImage.json();
    const formBody = {
      image: res.secure_url, name, description, requirements, price: parseInt(price), userId: author?.id,
    }
    const {data, status} = await Axios.post('/api/course/create', formBody)

    if(data.error) {
      console.log(status, data.error)
      setError(true)
      setMessage("Course not created 😭 there was an interruption")
      cleanup()
      return
    }

    if(status === 200 && data.success) {
      setSuccess(true)
      setMessage("Successfully created course 😊")
      target.name.value = ''
      target.author.value = ''
      target.price.value = ''
      setEditorState(EditorState.createEmpty())
      setRequirements([])
      cleanup()
      // console.log('successful', data)
      return 
    }

  }

  function cleanup() {
    setTimeout(() => {
      setSuccess(false)
      setError(false)
      setMessage('')
    }, 3000)
  }

  return (
    <Tutor>
      <Container className={`min-h-screen md:max-w-6xl mx-auto dark:text-gray-100`}>
        <main className="w-full">
          <section>
            <h1 className="text-2xl">Create Course</h1>
            <div className="text-gray-500 mb-4 flex justify-between items-center">
              <span>
                <Link href="/tutor/course">Course</Link> &larr; Create Course
              </span>
            </div>
            <div className="card text-dark ">
              {error && <AlertMsg type='alert-error' message={message} />}
              {success && <AlertMsg type='alert-success' message={message} />}
              <form onSubmit={handleSubmit}>
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
                    <label htmlFor="point" className="form-label">
                      Requirements
                    </label>
                    <CreatableSelect
                      instanceId={useId()}
                      components={animatedComponents}
                      options={[{ value: 'laptops', label: 'Laptop' }]}
                      inputId="tags"
                      isClearable
                      className="dark:text-black"
                      isMulti
                      onChange={(e) =>
                        setRequirements(e.map((item: any) => item.value))
                      }
                    />
                  </div>
                  <div className="form-group w-full">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="file-input"
                    />
                  </div>
                </div>
                <div className="flex md:justify-between md:space-x-8 items-center">
                  <div className="form-group w-full">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input type="number" id="price" className="form-control" />
                  </div>
                  <div className="form-group w-full">
                    <label htmlFor="author" className="form-label">
                      Author Id
                    </label>
                    <input disabled={true} defaultValue={author?.id} type="text" id="author" className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn">Create Course</button>
                </div>
              </form>
            </div>
          </section>
          <section></section>
        </main>
      </Container>
    </Tutor>
  );
};

export default create;
