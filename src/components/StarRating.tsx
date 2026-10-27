import React from 'react';
import { StarIcon } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
  iconClassName?: string;
}

export function StarRating({ rating, className = '', iconClassName = 'h-4 w-4' }: StarRatingProps) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`} role="img">
      {[0, 1, 2, 3, 4].map((i) =>
      <StarIcon
        key={i}
        aria-hidden="true"
        className={`${iconClassName} ${i < Math.round(rating) ? 'fill-current' : 'fill-transparent opacity-30'}`} />

      )}
    </span>);

}