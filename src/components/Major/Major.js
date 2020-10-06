import React from "react";
import {useMajorsList} from '../Major';
import MajorList from "./MajorList";

const Major = ({title}) => {
  const majorsList = useMajorsList();
  return (
    <>
      {majorsList ? (
        <MajorList title={title}/>
      ) : (
        <div>There are no majors...</div>
      )}
    </>
  );
};

export default Major;
