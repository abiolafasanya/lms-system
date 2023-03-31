import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import Axios from 'helper/axios';
import { Module } from '@prisma/client';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

type Props = {
  cleanup: () => void;
  courseId: string;
  modules: Module[];
  setError: (err: boolean) => void;
  setSuccess: (success: boolean) => void;
  setMessage: (msg: string) => void;
};

const ContentForm: React.FC<Props> = ({
  cleanup,
  courseId,
  modules,
  setError,
  setMessage,
  setSuccess,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  const [isLink, setIsLink] = useState(false)

  async function handleTopics(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const description = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const target = e.target as HTMLInputElement & {
      title: { value: string };
      moduleId: { value: string };
      courseId: { value: string };
      document: { value: string, files: File | any };
      video: { value: string };
    };


    // const [file] = target.document.files;
    let file: any;
    if(target.document.value){
       file = target.document.value
    } 
    const body = {
      title: target.title.value,
      description,
      moduleId: target.moduleId.value,
      video: target.video.value,
      file,
    };

    const Endpoint = '/api/course/' + courseId + '/lesson';
    console.log(Endpoint);
    const { data, status } = await Axios.post(Endpoint, body);
    if (data.error) {
      setError(true);
      setSuccess(false);
      setMessage('Failed to create content');
      cleanup();
      return;
    }

    if (status === 200) {
      setSuccess(true);
      setError(false);
      setMessage(data.message);
      cleanup();
    }
    console.log(body);
  }

  return (
    <form onSubmit={handleTopics}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" id="title" className="form-control" />
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
          <label htmlFor="video" className="form-label">
            Video
          </label>
          <input type="url" id="video" className="form-control" />
        </div>
        <div className="form-group w-full">
          <label htmlFor="document" className="form-label">
            Document (Material)
          </label>
          <input type={isLink ? 'url':'file'} id="document" className="form-control" />
          <label htmlFor="isLink">
            <input type="checkbox" className="mr-2" onChange={() => setIsLink(isLink => !isLink)} />
            <span>Use Link | Upload</span>
          </label>
        </div>
      </div>
      <div className="flex md:justify-between md:space-x-8 items-center">
        <div className="form-group w-full">
          <label htmlFor="moduleId" className="form-label">
            Choose Module
          </label>
          <select className="form-control" id="moduleId">
            {modules &&
              modules.map((item, id) => (
                <option value={item.id} key={id}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group w-full">
          <label htmlFor="courseId" className="form-label">
            Course Id
          </label>
          <input
            disabled={true}
            defaultValue={courseId}
            type="text"
            id="courseId"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group">
        <button className="btn">Create Course</button>
      </div>
    </form>
  );
};

export default ContentForm;
