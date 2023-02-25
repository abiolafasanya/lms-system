import React, { useState, useRef, useId } from 'react';
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
import Select from 'react-select/dist/declarations/src/Select';

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
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const descriptionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const pointRef = useRef<HTMLInputElement>(null);
  const assignedToRef = useRef<Select>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const attachmentRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [point, setPoint] = useState(0);
  const [deadline, setDeadline] = useState<any>();
  const [assignedTo, setAssignedTo] = useState<any>('');
  const [attachment, setAttachment] = useState<any>(null);

  async function formHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target;
    console.log(target);
  }

  return (
    <Tutor>
      <Container className={`min-h-screen`}>
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
                    ref={titleRef}
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
                      ref={assignedToRef}
                      // onChange={(e) =>
                      //   setAssignedTo(e.map((item: any) => item.value))
                      // }
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
                      onChange={(e: any) => setAttachment(e.target.files[0])}
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
                      onChange={(e: any) => setPoint(e.target.value)}
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
                      onChange={(e: any) => setDeadline(e.target.value)}
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
