import React from 'react';
import CampusList from './CampusList';
import {useCampusList } from '../Campus';

const Campus = () => {

  const campuses = useCampusList();

  // const [loading, setLoading] = useState(false);

  return (
    <>
    {/* {loading && <div>Loading...</div>} */}
      {campuses ? (
        <CampusList/>
      ) : (
        <div>There are no campuses...</div>
      )}
    </>
  );
};

export default Campus;
