import React, { useState } from 'react';
import {Box, Button, Typography } from '@mui/material'

const ToggleSections: React.FC = (): JSX.Element => {
    // Use State for Section Index
    const [sectionIndex, setSectionIndex] = useState(0);
    const sectionArr: string[] = ['Section I', 'Section II', "Section III"];

    // Handle Section Index state when click "Prev"
    const handleTogglePrev = () => {
        setSectionIndex((currentIndex) => (currentIndex - 1 + sectionArr.length) % sectionArr.length);
    }

    // Handle Section Index state when click "Next"
    const handleToggleNext = () => {
        setSectionIndex((currentIndex) => (currentIndex + 1) % sectionArr.length);
    }

    // Render Element
    return (
        <Box>
            <Typography variant='h5'> Toggle Sections </Typography>
            <Typography variant='h6'> {sectionArr[sectionIndex]}</Typography>
            <Button variant='contained' onClick={handleTogglePrev}> Prev </Button>
            <Button variant='contained' onClick={handleToggleNext}> Next </Button>
        </Box>
    );
};

export default ToggleSections;