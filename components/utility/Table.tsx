import Link from 'next/link';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import classNames from 'classnames';
const questions = [
  {
    question: 'what is the name of the person ',
    options: [
      { answer: 'abiola', isCorrect: true },
      { answer: 'john', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
    ],
    answer: 'abiola',
    id: 'abiolasdfjklasdf',
  },
  {
    question: 'what is the name of the person ',
    options: [
      { answer: 'abiola', isCorrect: true },
      { answer: 'john', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
    ],
    answer: 'abiola',
    id: 'abiolasdfjklasdf',
  },
  {
    question: 'what is the name of the person ',
    options: [
      { answer: 'abiola', isCorrect: true },
      { answer: 'john', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
    ],
    answer: 'abiola',
    id: 'abiolasdfjklasdf',
  },
  {
    question: 'what is the name of the person ',
    options: [
      { answer: 'abiola', isCorrect: true },
      { answer: 'john', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
    ],
    answer: 'abiola',
    id: 'abiolasdfjklasdf',
  },
  {
    question: 'what is the name of the person ',
    options: [
      { answer: 'abiola', isCorrect: true },
      { answer: 'john', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
      { answer: 'abiola', isCorrect: false },
    ],
    answer: 'abiola',
    id: 'abiolasdfjklasdf',
  },
];

const header = ['S/N', 'Question', 'Options', 'Answer'];

const Table = ({ header, questions, id }: any) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
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
                        <div className="flex space-x-2">
                          <button onClick={() => console.log(question.id)}>
                            <FaTrashAlt className="text-red-500" />
                          </button>

                          <Link href={`/assessment/${id}/edit`}>
                            <FaEdit className="text-blue-500" />
                          </Link>
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
              <thead className="border-b bg-gray-800">
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
