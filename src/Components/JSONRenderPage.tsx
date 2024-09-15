import React, { useState } from 'react';
import JSONView from './JSONView';
import FileUpload from './FileUpload';

const JSONRenderPage: React.FC = (): JSX.Element => {
    // Save the JSONvdata as a prop pass from <FileUpload>
    // Save the JSON data pass as a prop to <JSONView>
    const [jsonData, setJsonData] = useState<any>(null);

    const sendDataFromChild = (jsonData: any) => {
        setJsonData(jsonData);
    }

    // Render JSON Render Elements
    return (
        <div className='JSONRenderPage'>
            <FileUpload onFileUpload={ sendDataFromChild }/>
            <JSONView jsonData={jsonData}/>
        </div>
    );
};

export default JSONRenderPage;