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

const MajorListLinks = ({ campus, majors}) => {
  return (
    <ul>
      {majors.map((major) => {
        const isMajor = Object.values(major)[Object.keys(major).indexOf('schoolIds')].includes(campus.uid)
        if(!isMajor){
          return null;
        }
        return <MajorItem key={major.uid} major={major} />;
      })}
    </ul>
  );
}

export {MajorListLinks}
export default MajorList;
