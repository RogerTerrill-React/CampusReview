import React from 'react'

const MajorList = ({majors}) => {
  return (
    <ul>
      {majors.map((major) => (
        <li key={major.uid}>{major.name}</li>
      ))}
    </ul>
  )
}

export default MajorList
