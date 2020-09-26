import React from 'react';
import CampusItem from './CampusItem';
import { useCampusList } from '../Campus';

const CampusList = () => {
  const campuses = useCampusList();
  return (
    <ul>
      {campuses.map((campus) => {
        return <CampusItem key={campus.uid} campus={campus} />;
      })}
    </ul>
  );
};

const CampusOptionsList = () => {
  const campuses = useCampusList();
  return (
    <>
      {campuses.map((campus) => {
        return (
          <option key={campus.uid} value={campus.uid}>
            {campus.name}
          </option>
        );
      })}
    </>
  );
};
export { CampusOptionsList };
export default CampusList;
