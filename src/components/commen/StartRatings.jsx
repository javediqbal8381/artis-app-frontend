import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StartRatings = ({ rating, detail, handleStarClick }) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round rating to nearest 0.5        

    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            // Full star
            stars.push(<FaStar onClick={ () => handleStarClick(i)} className={detail ?`hover:scale-150 cursor-pointer`: ''} key={i} color="#FFD700" />);
        } else if (i - 0.5 === roundedRating) {
            // Half star
            stars.push(<FaStarHalfAlt onClick={ () => handleStarClick(i)} className={detail ?`hover:scale-150 cursor-pointer`: ''} key={i} color="#FFD700" />);
        } else {
            // Empty star
            stars.push(<FaRegStar onClick={ () => handleStarClick(i)} className={detail ?`hover:scale-150 cursor-pointer`: ''} key={i} color="#FFD700" />);
        }
    }

    return (
        <div className='flex'>
            {stars}
        </div>
    );
};

export default StartRatings;
