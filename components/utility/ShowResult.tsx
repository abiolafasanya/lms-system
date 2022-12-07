import Image from 'next/image';
import React from 'react';
import { MdRefresh } from 'react-icons/md';
import { useRouter } from 'next/router';

const ShowResult = ({ score, questions }: any) => {
  const router = useRouter();
  return (
    <div className="md:mx-auto md:w-3/4 py-5">
      <div className="logo flex justify-center items-center">
        <Image
          src="/completed-bro.png"
          height={256}
          width={256}
          alt="check result"
        />
        <h1 className="text-2xl">You Examination has just ended</h1>
      </div>
      <div className="statistic card">
        <h1 className="text-3xl font-semibold text-center text-black">
          {/* You scored {score} out of {questions.length} */}
          You Score is {(score / questions.length) * 100}%
        </h1>
        <h2 className="text-2xl">Statistic</h2>
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
        {/* <div className="flex justify-between items-center my-2 p-5 bg-gray-300">
          <div className="font-bold capitalize">Score</div>
          <div>{score}</div>
        </div> */}
        <div>
          <button
            className="btn text-lg items-center px-7 py-3 flex space-x-3"
            onClick={() => router.push('/exam')}
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
