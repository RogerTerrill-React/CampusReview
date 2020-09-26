import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import CampusList from './CampusList';
import {useCampusList } from '../Campus';

const Campus = () => {

  const campuses = useCampusList();

  const [loading, setLoading] = useState(false);

  return (
    <>
    <h1>Campuses List</h1>
      {loading && <div>Loading...</div>}
      {campuses ? (
        <CampusList/>
      ) : (
        <div>There are no campuses...</div>
      )}
    </>
  );
};

export default Campus;
