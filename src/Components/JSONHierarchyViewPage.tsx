import React, { useState, useEffect } from 'react';
import JSONRecursiveMUITree from './JSONRecursiveMUITree';
import JSOND3TidyTree from './JSOND3TidyTree';
import jsonToD3Hierarchy from '../Utilities/jsonToD3Hierarchy';
import FileUpload from './FileUpload';
import { Typography, Button, ButtonGroup, Container } from '@mui/material';

const JSONHierarchyViewPage: React.FC = (): JSX.Element => {
    // Save the JSONvdata as a prop pass from <FileUpload>
    const [jsonData, setJsonData] = useState<any>(null);
    // Save the JSON data pass as a prop to <JSONView>
    const [d3Data, setD3Data] = useState<any>(null);
    // Determine which visualization tool is showed
    const [selectedTree, setSelectedTree] = useState<'MUI' | 'D3' | 'Undefined'>('Undefined');

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
        <Container 
            className='JSONRenderPage' 
            sx={{ color:'black' }}>
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
            
            {/* Visualization tool buttons */}
            { jsonData ? (
            <Container
                sx={{
                    marginTop: '40px',
                }}>
                <ButtonGroup 
                    variant='contained'> 
                    <Button 
                        color={selectedTree === 'MUI' ? 'secondary': 'inherit'}
                        onClick={() => setSelectedTree('MUI')}
                    >
                        Indented Tree Visualization
                    </Button>

                    <Button
                        color={selectedTree === 'D3' ? 'secondary': 'inherit'}
                        onClick={() => setSelectedTree('D3')}
                    >
                        Tidy Tree Visualization
                    </Button>
                </ButtonGroup>
            </Container> ): null }

            {/* Active one visualization tools */}
            { selectedTree === 'Undefined' && jsonData ? (
                <Container sx={{ padding: '300px' }} >
                    <Typography variant='h5'> File uploaded successfully, please choose a visualization tool! </Typography>
                </Container>
            ) : null }

            {/* Display Reminder Text */}
            {   selectedTree === 'Undefined' ?  null : 
                selectedTree === 'MUI' ?        <JSONRecursiveMUITree jsonData={jsonData}/>  :
                                                <JSOND3TidyTree d3Data={d3Data} /> }
        </Container>
    );
};

export default JSONHierarchyViewPage;