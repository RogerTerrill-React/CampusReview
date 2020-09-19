import React from 'react';

const CampusList = ({ campuses }) => {
  return (
    <ul>
      {campuses.map((campus) => {
        return (
        <li key={campus.uid}>{campus.name}</li>
      )})}
    </ul>
  );
};

const CampusOptionsList = ({ campuses }) => {
  return (
    <>
      {campuses.map((campus) => {
        return (
          <option key={campus.uid} value={campus.uid}>{campus.name}</option>
      )})}
    </>
  );
}
export {CampusOptionsList};
export default CampusList;
