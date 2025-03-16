import React from "react";
import "./rating.css";

interface RatingProps {
  rating: number; 
  onRate?: (value: number) => void;
  editable?: boolean;
  size?: number; 
}

const Rating: React.FC<RatingProps> = ({ rating, onRate, editable = false, size = 30  }) => {
    return (
      <div className="rating" style={{ fontSize: `${size}px` }}>
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              type="radio"
              id={`star${star}`}
              name="rate"
              value={star}
              checked={rating === star}
              onChange={() => editable && onRate?.(star)}
              disabled={!editable}
            />
            <label htmlFor={`star${star}`} className={rating >= star ? "filled" : ""}></label>
          </React.Fragment>
        ))}
      </div>
    );
  };  

export default Rating;
