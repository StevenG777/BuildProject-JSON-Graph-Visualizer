import React, { useState, useEffect } from 'react';

interface functionInterface {
    sendDataToParent(data: string): any
}

const TextEditor = <T extends functionInterface,>({ sendDataToParent }: T): JSX.Element => {
    const [newTitle, setNewTitle] = useState<string>("");

    useEffect(() => {
        setNewTitle(() => "React Project with Six Elements");
    }, [])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`Value in BEFORE On Change -> ${e.target.value}`);
        console.log(`State related to BEFORE On Change -> ${newTitle}`);
        // setNewTitle(e.target.value);
        setNewTitle(() => e.target.value);
        console.log(`Value in AFTER On Change -> ${e.target.value}`);
        console.log(`State related to AFTER On Change -> ${newTitle}`);
    }

    const handleOnClick = () => {
        if (newTitle === '') {
            console.log(`Value in On Click with Empty -> ${newTitle}`);
        }
        else {
            sendDataToParent(newTitle);
        }
    }

    return (
        <div>
            <input 
                id="text" 
                type="text"
                value={newTitle}
                placeholder="Customize Your Title..." 
                onChange={handleOnChange} 
                size={20} 
            />
            <button onClick={handleOnClick} > Submit Title Changes </button>
        </div>
    );
}

export default TextEditor;