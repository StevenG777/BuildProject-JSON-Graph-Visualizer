import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, CircularProgress } from '@mui/material';

const renderJSON = (obj: any, level: number = 0): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const type = Array.isArray(value) ? 'Array' : typeof value;

        elements.push(
            <Typography key={key} style={{marginLeft: `${level * 20}px`}}>
                Level: {level}, Key: {key}, Type: {type}, {type !== 'object' || 'Array' ? "" : `, Value: ${JSON.stringify(value)}`}
            </Typography>
        );

        // if (typeof value == 'object' && !Array.isArray(value)) {
        if (typeof value == 'object') {
            elements.push(... renderJSON(value, level + 1));
        }
    })

    return elements;
}

const JSONView: React.FC = () => {
    const [jsonData, setJsonData] = useState<any>(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setJsonData(data))
            .catch(error => console.error('Error fetching json', error));
    }, [])

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
}

export default JSONView;