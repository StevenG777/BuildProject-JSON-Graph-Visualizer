import React, {useState} from 'react';
import { Button, Typography, Box } from '@mui/material';

// Interface for title data
interface propsInterface {
    title: string;
}

const ProjectInfo: React.FC<propsInterface> = ({ title }: propsInterface): JSX.Element => {
    // Use State for count
    const [count, setCount] = useState(0);

    // Render Element
    return (
       <Box>
            <Typography variant='h3'> {title} </Typography>
            <Typography variant='h6'> By Baixi Guo </Typography>

            <Typography variant='h5'> Counts: {count >= 0? count: 0} </Typography>
            <Button variant='contained' onClick={() => setCount(() => count === 0? 0: count - 1)}> Decrement - </Button>
            <Button variant='contained' onClick={() => setCount(() => count + 1)}>                 Increment + </Button>            
       </Box>
    );
};

export default ProjectInfo;