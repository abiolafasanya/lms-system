import React, { useState, useId } from 'react';
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
// import Select from 'react-select/dist/declarations/src/Select';
import { useSession } from 'next-auth/react';

const animatedComponents = makeAnimated();

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);


const optionsCat = [
  { value: 'everyone', label: 'EveryOne' },
  { value: 'course', label: 'Course' },
  { value: 'general', label: 'General' },
  { value: 'sport', label: 'Sport' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'random', label: 'Random' },
];

const create = () => {
  const {data: session, status: userSession} = useSession();
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [assignedTo, setAssignedTo] = useState<any>();
  const [description, setDescription] = useState<string>('');

  async function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(userSession !== 'authenticated') return null

    const target = e.target as typeof e.target & {
       title: {value: string},
       attachment: {files: any},
       point: {value: number},
       deadline: {value: Date}
    };

    const body = {
      title: target.title.value,
      attachment: target.attachment.files[0],
      point: target.point.value,
      deadline: target.deadline.value,
      assignedTo,
      description,
      userId: session?.user?.id,
    }
   

  const formData = new FormData();

  formData.append('file', body.attachment);
  formData.append('upload_preset', 'my-uploads');
  let URLCloudinary =
    'https://api.cloudinary.com/v1_1/fastbeetech/image/upload';

  let upload;

  if (body.attachment !== null || body.attachment !== undefined) {
    upload = await fetch(URLCloudinary, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        body.attachment = data.secure_url
        return body;
      })
      .catch((error) => error.message);
  }
  if (body.attachment === null) {
      body.attachment = {}
  }


  const { data, status } = await Axios.post('/api/task/create', upload);
  if (data.error) {
    console.error(data.error);
  }
  if (status === 200 || status === 201) {
    console.log(data);
  }

  }

  return (
    <Tutor>
      <Container className={`min-h-screen md:max-w-5xl mx-auto`}>
        <main className="w-full">
          <section>
            <h1 className="text-2xl">Create Task</h1>
            <div className="text-gray-500 mb-4 flex justify-between items-center">
              <span>
                <Link href="/tutor/task">Task</Link> &larr; Create Task
              </span>
            </div>
            <div className="card text-dark ">
              <form onSubmit={formHandler}>
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Task Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    // onChange={(e: any) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName border"
                    editorClassName="editorClassName p-3 text-black dark:text-white"
                    placeholder="Write something"
                    onEditorStateChange={(newState) => {
                      setEditorState(newState);
                      setDescription(
                        draftToHtml(convertToRaw(newState.getCurrentContent()))
                      );
                    }}
                  />
                </div>
                <div className="flex md:justify-between md:space-x-8 items-center">
                  <div className="form-group w-full">
                    <label htmlFor="assignedto" className="form-label">
                      Assign to
                    </label>
                    <CreatableSelect
                      instanceId={useId()}
                      components={animatedComponents}
                      options={[{ value: 'everyone', label: 'EveryOne' }]}
                      inputId="assignedto"
                      isClearable
                      className="dark:text-black"
                      isMulti
                      onChange={(e) =>
                        setAssignedTo(e.map((item: any) => item.value))
                      }
                    />
                  </div>
                  <div className="form-group w-full">
                    <label htmlFor="attachment" className="form-label">
                      Attachment
                    </label>
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      className="file-input"
                      multiple
                    />
                  </div>
                </div>
                <div className="flex md:justify-between md:space-x-8 items-center">
                  <div className="form-group w-full">
                    <label htmlFor="point" className="form-label">
                      Point
                    </label>
                    <input
                      type="number"
                      id="point"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group w-full">
                    <label htmlFor="deadline" className="form-label">
                      Deadline
                    </label>
                    <input
                      type="datetime-local"
                      id="deadline"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn">Creat Task</button>
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

// async function create(event: React.SyntheticEvent | any) {
//   event.preventDefault();
//   const formData = new FormData();
//   // for (const file of attachment.files) {
//   // }      setCreateObjectURL(URL.createObjectURL(i));

//   formData.append('file', attachment);
//   formData.append('upload_preset', 'my-uploads');
//   let URLCloudinary =
//     'https://api.cloudinary.com/v1_1/fastbeetech/image/upload';

//   let upload;

//   if (attachment !== null || attachment !== undefined) {
//     upload = await fetch(URLCloudinary, {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setAttachment(data);
//         const input = {
//           title,
//           description,
//           point,
//           attachment: data,
//           deadline,
//           assignedTo,
//         };
//         return input;
//       })
//       .catch((error) => error.message);
//   }
//   if (attachment === null) {
//     upload = {
//       title,
//       description,
//       point,
//       attachment: {},
//       deadline,
//       assignedTo,
//     };
//   }

//   console.log(upload);

//   const { data, status } = await Axios.post('/api/task/create', upload);
//   if (data.error) {
//     console.error(data.error);
//   }
//   if (status === 200 || status === 201) {
//     console.log(data);
//   }
// }
