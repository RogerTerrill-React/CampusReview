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

const CampusesByMajorList = ({ major }) => {
  const campuses = useCampusList();
  const schoolIds = major.schoolIds;
  console.log(schoolIds);

  return (
    <ul>
      {campuses.map((campus) => {

        const isCampus = schoolIds.includes(campus.uid);
        if (!isCampus) {
          return null;
        }
        return <CampusItem key={campus.uid} major={major} campus={campus} />;
      })}
    </ul>
  )
}

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
export { CampusOptionsList, CampusesByMajorList  };
export default CampusList;
