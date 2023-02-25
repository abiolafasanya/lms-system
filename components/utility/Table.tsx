import React, { useState, useRef } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Modal from '@utility/Modal';
import { Question } from '@prisma/client';
import Axios from 'helper/axios';

const header = ['S/N', 'Question', 'Options', 'Answer'];

const Table = ({ header, questions, id, url }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [currQuestion, setCurrQuestion] = useState<any>();

  const questionRef = useRef<HTMLTextAreaElement>(null);
  const aRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);
  const cRef = useRef<HTMLInputElement>(null);
  const dRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  function editHandler(question: Question) {
    console.log(`Edit is working: ${question.id}`);
    setOpenModal(!openModal);
    setCurrQuestion(question);
  }

  async function update() {
    type bodyDoc =
      | {
          question: string | undefined;
          options: any[];
          answer: string | undefined;
        }
      | undefined;

    const body: bodyDoc = {
      question: questionRef.current?.value,
      options: [
        {
          answer: aRef.current?.value,
          isCorrect: aRef.current?.value === answerRef.current?.value,
        },
        {
          answer: bRef.current?.value,
          isCorrect: bRef.current?.value === answerRef.current?.value,
        },
        {
          answer: cRef.current?.value,
          isCorrect: cRef.current?.value === answerRef.current?.value,
        },
        {
          answer: dRef.current?.value,
          isCorrect: dRef.current?.value === answerRef.current?.value,
        },
      ],
      answer: answerRef.current?.value,
    };
    // console.log(body)

    const { status, data } = await Axios.patch(
      `/api/question/${currQuestion.id}/update`,
      body
    );
    if (data.error) {
      console.log(data.error);
      setOpenModal(false);
      return;
    }
    if (status === 200) {
      console.log(data);
      setOpenModal(false);
      return;
    }
  }

  return (
    <>
      {openModal && (
        <Modal
          title={`Edit Question`}
          close={() => setOpenModal(false)}
          action={() => update()}
        >
          <form>
            <div className="form-group">
              <label htmlFor="question">Question</label>
              <textarea
                className="form-control"
                defaultValue={currQuestion?.question}
                ref={questionRef}
              ></textarea>
            </div>
            <div className="flex sm:flex-col md:flex-row">
              <div className="form-group">
                <label htmlFor="question">Option A</label>
                <input
                  className="form-control"
                  defaultValue={currQuestion?.options[0]?.answer}
                  ref={aRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="question">Option B</label>
                <input
                  className="form-control"
                  defaultValue={currQuestion?.options[1]?.answer}
                  ref={bRef}
                />
              </div>
            </div>
            <div className="flex sm:flex-col md:flex-row">
              <div className="form-group">
                <label htmlFor="question">Option C</label>
                <input
                  className="form-control"
                  defaultValue={currQuestion?.options[2]?.answer}
                  ref={cRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="question">Option D</label>
                <input
                  className="form-control"
                  defaultValue={currQuestion?.options[3]?.answer}
                  ref={dRef}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="question">Answer</label>
              <input
                className="form-control"
                defaultValue={currQuestion?.answer}
                ref={answerRef}
              />
            </div>
          </form>
        </Modal>
      )}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="border-b bg-gray-800 dark:bg-gray-900">
                  <tr>
                    {header &&
                      header.map((title: any, index: any) => (
                        <th
                          scope="col"
                          className="text-sm font-medium text-white px-6 py-4"
                          key={index}
                        >
                          {title}
                        </th>
                      ))}
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions &&
                    questions.map((question: any, index: any) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={index}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap overflow-ellipsis overflow-hidden">
                          {question.question}
                        </td>
                        <td className="flex space-x-2 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {question.options.map((option: any, index: any) => (
                            <div key={index} className="">
                              <span>{option.answer}</span>
                            </div>
                          ))}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {question.answer}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-4">
                            <button onClick={() => console.log(question.id)}>
                              <FaTrashAlt className="text-[1rem] text-red-500" />
                            </button>
                            <button onClick={() => editHandler(question)}>
                              <FaEdit className="text-[1rem] text-blue-500" />
                            </button>

                            {/* <Link href={`${url}/${id}/edit`}>
                            <FaTrashAlt className="text-red-500" />
                          </Link> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

export const CustomTable = ({ header, children }: any) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800 dark:bg-gray-900">
                <tr>
                  {header &&
                    header.map((title: any, index: any) => (
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4"
                        key={index}
                      >
                        {title}
                      </th>
                    ))}
                  {/* <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

type RowProps = {
  question: any;
  index: number;
  setInfo: (any: any) => void;
};

export const TableRow = ({ question, index, setInfo }: RowProps) => {
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const aRef = useRef<HTMLInputElement>(null);
  const bRef = useRef<HTMLInputElement>(null);
  const cRef = useRef<HTMLInputElement>(null);
  const dRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  async function updateHandler() {
    const body = {
      question: questionRef.current?.value,
      options: [
        {
          answer: aRef.current?.value,
          isCorrect: aRef.current?.value === answerRef.current?.value,
        },
        {
          answer: bRef.current?.value,
          isCorrect: bRef.current?.value === answerRef.current?.value,
        },
        {
          answer: cRef.current?.value,
          isCorrect: cRef.current?.value === answerRef.current?.value,
        },
        {
          answer: dRef.current?.value,
          isCorrect: dRef.current?.value === answerRef.current?.value,
        },
      ],
      answer: answerRef.current?.value,
    };
    console.log(body);

    const { status, data } = await Axios.patch(
      `/api/question/${question.id}/update`,
      body
    );
    if (data.error) {
      console.log(data.error);
      setInfo({ error: true, success: false, message: data.message });
      return;
    }
    if (status === 200) {
      console.log(data);
      setInfo({ error: false, success: true, message: data.message });
      return;
    }
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <textarea
          ref={questionRef}
          cols={100}
          className="form-control"
          defaultValue={question.question}
        ></textarea>
      </td>
      <td>
        <input
          ref={aRef}
          className="form-control"
          id="optiona"
          defaultValue={question.options[0]?.answer}
        />
      </td>
      <td>
        <input
          ref={bRef}
          className="form-control"
          id="optionb"
          defaultValue={question.options[1]?.answer}
        />
      </td>
      <td>
        <input
          ref={cRef}
          className="form-control"
          id="optionc"
          defaultValue={question.options[2]?.answer}
        />
      </td>
      <td>
        <input
          ref={dRef}
          className="form-control"
          id="optiond"
          defaultValue={question.options[3]?.answer}
        />
      </td>
      <td>
        <input
          ref={answerRef}
          className="form-control"
          id="answer"
          defaultValue={question.answer}
        />
      </td>
      <td>
        <button className="btn rounded-sm" onClick={() => updateHandler()}>
          Update
        </button>
      </td>
    </tr>
  );
};
