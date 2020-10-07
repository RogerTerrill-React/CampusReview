import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { useLocation } from 'react-router-dom';

const MajorItem = ({ major, campus, index }) => {
  const location = useLocation();

  const [average, setAverage] = useState(0);

  useEffect(() =>{
    if (major.reviews && campus) {
      const campusMajorReviewsList = Object.values(major.reviews);
      const scoreArray = campusMajorReviewsList.map((review) => {
        if(review.campusUid !== campus.uid) {
          return null;
        }
        return review.score
      });
      const length = scoreArray.length;
      const total = scoreArray.reduce((score, sum) => score + sum, 0);
      setAverage(isNaN(total / length) ? 0 : total / length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isHome = location.pathname === '/home';

  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <Link
        to={{
          pathname: `${ROUTES.MAJOR}/${major.uid}`,
          state: { major, campus },
        }}
      >
        {index + 1}. {major.name} ({major.code})
      </Link>
      <span className='badge badge-primary badge-pill'>
        {!isHome && average.toFixed(2)}
      </span>
    </li>
  );
};

export default MajorItem;
