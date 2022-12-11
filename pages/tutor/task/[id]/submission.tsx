import Dashboard from '@layout/Dashboard';
import { PrismaClient, Submission, Task, User } from '@prisma/client';
import { AlertMsg } from '@utility/Alert';
import Container from '@utility/Container';
import Modal from '@utility/Modal';
import Axios from 'api/axios';
import classNames from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import task from 'pages/api/task';
import React, { useState, useEffect } from 'react';
import {
  MdDoneOutline,
  MdDragIndicator,
  MdOutlineAssignmentTurnedIn,
} from 'react-icons/md';

type Props = { submissions: Submission[]; task: Task };
const submission: NextPage = ({ data }: Props | any) => {
  const [submissions, setSubmissions] = useState<Submission[] | any[]>([]);
  const [task, setTask] = useState<Task>();
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
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
    const controller = new AbortController();
    setSubmissions(data.Submission);
    setTask(data);
    console.log(data);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
    console.log(submission);
  }
  async function gradeHandler() {
    console.log('grade handler for ');
    if (grade === '') {
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
      gradedAt: Date.now().toLocaleString(),
    };

    const { data, status } = await Axios.post(
      `/api/task/${currentId}/submission`,
      formData
    );
    console.log(data);

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
      <Dashboard>
        <Container className={`h-screen dark:text-black`}>
          {isFeedbackModal && (
            <Modal
              title="Task Feedback"
              action={showFeedback}
              close={closeFeedback}
              hideConfirm={true}
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
                <p className="text-base">
                  {new Date(currentFeedback?.gradedAt).toLocaleString()}
                </p>
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
                    onChange={({ target }) => setGrade(target.value)}
                    min={0}
                    max={100}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Feedback
                  </label>
                  <textarea
                    cols={5}
                    className="text-area"
                    contentEditable={true}
                    placeholder="Feedback"
                    defaultValue={currentGrading?.feedback}
                    onChange={({ target }) => setFeedback(target.value)}
                    maxLength={255}
                  ></textarea>
                </div>
              </form>
            </Modal>
          )}

          {submissions.length > 0 ? (
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
                    {submission?.user?.username ||
                      submission?.user?.email ||
                      submission?.user?.name}
                  </div>
                  <div className=" text-emerald-900">
                    {new Date(task?.deadline as Date).toLocaleString()}
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
      </Dashboard>
    </div>
  );
};

export default submission;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const id = context.params?.id as string;
  const task = await prisma.task.findFirst({
    where: { id: id },
    include: {
      Submission: {
        include: { user: true },
      },
    },
  });
  //   const task = await prisma.submission.findMany({
  //     where: { taskId: id },
  //     include: {
  //       task: {
  //         select: {
  //           id: true,
  //           title: true,
  //         },
  //       },
  //     },
  //   });

  return {
    props: {
      data: JSON.parse(JSON.stringify(task)),
      editor: [],
    },
  };
};
