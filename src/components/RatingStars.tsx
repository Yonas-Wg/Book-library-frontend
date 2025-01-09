import { Box } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const emptyStars = totalStars - filledStars;

  return (
    <Box sx={{ display: 'flex' }}>
      {Array.from({ length: filledStars }).map((_, index) => (
        <Star key={`filled-${index}`} sx={{ color: '#ffd700' }} />
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <StarBorder key={`empty-${index}`} sx={{ color: '#ffd700' }} />
      ))}
    </Box>
  );
};

export default RatingStars;
