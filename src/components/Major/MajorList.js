import React from 'react';
import MajorItem from './MajorItem';
import { useMajorsList } from '../Major';

const MajorList = () => {
  const majors = useMajorsList();

  return (
    <ul className="list-group">
      {majors.map((major, index) => (
        <MajorItem key={major.uid} index={index} major={major} />
      ))}
    </ul>
  );
};


const CampusMajorsList = ({ campus }) => {
  const majors = useMajorsList();

  return (
    <ul className="list-group">
      {majors.map((major, index) => {
        const isMajor = Object.values(major)[Object.keys(major).indexOf('schoolIds')].includes(campus.uid)
        if (!isMajor) {
          return null;
        }
        return <MajorItem key={major.uid} index={index} major={major} campus={campus} />;
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

export { CampusMajorsList, MajorsOptionsList }
export default MajorList;
