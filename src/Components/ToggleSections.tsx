import React, { useState } from 'react';

const ToggleSections: React.FC = () => {
    const [sectionIndex, setSectionIndex] = useState(0);
    const sectionArr: string[] = ['Section I', 'Section II', "Section III"];

    const handleTogglePrev = () => {
        setSectionIndex((currentIndex) => (currentIndex + 1) % sectionArr.length);
    }

    const handleToggleNext = () => {
        setSectionIndex((currentIndex) => (currentIndex - 1 + sectionArr.length) % sectionArr.length);
    }

    return (
        <div> 
            <h1> {sectionArr[sectionIndex]}</h1>
            <button onClick={handleTogglePrev}> Prev </button>
            <button onClick={handleToggleNext}> Next </button>
        </div>
    );
}

export default ToggleSections;