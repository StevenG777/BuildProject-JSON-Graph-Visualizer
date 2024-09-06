// 1. Weather API
// 2. Material UI, Tailwind CSS, Chart.js, D3.js, Cytoscape.js

import {useState} from 'react';

interface titleInterface {
    title: string
}

const ProjectInfo = <T extends titleInterface>({ title }: T) => {
    const [count, setCount] = useState(0);

    return (
       <div>
            <h1> {title} </h1>
            <h2> Baixi Guo </h2>
            <p> Counts: {count >= 0? count: 0} </p>
            <button onClick = {() => setCount(count + 1)}> Increment + </button>
            <button onClick = {() => setCount(count - 1)}> Decrement - </button>
       </div>
    );
};

export default ProjectInfo;