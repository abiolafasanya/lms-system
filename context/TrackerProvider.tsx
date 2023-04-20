import React, { useState, useEffect, createContext } from 'react';
import { Progress, Assessment } from '@prisma/client';
import { PropTypes } from 'utility/types';
import Axios from 'helper/axios';
import { useLocalStorage } from 'hooks/useLocalStorage';

const TrackContext = createContext({} as defaultTypes);

type progressType = {
  userId?: string | null;
  courseId?: string | null;
  lessonId?: string | null;
  taskId?: string | null;
  progress?: Progress | null;
  assessment?: Assessment | null;
  lastVisit?: string | Date;
  lastOperation?: string;
  isCompleted?: boolean | null;
};

interface defaultTypes {
  setTracker: React.Dispatch<React.SetStateAction<{}>>;
  recordVisit: (id: string) => void;
  lastVisit: visitType[];
  setLastVisit: React.Dispatch<React.SetStateAction<visitType[]>>;
  tracker: {};
}

 
type visitType = {
  id: string;
  date: string;
};

export const TrackerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tracker, setTracker] = useState({});
  useEffect(() => {
    console.log(tracker, 'user tracker');
  }, [tracker]);

  const [lastVisit, setLastVisit] = useLocalStorage<visitType[]>(
    'lastVisit',
    []
  );

  async function userTracker(body: progressType) {
    const { data } = await Axios.post('/api/progress', body).then(
      (response) => response
    );
    return { data };
  }

  function recordVisit(id: string) {
    setLastVisit((visits) => {
      if (visits.find((visit) => visit.id === id) == null) {
        return [
          ...visits,
          { id, date: new Date(Date.now()).toLocaleDateString() },
        ];
      } else {
        return visits.map((visit) => {
          if (visit.id === id) {
            return {
              ...visit,
              date: new Date(Date.now()).toLocaleDateString(),
            };
          } else {
            return visit;
          }
        });
      }
    });
  }

  return (
    <TrackContext.Provider
      value={{ tracker, setTracker, recordVisit, lastVisit, setLastVisit }}
    >
      {children}
    </TrackContext.Provider>
  );
};

export default TrackContext
