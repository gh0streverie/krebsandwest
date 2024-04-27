import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import qrcode from '../../Assets/qrcode.png';
import Map from '../Map';

import './HotelAndAccommodations.css';
import './HotelAndAccommodations.Mobile.css';

const HotelAndAccommodations = () => {
    const [value, setValue] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const images = [
        'https://kleivstuahotell.no/wp-content/uploads/sites/28/2024/01/Kleivstua-Hotel-by-Classic-Norway-Hotels-LR-15.jpg', 
        'https://kleivstuahotell.no/wp-content/uploads/sites/28/2024/01/Kleivstua-Hotel-by-Classic-Norway-Hotels-LR-20.jpg', 
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/121411607.jpg?k=5e75a5b35c305c994931b5368492b7eb34e01a33eeb0998975e73f438ab40d56&o=&hp=1'
    ];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
        <div className="Handa_container">
            <div style={{position: 'relative', overflow: 'hidden', height: 300}}>
                {images.map((image, index) => (
                    <Paper
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            left: `${(index - currentSlide) * 100}%`,
                            transition: 'left 0.5s ease-in-out',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'auto cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1200px',
                            backgroundColor: 'rgba(255, 255, 255, 0)'
                        }}
                        elevation={3}
                    />
                ))}
            </div>
            <div className='Handa_button_container'>
                <Button color="secondary" onClick={handlePrevSlide}>
                    <ArrowBackIos />
                </Button>
                <Button color="secondary" onClick={handleNextSlide}>
                    <ArrowForwardIos />
                </Button>
            </div>
            <div className="handa_information_container">
                <img className="Handa_qrcode" src={qrcode} alt="qrcode" />
                <div className="Handa_information_text-lg --bold">
                    Hotel and Accommodations
                </div>
                <Box className="Handa_tab_container">
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
                            <div className="Handa_line_divider"/>
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
                            <div className="Handa_line_divider"/>
                        </div>  
                        
                        <div className="Handa_information_text">
                            <div className='Handa_info_text'>
                                - Room bookings will be done through Heather once your RSVP is submitted, do not contact the hotel directly
                            </div>
                            <div className='Handa_info_text' >
                                - Saturday no rooms are available
                            </div>
                            <div className='Handa_info_text'>
                                - Breakfast included with the stay each morning
                            </div>
                            <div className='Handa_info_text'>
                                - Baguette lunch on Friday included for all who stay Thursday night
                            </div>
                            <div className='Handa_info_text'>
                                - Check in at 15:00, and check out 11:00
                            </div>
                            
                        </div>
                        <Map lat={60.047031757553746} lng={10.321760046031777} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='Handa_info_container_color'>
                            <div className="Handa_line_divider"/>
                            <div className="Handa_information_text --bold" style={{paddingBottom: '20px'}}>
                                Sundvolden Hotel
                                <br />
                                Dronningveien 2, 3531 Krokkleiva, Norway
                                <br />
                                +47 32162100                
                            </div>
                            <div className="Handa_line_divider"/>
                        </div>
                        <div className="Handa_information_text" style={{alignItems: 'flex-start'}}>
                            <div className='Handa_info_text' >
                                - Rooms available at Kleivstua for Thursday and Friday night
                            </div>
                            <div className='Handa_info_text' >
                                - Other accomodations available in Sundvollen as well            
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