import React from 'react';
import CampusItem from './CampusItem';

const CampusList = ({ campuses }) => {
  return (
    <ul>
      {campuses.map((campus) => {
        return <CampusItem key={campus.uid} campus={campus} />;
      })}
    </ul>
  );
};

const CampusOptionsList = ({ campuses }) => {
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
