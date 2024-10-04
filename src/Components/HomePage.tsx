import React, { useState, useEffect } from 'react';
import ProjectInfo from './ProjectInfo';
import BackgroundImage from './BackgroundImage';
import ToggleSections from './ToggleSections'
import TextEditor from './TextEditor';
import { Box, Button } from '@mui/material';

// For components to accept different props
interface ProjectInfoProps {
    title: string;
}
interface TextEditorProps {
    sendDataToParent: (data: string) => void;
}
type ComponentProps = ProjectInfoProps | TextEditorProps | {};

const HomePage: React.FC = (): JSX.Element => {
    // Save the data as a prop pass from <TextEditor>
    // Save the data pass as a prop to <ProjectInfo>
    // Use State for title
    const [newTitle, setNewTitle] = useState<string>("React Project with Six Elements");

    // Use it to communicate between <TextEditor> and <App>
    const sendDataFromChild = (data: string) => {
        // Update newTitle
        setNewTitle(data);
    }

    // Component list with IDs
    const [components, setComponents] = useState<
    { id: number; Component: React.FC<any>; props: ComponentProps }[]>([
        { id: 1, Component: ProjectInfo,     props: { title: newTitle } },
        { id: 2, Component: BackgroundImage, props: {} },
        { id: 3, Component: ToggleSections,  props: {} },
        { id: 4, Component: TextEditor,      props: { sendDataToParent: sendDataFromChild } },
    ]);

    // Update component props whenever newTitle changes
    // Use Effect for changing state to sync up with static props
    // Changing props will then re-render the child component <ProjectInfo />
    useEffect(() => {
        setComponents(prevComponents =>
        prevComponents.map(component => {
            if (component.id === 1) {
            return { ...component, props: { title: newTitle } };
            } else if (component.id === 4) {
            return { ...component, props: { sendDataToParent: setNewTitle } };
            } else {
            return component;
            }
        })
        );
    }, [newTitle]);

    // Delete respective element whenever the its Delete button is clicked
    const handleDelete = (id: number) => {
        setComponents(components.filter((component) => component.id !== id))
    }
    
    // Render Home Page Elements
    return (
        <Box 
            className='HomePage' 
            display='flex' 
            flexDirection='column' 
            sx={{color:'black'}}
        >
            {/* Dynamically render components */}
            {components.map(({ id, Component, props }, index) => (
                <Box key={id} border="1px solid gray" p={2} m={2}>
                    {/* Render each component with its respective props */}
                    <Component {...props} />

                    {/* Delete button for each component */}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(id)}
                        style={{ marginTop: '10px' }}
                    >
                        Delete Component {index + 1}
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default HomePage;
