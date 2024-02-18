import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Home from '../Home';
import Food from '../Food';
import Location from '../Location';

import './Nav.css';

const Nav = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='Nav_container'>
            <div className='Nav_sky'>
                <Box sx={{width: '100%'}}>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        centered 
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Home" />
                        <Tab label="Logistics" />
                        <Tab label="Location" />
                        <Tab label="Food" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Home />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Logistics
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Location />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Food />
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
};

const TabPanel = ({children, value, index}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

export default Nav;
