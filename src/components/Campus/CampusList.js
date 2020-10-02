import React from 'react';
import CampusItem from './CampusItem';
import { useCampusList } from '../Campus';

const CampusList = () => {
  const campuses = useCampusList();
  const sortedCampusByAverageScore = campuses.sort((a,b) => (a.averageScore < b.averageScore) ? 1 : -1)

  return (
    <ul className="list-group">
      {sortedCampusByAverageScore.map((campus, index) => {
        return <CampusItem key={campus.uid} index={index} campus={campus} />;
      })}
    </ul>
  );
};

const CampusesByMajorList = ({ major }) => {
  const campuses = useCampusList();
  const schoolIds = major.schoolIds;
  const sortedCampusByAverageScore = campuses.sort((a,b) => (a.averageScore < b.averageScore) ? 1 : -1)
  let index = -1;
  return (
    <ul className="list-group">
      {sortedCampusByAverageScore.map((campus) => {

        const isCampus = schoolIds.includes(campus.uid);
        if (!isCampus) {
          return null;
        }
        index++;
        return <CampusItem key={campus.uid} index={index} major={major} campus={campus} />;
      })}
    </ul>
  )
}

const CampusOptionsList = () => {
  const campuses = useCampusList();
  const sortedCampusByAverageScore = campuses.sort((a,b) => (a.name > b.name) ? 1 : -1)
  return (
    <>
      {sortedCampusByAverageScore.map((campus) => {
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
