import React from 'react';
import MajorItem from './MajorItem';
import {useMajorsList } from '../Major';

const MajorList = () => {
  const majors = useMajorsList();

  return (
    <ul>
      {majors.map((major) => (
        <MajorItem key={major.uid} major={major} />
      ))}
    </ul>
  );
};

const CampusMajorsList = ({ campus }) => {
  const majors = useMajorsList();

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

const MajorsOptionsList = () => {
  const majors = useMajorsList();
  return (
    <>
      {majors.map((major) => {
        return (
          <option key={major.uid} value={major.uid}>
            {major.name}
          </option>
        );
      })}
    </>
  );
};

export {CampusMajorsList, MajorsOptionsList}
export default MajorList;
