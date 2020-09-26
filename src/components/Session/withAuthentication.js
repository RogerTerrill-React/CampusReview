import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Firebase';
import AuthUserContext from './context';
import { CampusListContext } from '../Campus';
import { MajorsListContext } from '../Major';
import { CourseListContext } from '../Course';

const withAuthentication = (Component) => {
  const WithAuthentication = (props) => {
    const firebase = useFirebase();
    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem('authUser'))
    );
    const [campusList, setCampusList] = useState([]);
    const [majorsList, setMajorsList] = useState([]);
    const [courseList, setCourseList] = useState([]);

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

    // Get the full list of majors
    useEffect(() => {
      firebase.majors().on('value', (snapshot) => {
        const majorsSnapshot = snapshot.val();

        if (majorsSnapshot) {
          // convert campus list from snapshot
          const majorsList = Object.keys(majorsSnapshot).map((key) => ({
            ...majorsSnapshot[key],
            uid: key,
          }));
          setMajorsList(majorsList);
        } else {
          setMajorsList(null);
        }
      });
      return () => firebase.majors().off();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Get the full list of majors
    useEffect(() => {
      firebase.courses().on('value', (snapshot) => {
        const coursesSnapshot = snapshot.val();

        if (coursesSnapshot) {
          // convert campus list from snapshot
          const coursesList = Object.keys(coursesSnapshot).map((key) => ({
            ...coursesSnapshot[key],
            uid: key,
          }));
          setCourseList(coursesList);
        } else {
          setCourseList(null);
        }
      });
      return () => firebase.courses().off();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <CampusListContext.Provider value={campusList}>
          <MajorsListContext.Provider value={majorsList}>
            <CourseListContext.Provider value={courseList}>
              <Component {...props} />
            </CourseListContext.Provider>
          </MajorsListContext.Provider>
        </CampusListContext.Provider>
      </AuthUserContext.Provider>
    );
  };

  return WithAuthentication;
};

export default withAuthentication;
