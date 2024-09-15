import React from 'react';
import { Box, Typography } from '@mui/material';

const BackgroundImage: React.FC = (): JSX.Element => {
    // Image Source URL
    const imageUrl = 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg';

    // Image Website Source URL for linking
    const imageSourceUrl = 'https://www.pexels.com/photo/island-during-golden-hour-and-upcoming-storm-1118873/';

    // Render Element
    return (
        <Box>
            <Typography variant='h5'> Image </Typography>
            {imageUrl ? (
                <a href={imageSourceUrl} target="_blank" rel="noopener noreferrer">
                    <img src={imageUrl} alt="Weather Picture" width="500" height="500"/>
                </a>
            ) : (
                <Typography variant='h6'> Loading </Typography>
            )}
        </Box>
    );
};

export default BackgroundImage;
