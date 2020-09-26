import { createContext, useContext } from 'react';

const CourseListContext = createContext(null);

const useCourseList = () => {
  return useContext(CourseListContext);
}

export { useCourseList };
export default CourseListContext;
