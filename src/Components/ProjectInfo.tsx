// 1. Weather API
// 2. Material UI, Tailwind CSS

import React, {useState} from 'react';

const ProjectInfo: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
       <div>
            <h1> Build Project: React Application</h1>
            <h2> Baixi Guo</h2>
            <p> Counts: {count >= 0? count: 0}</p>
            <button onClick = {() => setCount(count + 1)}> Increment + </button>
            <button onClick = {() => setCount(count - 1)}> Decrement - </button>
       </div>
    );
};

export default ProjectInfo;