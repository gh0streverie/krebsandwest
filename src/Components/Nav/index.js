import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Home from '../Home';
import Faq from '../Faq';
import Location from '../Location';

import './Nav.css';
import Rsvp from '../Rsvp';
import HotelAndAccommodations from '../HotelAndAccommodations';

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
                        <Tab label="Hotel and Accommodations" />
                        <Tab label="Travel Information" />
                        <Tab label="FAQ" />
                        <Tab label="Registry" />
                        <Tab label="RSVP"/>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Home handleChange={handleChange}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <HotelAndAccommodations />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Location />    
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Faq />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Registry
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <Rsvp />
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
