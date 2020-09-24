import React from 'react';
import MajorItem from './MajorItem';

const MajorList = ({ majors }) => {
  return (
    <ul>
      {majors.map((major) => (
        <MajorItem key={major.uid} major={major} />
      ))}
    </ul>
  );
};

export default MajorList;
