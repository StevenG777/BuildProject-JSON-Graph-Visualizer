import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

// Interface for SendDatatoParent
interface propsInterface {
    sendDataToParent(data: string): any
}

const TextEditor: React.FC<propsInterface> = ({ sendDataToParent }: propsInterface): JSX.Element => {
    // Use State for title data
    const [newTitle, setNewTitle] = useState<string>("");

    // Use Effect for setting default title
    useEffect(() => {
        setNewTitle(() => "React Project with Six Elements");
    }, [])

    // Handle title state when text changes in text field
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Value in BEFORE On Change -> ${e.target.value}`);
        console.log(`State related to BEFORE On Change -> ${newTitle}`);
        setNewTitle(() => e.target.value);
        console.log(`Value in AFTER On Change -> ${e.target.value}`);
        console.log(`State related to AFTER On Change -> ${newTitle}`);
    }

    // Handle title state and send data to parent tag when submit button clicked
    const handleOnClick = () => {
        if (newTitle === '') {
            console.log(`Value in On Click with Empty -> ${newTitle}`);
        }
        else {
            sendDataToParent(newTitle);
        }
    }

    // Render Element
    return (
        <Box>
            <Typography variant="h5"> Text Editor to Change Title </Typography>
            <TextField 
                variant="outlined"
                color='secondary'
                label="Title"
                value={newTitle} 
                helperText="Customize Your Title"
                onChange={handleOnChange}
            />
            <Button variant="contained" onClick={handleOnClick} > Submit Title Changes </Button>
        </Box>
    );
};

export default TextEditor;