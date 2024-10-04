import React from 'react';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';

const Navigation: React.FC = (): JSX.Element => {
    // Store the active path
    const [activeTab, setActiveTab] = useState('home');

    // When a tab is click, the tab name is stored
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    // Render Navigation element
    return (
        // App Bar
        <AppBar 
            position="static"
            sx={{ backgroundColor: 'white' }}
        >
            {/* Navigation Tab Container */}
            <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                textColor="primary"
                indicatorColor='primary'
                centered={true}
                sx={{ backgroundColor: 'beige' }}
            >
                {/* Navigation Tabs */}
                <Tab label="HOME"                      component={Link} to="home"                value="/home" />
                <Tab label="JSON GraphUI Visualizer"   component={Link} to="json-hierarchy-view" value="/json-hierarchy-view" />
            </Tabs>
            
            {/* Outlet the data to outside of navigation */}
            <div id="detail">
                <Outlet />
            </div>
        </AppBar>
    );
};

export default Navigation;
