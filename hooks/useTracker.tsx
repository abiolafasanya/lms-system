import { useContext } from 'react';
import TrackContext from 'context/TrackerProvider';

const useTracker = () => {
  return useContext(TrackContext);
};

export default useTracker;
