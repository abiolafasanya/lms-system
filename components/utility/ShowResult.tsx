import Image from 'next/image';
import React, {useEffect} from 'react';
import { MdRefresh } from 'react-icons/md';
import { useRouter } from 'next/router';
import Axios from 'helper/axios';
import { Assessment } from '@prisma/client';

interface Iprops {
  score: number;
  questions: any[];
  user?: userDoc | undefined;
  assessment?: Assessment;
 }

type userDoc = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined; 
  image?: string | null | undefined; 
  role?: string | null | undefined;
}

const ShowResult = ({ score, questions, user, assessment }: Iprops) => {
  const router = useRouter();

  useEffect(() => {
    if(assessment?.id !== undefined){
      gradeAssessment();
    }
  }, [])

  async function gradeAssessment() {
    const body = {
      assessmentScore: score,
      userId: user?.id,
      assessmentId: assessment?.id,
    };
    const { status, data } = await Axios.post('/api/grade', body);
    if (data.error) {
      console.log('error occured', data.error);
      return;
    }
    if (status === 200) {
      console.log('graded');
      return;
    }
  }

  return (
    <div className="md:mx-auto md:w-3/4 py-5">
      <div className="logo flex justify-center items-center">
        <Image
          src="/completed-bro.png"
          height={256}
          width={256}
          alt="check result"
        />
        <h1 className="text-2xl">You Assessment has just ended</h1>
      </div>
      <div className="statistic card">
        <h1 className="text-3xl font-semibold text-center text-black">
          {/* You scored {score} out of {questions.length} */}
          You Score is {(score / questions.length) * 100}%
        </h1>
        <h2 className="text-2xl">Statistic</h2>
        <div className="flex justify-between items-center my-2 p-5 bg-gray-300">
          <div className="font-bold capitalize">Name</div>
          <div>{user?.name}</div>
        </div>
        <div className="flex justify-between items-center my-2 p-5 bg-gray-300">
          <div className="font-bold capitalize">Score</div>
          <div>{score}</div>
        </div>
        <div className="flex justify-between items-center my-2 p-5 bg-gray-300">
          <div className="font-bold capitalize">Total Question</div>
          <div>{questions.length}</div>
        </div>
        <div className="flex justify-between items-center my-2 p-5 bg-gray-300">
          <div className="font-bold capitalize">Total Correct</div>
          <div>{score}</div>
        </div>

        <div>
          <button
            className="btn text-lg items-center px-7 py-3 flex space-x-3"
            onClick={() => router.reload()}
          >
            {' '}
            <MdRefresh className="text-[24px]" /> Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
