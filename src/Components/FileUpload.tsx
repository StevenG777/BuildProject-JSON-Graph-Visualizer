import React from 'react';
import { Button, Container } from '@mui/material';

// Define interface for onFileUpload
interface propsInterface {
    onFileUpload: (jsonData: any) => void
}

const FileUpload: React.FC<propsInterface> = ({ onFileUpload } : propsInterface): JSX.Element => {
    // Attach Event Listener --> Event trigger when file changes in Input [file type]
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Retrieve the first file in the fileList object
        const file = event.target.files?.[0];

        // If file exists, ACTION
        if(file){
            // JSON Format Verification
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const mimeType = file.type;
            if (fileExtension !== 'json' || mimeType !== 'application/json') {
                console.error("Wrong File Format");
                alert("Please upload a valid JSON file");
                return;
            }

            // Initialize a FileReader object
            const reader = new FileReader();

            // Helper Function to Handle FileReader Event 
            const handleEvent = (e: ProgressEvent<FileReader>) => {
                console.log(`JSON file ${file.name} with ${e.type} event type.`);
                
                if (e.type === 'load') {
                    try{
                        // Get JSON data from Event Target and JSON parses to string
                        const json = JSON.parse(e.target?.result as string);
                        // Send JSON data in string through prop to its parent element
                        onFileUpload(json);
    
                    } catch(error) {
                        console.error("Error parsing JSON", error);
                        alert("Invalid JSON file");
                    } 
                }

            }

            // Attach Event Listener --> Event trigger for FileReader 
            reader.addEventListener("loadstart", handleEvent);
            reader.addEventListener("load", handleEvent);
            reader.addEventListener("loadend", handleEvent);
            reader.addEventListener("progress", handleEvent);
            reader.addEventListener("error", handleEvent);
            reader.addEventListener("abort", handleEvent);

            // FileReader starts the Read Operation, and trigger the event listeners
            reader.readAsText(file);
        }
    }

    // Render File Upload Elements
    return (
        <Container
            sx={{
                marginTop: '20px',
                padding: '20px'
            }}
        >
            <Button 
            variant="contained"
            component="label"
            >
                Upload JSON File

                <input
                type = 'file'
                accept='json'
                hidden
                onChange={handleFileChange}
                 >
                </input>
                
            </Button>
        </ Container>
    );
};

export default FileUpload