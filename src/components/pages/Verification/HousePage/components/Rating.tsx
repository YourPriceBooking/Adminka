import React, { useState } from 'react';

import { DivRating, DivRatComp } from './Components.styled';

type RatingComponentProps = {
  rating: number | null;
};
export const RatingComponent: React.FC<RatingComponentProps> = ({ rating }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <DivRating onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DivRatComp>{rating}</DivRatComp>
      {isHovered && (
        <div>
          <div>
            <div>{rating}</div>
          </div>
        </div>
      )}
    </DivRating>
  );
};
