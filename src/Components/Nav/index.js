import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Home from '../Home';
import Location from '../AdditionalInformation';

import './Nav.css';
import Rsvp from '../Rsvp';
import HotelAndAccommodations from '../HotelAndAccommodations';
import Registry from '../Registry';

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
                        variant="fullWidth"
                        style={{background: 'linear-gradient(rgb(4 4 49), rgb(3 3 73))', color: 'black', position: 'fixed', width: '100%', zIndex: '99'}}
                    >
                        <Tab label="Home" />
                        <Tab label="Hotel and Accommodations" />
                        <Tab label="Additional Information" />
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
                        <Registry />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
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
