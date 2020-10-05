import React, { useState, useEffect } from "react";
import { useMajorsList } from '../Major';
import { useAuthUser } from "../Session";
import { MajorReviewsList } from "./MajorList";
import AddMajorReviewModal from "./AddMajorReviewModal";
import styled from "styled-components";
import Card from "react-bootstrap/Card";

const MajorReviews = ({ campus, major, setRatings }) => {
  const majorsList = useMajorsList();
  const authUser = useAuthUser();

  const INITIAL_STATE = {
    average: 0,
    count: 0,
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [reviews, setReviews] = useState([]);
  const [ratingsArray, setRatingsArray] = useState([]);

  useEffect(() => {
    // Filter list to only thos that have reviews and match the major
    const majorWithReviews = majorsList.filter((majorElement) => {
      return majorElement.reviews && major.uid === majorElement.uid;
    });
    if (majorWithReviews[0]) {
      // Add the uid to each review object
      const reviewsList = Object.keys(majorWithReviews[0].reviews).map(
        (key) => ({
          ...majorWithReviews[0].reviews[key],
          uid: key,
        })
      );

      // Filter list to the specific campus
      const campusMajorReviewList = reviewsList.filter((review) => {
        return review.campusUid === campus.uid;
      });

      setReviews(campusMajorReviewList);
      const scoreArray = campusMajorReviewList.map((review) => review.score);
      const length = scoreArray.length;
      const total = scoreArray.reduce((score, sum) => score + sum, 0);
      let average = total / length;
      if(isNaN(average)){
        average = 0;
      } 
      setRatings({ reviewCount: length, averageScore: average });
      setValues({ ...values, average, count: scoreArray.length });
      setRatingsArray(scoreArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [majorsList.length]);

  return (
    <>
      <Card>
        <Card.Header as="h5" className="text-center position-relative">
          Recent Reviews{" "}
          {authUser && (
            <AddMajorReviewModal
              campus={campus}
              major={major}
              ratingsArray={ratingsArray}
            />
          )}
        </Card.Header>
        <ReviewsBox>
          {reviews && <MajorReviewsList reviews={reviews} />}
        </ReviewsBox>
      </Card>
    </>
  );
};

export default MajorReviews;

const ReviewsBox = styled.div`
  max-height: 49rem;
  overflow-y: auto;
`;
