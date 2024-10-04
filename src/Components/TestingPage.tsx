import React, { useState, useEffect } from 'react';
import JSOND3TidyTree from './JSOND3TidyTree';
import jsonToD3Hierarchy from '../Utilities/jsonToD3Hierarchy';
import FileUpload from './FileUpload';
import { Typography, Button, ButtonGroup, Container } from '@mui/material';

const TestingPage: React.FC = (): JSX.Element => {
    // Save the JSONvdata as a prop pass from <FileUpload>
    const [jsonData, setJsonData] = useState<any>(null);
    // Save the JSON data pass as a prop to <JSONView>
    const [d3Data, setD3Data] = useState<any>(null);

    // Use it to communicate between <FileUpload>, <JSONRecrusiveMUITree> and <JSOND3TidyTree>
    const sendDataFromChild = (jsonData: any) => {
        setJsonData(jsonData);
    }

    // Convert jsonData to D3 data used for <JSOND3TidyTree>
    useEffect(() => {
        if (jsonData !== null){
            setD3Data(jsonToD3Hierarchy(jsonData));
        }
    }, [jsonData]);

    // Render JSON Hierarchy View Elements
    return (
        <Container className='JSONRenderPage'>
            {/* Title of the Page */}
            <Container
                sx={{
                    marginTop: '20px',
                }}
            >
                <Typography 
                    variant="h4" 
                    gutterBottom  
                >
                    JSON Data Viewer
                </Typography>
            </Container>
            
            {/* Upload File */}
            <FileUpload onFileUpload={ sendDataFromChild }/>

            <JSOND3TidyTree d3Data={d3Data}/>
        </Container>
    );
};

export default TestingPage;