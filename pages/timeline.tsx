import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import { Progress } from '@prisma/client';
import ProgressTracker from 'components/progress/ProgressTracker';
import { NextPage } from 'next';
import React, {useState} from 'react'
import {useSession} from 'next-auth/react'

type IProgress = {
    progress?: Progress[]
}

const index: NextPage<IProgress> = (props) => {
  const {data: session} = useSession();
    const [progress, setProgress] = useState<Progress[]>();

    function completeLesson(body: any) {
      const data ={
        ...body,
        userId: session?.user.id,
      }
        setProgress(data);
      }

  return (
    <Dashboard>
      <Container>
        Course progress
        <ProgressTracker progress={progress} />
      <button className="btn" onClick={completeLesson}>Complete Lesson 1</button>
      </Container>
    </Dashboard>
  )
}

export default index