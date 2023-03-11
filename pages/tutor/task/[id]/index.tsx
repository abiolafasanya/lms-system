import Tutor from '@layout/Tutor';
import { PrismaClient, Submission, Task, User } from '@prisma/client';
import { AlertMsg } from '@utility/Alert';
import Container from '@utility/Container';
import Modal from '@utility/Modal';
import Axios from 'helper/axios';
import classNames from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  MdDoneOutline,
  MdDragIndicator,
  MdOutlineAssignmentTurnedIn,
} from 'react-icons/md';
import {formatDate} from 'utility/formatter'

interface Iprops {
  submissions: Submission[];
  task: Task;
  data: TaskDoc;
  id: string;
}

interface TaskDoc extends Task{
  Submission: SM[]
}

interface SM extends Submission{
  user: User
}

const submission: NextPage<Iprops> = ({ data }) => {
  const [submissions, setSubmissions] = useState<SM[]>([]);
  const [task, setTask] = useState<TaskDoc>();
  const gradeRef = useRef<HTMLInputElement>(null)
  const feedbackRef = useRef<HTMLTextAreaElement>(null)

  const [isGradeModal, setIsGradeModal] = useState(false);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const [error, SetError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [currentGrading, setCurrentGrading] = useState<any>(null);
  const [currentFeedback, setCurrentFeedback] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    async function res() {
      const {data: DB, status} = await Axios.post(`/api/task/${data?.id}/tasks`);
      if(DB.error) {
        console.log(null)
        // return null
      }
      return DB.task
    }

    res().then(data => {
      setTask(data);
      setSubmissions(data.Submission);
    })

    // console.log(data);
    return () => {
      isMounted = false;
    };
  }, [success]);


  function pickIdAndOpenModal(e: any, submission: any) {
    setIsGradeModal(!isGradeModal);
    setIsFeedbackModal(false);
    setCurrentId(submission.id);
    setCurrentGrading(submission);
  }

  function showFeedback(e: any, submission: any) {
    setIsFeedbackModal(!isFeedbackModal);
    setIsGradeModal(false);
    setCurrentFeedback(submission);
    // console.log(submission);
  }
  async function gradeHandler() {
    // console.log('grade handler for ');

    let grade: string = gradeRef?.current?.value as string;
    let feedback: string = feedbackRef?.current?.value as string;


    if (grade === "") {
      SetError(true);
      setMessage('Please provide a score for this user');
      setTimeout(() => {
        SetError(false);
        setMessage('');
      }, 3000);
      return;
    }
    const formData = {
      score: grade,
      feedback,
      userId: currentGrading?.user?.id,
      taskId: task?.id,
    };

    

    const { data, status } = await Axios.post(
      `/api/task/${currentId}/submission`,
      formData
    );
    // console.log(data);

    if (data.error) {
      SetError(true);
      setMessage(data.error);
      setTimeout(() => {
        SetError(false);
        setMessage('');
      }, 3000);
      return;
    }

    if (status === 200 || status === 201) {
      setSuccess(true);
      setMessage('Task has been graded');
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
      }, 3000);
    }
  }

  function closeFeedback(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsFeedbackModal(false);
    setIsGradeModal(false);
  }

  function closeGradeModal(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsGradeModal(false);
    setIsFeedbackModal(false);
  }

  const checkClass = (graded: boolean = false) =>
    classNames(
      'flex justify-between my-2 items-center py-5 px-7 bg-white/50 border overflow-clip',
      {
        'border-l-4 border-l-emerald-500 bg-emerald-50  dark:text-emerald-900':
          graded,
      }
    );

  return (
    <div>
      <Tutor>
        <Container className={`h-screen`}>
          <h2 className='text-2xl mb-3'>Submissions</h2>
          <h2 className='text-base'><Link href="/tutor/task">Task</Link> &larr; {data.id}</h2>
          {/* <div>Deadline for submission: {formatDate(new Date(task.deadline))}</div> */}
          {isFeedbackModal && (
            <Modal
              title="Task Feedback"
              action={showFeedback}
              close={closeFeedback}
              hideConfirm={true}
              key={Date.now()}
            >
              <div>
                <h2 className="font-semibold text-blue-600">Feedback:</h2>
                <p className="text-base">{currentFeedback?.feedback}</p>
              </div>
              <div>
                <h2 className="font-semibold text-blue-600">Feedback By:</h2>
                <p className="text-base">Tutor</p>
              </div>
              <div>
                <h2 className="font-semibold text-blue-600">Time</h2>
                <div className="text-base">
                {
                  currentFeedback?.gradedAt ? 
                    (new Date(currentFeedback?.gradedAt).toLocaleString())
                   : <span>N/A</span>
                }
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-blue-600">Re-Graded:</h2>
                <p className="text-base">
                  {currentFeedback?.graded ? 'Graded' : 'Not Graded'}
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-blue-600">Re-Graded:</h2>
                <p className="text-base">
                  {currentFeedback?.regraded ? 'Regraded' : 'Not Regraded'}
                </p>
              </div>
            </Modal>
          )}
          {isGradeModal && (
            <Modal
              title="Grade Task"
              action={gradeHandler}
              close={closeGradeModal}
              key={Date.now()}

            >
              {error && <AlertMsg message={message} type="alert-error " />}
              {success && <AlertMsg message={message} type="alert-success" />}
              <form>
                <div className="form-group">
                  <label htmlFor="grade" className="form-label">
                    Grade
                  </label>
                  <input
                    type="number"
                    id="grade"
                    defaultValue={currentGrading?.score}
                    // onCopy={e => console.log(e)}
                    className="form-control"
                    ref={gradeRef}
                    // onChange={({ target }) => setGrade(target.value)}
                    min={0}
                    max={100}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="feedback" className="form-label">
                    Feedback
                  </label>
                  <textarea
                    cols={5}
                    className="text-area"
                    // contentEditable={true}
                    placeholder="Feedback"
                    id='feedback'
                    name='feedback'
                    itemID='feedback'
                    key={Date.now()}
                    defaultValue={currentGrading?.feedback}
                    ref={feedbackRef}
                    // onChange={({ target }) => setFeedback(target.value)}
                    maxLength={255}
                  ></textarea>
                </div>
              </form>
            </Modal>
          )}

          {submissions?.length > 0 ? (
            submissions?.map((submission) => (
              <div
                key={submission.id}
                draggable
                className={checkClass(submission?.graded)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex space-x-4 items-center text-gray-700">
                    <MdDragIndicator className="text-xl" />
                    <MdOutlineAssignmentTurnedIn />
                    <span className="font-bold">{task?.title}</span>
                    {submission?.graded && (
                      <MdDoneOutline className="text-emerald-500" />
                    )}
                  </div>
                  <div>
                    {submission.user?.username ||
                      submission?.user?.email ||
                      submission?.user?.name}
                  </div>
                  <div className=" text-emerald-900">
                    {/* {new Date(task?.deadline as Date).toLocaleString()} */}
                    {formatDate(new Date(submission?.submittedAt as Date))}
                  </div>
                  <div className="text-emerald-900">{submission?.score}</div>
                  <div className="flex space-x-4">
                    <button
                      className="btn bg-green-500 hover:bg-green-600 text-green-900"
                      onClick={(e) => pickIdAndOpenModal(e, submission)}
                    >
                      {submission.graded ? 'Regrade' : 'Grade'}
                    </button>
                    <button
                      className="btn bg-amber-500 hover:bg-amber-600 text-amber-900"
                      onClick={(e) => showFeedback(e, submission)}
                    >
                      Feedback
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert-info">You have no submissions</div>
          )}
        </Container>
      </Tutor>
    </div>
  );
};

export default submission;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const id = context.params?.id as string;
  const task = await prisma.task.findUnique({
    where: { id: id },
    include: {
      Submission: {
        include: { user: true },
      },
    },
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(task)),
      editor: [],
      id: id
    },
  };
};

