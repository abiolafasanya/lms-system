import React, { useState, useEffect, useId } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

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
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [point, setPoint] = useState(0);
  const [deadline, setDeadline] = useState<any>();
  const [assignedTo, setAssignedTo] = useState<any>('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Dashboard>
      <Container className={`min-h-screen`}>
        <main className="w-full">
          <section>
            <h1 className="text-2xl">Create Task</h1>
            <div className="card">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Task Title
                </label>
                <input type="text" id="title" className="form-control" />
              </div>
              <div className="form-group">
                <label
                  htmlFor="description"
                  className="form-label"
                  onChange={(e: any) => setTitle(e.target.value)}
                >
                  Description
                </label>
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
              <div className="flex md:justify-between md:space-x-8 items-center">
                <div className="form-group w-full">
                  <label htmlFor="point" className="form-label">
                    Assign to
                  </label>
                  <CreatableSelect
                    instanceId={useId()}
                    components={animatedComponents}
                    options={[{ value: 'everyone', label: 'EveryOne' }]}
                    inputId="tags"
                    isClearable
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
                    id="attachement"
                    className="file-input"
                    onChange={(e: any) => setPoint(e.target.value)}
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
            </div>
          </section>
          <section></section>
        </main>
      </Container>
    </Dashboard>
  );
};

export default create;
