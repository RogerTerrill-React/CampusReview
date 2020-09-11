import React from 'react'

const CourseLIst = ({courses}) => {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.uid}>{course.name}</li>
      ))}
    </ul>
  )
}

export default CourseLIst
