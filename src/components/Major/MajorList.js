import React from 'react';
import MajorItem from './MajorItem';
import { useMajorsList } from '../Major';
import MajorReview from './MajorReview';
import Card from 'react-bootstrap/Card';

const MajorList = ({title}) => {
  const majors = useMajorsList();
  const sortedMajorByName = majors.sort((a, b) =>
    a.averageScore < b.averageScore ? 1 : -1
  );

  return (
    <Card>
      <Card.Header as='h5' className='text-center'>
        {title}
      </Card.Header>
      <div style={{ 'maxHeight': '15rem', 'overflowY': 'auto' }}>
        {sortedMajorByName.map((major, index) => (
          <MajorItem key={major.uid} index={index} major={major} />
        ))}
      </div>
    </Card>
  );
};

const MajorListByName = ({title}) => {
  const majors = useMajorsList();
  const sortedMajorByAverageScore = majors.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );

  return (
    <Card>
      <Card.Header as='h5' className='text-center'>
        {title}
      </Card.Header>
      <div style={{ 'maxHeight': '15rem', 'overflowY': 'auto' }}>
        {sortedMajorByAverageScore.map((major, index) => (
          <MajorItem key={major.uid} index={index} major={major} />
        ))}
      </div>
    </Card>
  );
};

const CampusMajorsList = ({ campus }) => {
  const majors = useMajorsList();
  const sortedMajorByAverageScore = majors.sort((a, b) =>
  a.averageScore < b.averageScore ? 1 : -1
  );

  let index = -1;
  return (
    <Card>
      <Card.Header as='h5' className='text-center'>
        Top Majors
      </Card.Header>
      <div style={{'maxHeight': '15rem', 'overflowY':'auto'}}>
      {sortedMajorByAverageScore.map((major) => {
        const isMajor = Object.values(major)[
          Object.keys(major).indexOf('schoolIds')
        ].includes(campus.uid);
        if (!isMajor) {
          return null;
        }
        index++;
        return (
          <MajorItem
            key={major.uid}
            index={index}
            major={major}
            campus={campus}
          />
        );
      })}
      </div>
    </Card>
  );
};

const MajorsOptionsList = () => {
  const majors = useMajorsList();
  const sortedMajorByName = majors.sort((a, b) =>
    a.name > b.name ? 1 : -1
  );
  return (
    <>
      {sortedMajorByName.map((major) => {
        return (
          <option key={major.uid} value={major.uid}>
            {major.name}
          </option>
        );
      })}
    </>
  );
};

const MajorReviewsList = ({ reviews }) => {
  const sortedMajorReviewsByTimeStamp = reviews.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return sortedMajorReviewsByTimeStamp.map((review) => {
    return <MajorReview key={review.uid} review={review} />;
  });
};

export { CampusMajorsList, MajorsOptionsList, MajorReviewsList, MajorListByName };
export default MajorList;
