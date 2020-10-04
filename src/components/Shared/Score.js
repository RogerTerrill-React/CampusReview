import React from 'react';

const Score = ({ ratings }) => {

  return (
    <>
      <h4 className='text-center'>
        Overall score is {ratings.averageScore.toFixed(2)} based on{' '}
        {ratings.reviewCount} reviews
        </h4>
    </>
  )
}

export default Score;
