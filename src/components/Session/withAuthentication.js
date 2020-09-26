import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import AuthUserContext from './context';
import { CampusListContext } from '../Campus';

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const firebase = useFirebase();
    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem('authUser'))
    );
    const [campusList, setCampusList] = useState([]);

    // Get the authenticated User
    useEffect(() => {
      const unsubscribe = firebase.onAuthUserListener(
        (authUser) => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          setAuthUser(authUser);
        },
        () => setAuthUser(null)
      );
      return () => {
        localStorage.removeItem('authUser');
        unsubscribe();
      };
    }, [firebase]);


    // Get the full list of campuses
    useEffect(() => {
      firebase.campuses().on('value', (snapshot) => {
        const campusObject = snapshot.val();

        if (campusObject) {
          // convert campus list from snapshot
          const campusList = Object.keys(campusObject).map((key) => ({
            ...campusObject[key],
            uid: key,
          }));
          setCampusList(campusList);
        } else {
          setCampusList(null);
        }
      });
      return () => firebase.campuses().off();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("campusList", campusList);
    return (
      <AuthUserContext.Provider value={authUser}>
        <CampusListContext.Provider value={campusList}>
          <Component {...props} />
        </CampusListContext.Provider>
      </AuthUserContext.Provider>
    );
  };

  return WithAuthentication;
};

export default withAuthentication;
