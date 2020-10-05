import React from 'react';
import CampusItem from './CampusItem';
import { useCampusList } from '../Campus';
import CampusReview from './CampusReview';
import Card from 'react-bootstrap/Card';


const CampusList = () => {
  const campuses = useCampusList();
  const sortedCampusByAverageScore = campuses.sort((a, b) => (a.averageScore < b.averageScore) ? 1 : -1)

  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        Top Campuses
      </Card.Header>
      {sortedCampusByAverageScore.map((campus, index) => {
        return <CampusItem key={campus.uid} index={index} campus={campus} />;
      })}
    </Card>
  );
};

const CampusesByMajorList = ({ major }) => {
  const campuses = useCampusList();
  const schoolIds = major.schoolIds;
  const sortedCampusByAverageScore = campuses.sort((a, b) => (a.averageScore < b.averageScore) ? 1 : -1)
  let index = -1;
  return (
    <Card>
      <Card.Header as="h5" className="text-center">
        Campuses Offering {major.name}
      </Card.Header>
      {sortedCampusByAverageScore.map((campus) => {

        const isCampus = schoolIds.includes(campus.uid);
        if (!isCampus) {
          return null;
        }
        index++;
        return <CampusItem key={campus.uid} index={index} major={major} campus={campus} />;
      })}
    </Card>
  )
}

const CampusOptionsList = () => {
  const campuses = useCampusList();
  const sortedCampusByAverageScore = campuses.sort((a, b) => (a.name > b.name) ? 1 : -1)
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

const CampusReviewsList = ({ reviews }) => {
  const sortedCampusReviewsByTimeStamp = reviews.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)

  return sortedCampusReviewsByTimeStamp.map(review => {
    return <CampusReview key={review.uid} review={review} />
  }
  )
}
export { CampusOptionsList, CampusesByMajorList, CampusReviewsList };
export default CampusList;

