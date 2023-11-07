import CourseBar from './components/course-bar';
import CourseListing from './components/course-listing';

const Courses = () => {
  return (
    <div className="w-full h-full">
      <CourseBar />
      <CourseListing />
    </div>
  );
};

export default Courses;
