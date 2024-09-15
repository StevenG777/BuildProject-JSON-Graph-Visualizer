import React from 'react';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';

// Interface for json Data
interface propsInterface {
    jsonData: any;
}

// Helper Function: Generate JSX Rendered Content using RECURSION
/*
Parent Key: The previous key from parent field
Current Key: The current key from iterating the object
Display Key: The processed current key for displaying in the UI
Internal Key: The processed current key that is unique and will be used for internal system
*/
const renderJSON = (
    obj: any,                             // JSON data root
    level: number = 0,                    // JSON hierarchical level
    parentKey: string = "root",           // Parent Key
    isParentArray: boolean = false,       // Check if Parent object is Array
    keyMap: Record<string, string> = {}   // Key Map used by internal system
): JSX.Element[] => {
    // Define the element array to be rendered
    const elements: JSX.Element[] = [];

    // Iterate the JSON object
    Object.keys(obj).forEach((currentKey, index) => {
        // Set up Important Var
        const value = obj[currentKey];
        let internalKey: string;
        let displayKey: string;
        let type: string;

        // Define Internal Key and Display Key conditionally
        if (isParentArray) {
            internalKey = `${parentKey}_${index.toString()}`;
            displayKey = `Element ${(index+1).toString()}`;
        } else {
            internalKey = `${parentKey}_${currentKey}`;
            displayKey = currentKey;
        }
        // Store mapping key in the system
        keyMap[internalKey] = displayKey;

        // Define type & parent conditionally
        if (Array.isArray(value)) { 
            isParentArray = true; 
            type = 'Array';
        } else {
            isParentArray = false; 
            type = typeof value;

        }

        const bitnum: number = isParentArray? 1 : 0;

        // Add specific element into the element array
        elements.push(
            <Typography key={internalKey} style={{marginLeft: `${level * 20}px`}}>
                Level: {level}, Key: {displayKey}, Type: {type}, {type !== 'object' || 'Array' ? "" : `, Value: ${JSON.stringify(value)}`} parentArray: {bitnum} ----------{">"}internal Key: {internalKey}
            </Typography>
        );

        // BASE CASE for RECURSION
            // Not Object Type
            // Object Finish iterating

        // RECURSIVE CASE for RECURSION
            // Object Type, including Array
        if (typeof value == 'object') {
            elements.push(...renderJSON(value, level + 1, internalKey, isParentArray, keyMap));
        }
    })

    return elements;
}

const JSONView: React.FC<propsInterface> = ({ jsonData }: propsInterface): JSX.Element => {
    // Render element
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                JSON Data Viewer
            </Typography>

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                {jsonData ? (
                    <pre style={{ 
                        textAlign: 'left', 
                        whiteSpace: 'pre-wrap', 
                        wordBreak: 'break-word',
                        fontFamily: 'monospace', 
                        fontSize: '14px' 
                    }}>
                    <div> {renderJSON(jsonData)} </div>
                    </pre>
                ) : (
                    <CircularProgress />
                )}
            </Paper>
        </Container>
    );
};

export default JSONView;