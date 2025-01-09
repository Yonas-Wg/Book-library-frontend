import React from 'react';
import { Box, TextField } from '@mui/material';

interface Props {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<Props> = ({ searchQuery, onSearchChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        padding: { xs: 2, md: 4 },
      }}
    >
      <TextField
        label="Search books by title, author, or ISBN"
        variant="outlined"
        value={searchQuery}
        onChange={onSearchChange}
        fullWidth
        sx={{
          maxWidth: '400px',
          '& .MuiOutlinedInput-root': {
            paddingRight: '8px',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
