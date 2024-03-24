import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import kleivstua1 from '../../Assets/kleivstua1.webp';
import kleivstua2 from '../../Assets/kleivstua2.jpg';
import kleivstua3 from '../../Assets/kleivstua3.jpg';
import qrcode from '../../Assets/qrcode.png';
import Map from '../Map';

import './HotelAndAccommodations.css';

const HotelAndAccommodations = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="handa_container">
            <div className="Handa_image_container">
                <img className="Handa_image" src={kleivstua1} alt="kleivstua1" />
                <img className="Handa_image" src={kleivstua2} alt="kleivstua2" />
                <img className="Handa_image" src={kleivstua3} alt="kleivstua2" />
            </div>
            <div className="handa_information_container">
                <img className="Handa_qrcode" src={qrcode} alt="qrcode" />
                <div className="Handa_information_text-lg --bold">
                    Hotel and Accommodations
                </div>
                <div className="Handa_line_divider"/>
                <Box sx={{width: '65%'}}>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        centered 
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Kleivstua" />
                        <Tab label="Sundvollen" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className='Handa_info_container_color'>
                            <div className="Handa_information_text --bold" >
                                Kleivstua
                                <br />
                                Dronningveien 500, 3531 Krokkleiva, Norway
                                <br />
                                +47 32161400                
                            </div>
                            <div className="Handa_stay_options_container">
                                <div className="Handa_info_container">
                                    <div className="Handa_information_text --bold">
                                        Accommodation from Friday to Saturday:
                                    </div>
                                    <div className="Handa_information_text">
                                        1 person NOK 1,650 <br /> 2 pers. NOK 2,100 <br /> 3 pers. NOK 2,500 <br /> 4 pers. NOK 2,900
                                    </div>
                                </div>
                                <div className="Handa_info_container">
                                    <div className="Handa_information_text --bold">
                                        Accommodation from Thursday to Saturday per night:
                                    </div>
                                    <div className="Handa_information_text">
                                        1 person NOK 1,320 <br /> 2 pers. NOK 1,680 <br /> 3 pers. NOK 2,000 <br /> 4 pers. NOK 2,320
                                    </div>
                                </div>
                            </div>
                        </div>  
                        
                        <div className="Handa_information_text" style={{alignItems: 'flex-start'}}>
                            <div className='Handa_info_text' >
                                - Saturday no rooms are available
                            </div>
                            <div className='Handa_info_text'>
                                - Breakfast served each morning
                            </div>
                            <div className='Handa_info_text'>
                                - Baguette lunch included for all who stay thursday night
                            </div>
                            <div className='Handa_info_text'>
                                - Check in at 15:00, and check out 11:00
                            </div>
                            <div className='Handa_info_text'>
                                - Room bookings will be done through heather once the RSVP is made, do not contact hotel about stays
                            </div>
                        </div>
                        <Map lat={60.047031757553746} lng={10.321760046031777} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='Handa_info_container_color'>
                            <div className="Handa_information_text --bold" style={{paddingBottom: '20px'}}>
                                Sundvolden Hotel
                                <br />
                                Dronningveien 2, 3531 Krokkleiva, Norway
                                <br />
                                +47 32162100                
                            </div>
                        </div>
                        <div className="Handa_information_text" style={{alignItems: 'flex-start'}}>
                            <div className='Handa_info_text' >
                                - Rooms available at Kleivstua for Thursday and Friday night
                            </div>
                            <div className='Handa_info_text' >
                                - Other accomodations available in the town as well            
                            </div>
                            <br />
                        </div>
                        <Map lat={60.062831013909} lng={10.31067284639698} />
                    </TabPanel>
                </Box>                
            </div>
        </div>
    );
}

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

export default React.memo(HotelAndAccommodations);