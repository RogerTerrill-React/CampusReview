import React from 'react';

const CampusList = ({ campuses }) => {
  return (
    <ul>
      {campuses.map((campus) => (
        <li key={campus.uid}>{campus.name}</li>
      ))}
    </ul>
  );
};

export default CampusList;
