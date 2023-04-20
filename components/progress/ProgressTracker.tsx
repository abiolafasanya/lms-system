import { Progress } from '@prisma/client';
import React from 'react';

type Iprops = {
    progress?: Progress[] 
    userId?: string;
    courseId?: string;
    lessonId?: string;
    taskId?: string
    assessment?: any;
    lastVisit?: string | Date;
    lastOperation?: any;
}


function ProgressTracker(props: Iprops) {

  const updateUserProgress = async ({userId, courseId, lessonId, taskId, progress, assessment, lastVisit, lastOperation}: Iprops) => {
    const response = await fetch('/api/update-user-progress', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        courseId,
        lessonId,
        taskId,
        progress,
        assessment,
        lastVisit,
        lastOperation,
      }),
    })
    const { userProgress } = await response.json()
  
    return userProgress
  }
  

    return (
      <div>
        <ul>
          {props?.progress?.map((item, index) => (
            <li key={index}>{item.courseId}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ProgressTracker