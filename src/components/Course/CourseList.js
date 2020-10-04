import React from "react";
import CourseItem from "./CourseItem";
import { useCourseList } from "../Course";
import Card from "react-bootstrap/Card";

// Fill courses list
const CourseList = () => {
  const courses = useCourseList();
  const sortedCourseByAverageScore = courses.sort((a, b) =>
    a.averageScore < b.averageScore ? 1 : -1
  );

  return courses ? (
    <ul className="list-group">
      {sortedCourseByAverageScore.map((course, index) => (
        <CourseItem key={course.uid} index={index} course={course} />
      ))}
    </ul>
  ) : (
    <p>No courses</p>
  );
};

const CampusMajorCoursesList = ({ campus, major }) => {
  const courses = useCourseList();
  const sortedCourseByAverageScore = courses.sort((a, b) =>
    a.averageScore < b.averageScore ? 1 : -1
  );
  let index = -1;

  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        Curriculum
      </Card.Header>
      {sortedCourseByAverageScore.map((course) => {
        const isCourse =
          major.uid === course.majorId && campus.uid === course.schoolId;

        if (!isCourse) {
          return null;
        }
        index++;
        return <CourseItem key={course.uid} index={index} course={course} />;
      })}
    </Card>
  );
};

export { CampusMajorCoursesList };
export default CourseList;
