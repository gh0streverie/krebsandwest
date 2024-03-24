import React, { useState } from 'react';
import { Paper, Button, TextField, InputAdornment } from '@mui/material';
import { AccountCircle, ArrowBackIos, ArrowForwardIos, Comment, Mail, Phone } from '@mui/icons-material';
import Map from '../Map';
import info from '../../Assets/info.png';

import './AdditionalInformation.css';

const AdditionalInformation = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const images = [
        'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/227000/227911-Honefoss.jpg',
        'https://seenorway.files.wordpress.com/2014/10/bilde-700b.jpg',
        'https://static.wixstatic.com/media/4be797_e30b2b61de834d17a4f1b621da8de493~mv2.jpg/v1/fill/w_2500,h_1666,al_c/4be797_e30b2b61de834d17a4f1b621da8de493~mv2.jpg'
    ];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='Location_container'>
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
            <div className='Location_button_container'>
                <Button color="secondary" onClick={handlePrevSlide}>
                    <ArrowBackIos />
                </Button>
                <Button color="secondary" onClick={handleNextSlide}>
                    <ArrowForwardIos />
                </Button>
            </div>
            <div className='Location_text_container'>
                <div className='Location_information-text' style={{ borderRadius: '3px',  background: 'linear-gradient(to bottom, #6f2589, #64227c)', width: '97vw', marginTop: '50px'}}>
                    <img className="Registry_image_info" src={info} alt="info" />
                    <div className='Location_info_text'>
                        - There is free parking and electric car chargers at the hotel
                    </div>
                    <div className='Location_info_text'>
                        - The road up to the hotel is a toll road. If you are staying overnight, you do not need to pay this toll
                    </div>
                    <div className='Location_info_text'>
                        - Hønefoss is the closest town to Kleivstua that the train goes to. From here is about a 30 minute drive. 
                    </div>
                    <div className='Location_info_text'>
                        - Vy is the company that runs trains and other public transportation throughout Norway. 
                    </div>
                    <br />
                    <div className='Location_info_text'>
                        <b>You can either visit the web page to book tickets or download the Vy app.</b>
                    </div>
                    <div className="Location_line_divider"/>
                    <div className='Location_directions_container'>
                        <Button
                            color="secondary"
                            variant="contained"
                            component="a"
                            href="https://play.google.com/store/apps/details?id=com.intele.nsbmob.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{margin: '10px'}}
                        >
                            Google Play
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            component="a"
                            href="https://apps.apple.com/no/app/vy-nsb/id439655098"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{margin: '10px'}}
                        >
                            App Store
                        </Button>
                    </div>
                    <br />
                    <div className='Location_info_text'>
                        <b>Here are three travel options to Hønefoss by train using Vy on their web site:</b>
                    </div>
                    <div className="Location_line_divider"/>
                    <div className='Location_directions_container'>
                        <Button
                            color="secondary"
                            variant="contained"
                            component="a"
                            href="https://www.vy.no/en/see-travel-suggestions?from=Oslo%20lufthavn%20(Gardermoen)&to=H%C3%B8nefoss%20stasjon&fromDateTime=2024-03-22T05%3A00%3A00.000Z&includeModes=train&fromExternalId=NSR%3ANSR%3AStopPlace%3A58211%2CSILVER_RAIL%3A220%3A76&toExternalId=NSR%3ANSR%3AStopPlace%3A60049%2CSILVER_RAIL%3A1617%3A76&passengers=W3siaWQiOjAsImFnZSI6bnVsbCwiZGlzY291bnRzIjpbXSwiY2F0ZWdvcnkiOiJBZHVsdCIsIm5hbWUiOiJBZHVsdCJ9XQ%3D%3D&addons=W3sidHlwZSI6ImJpY3ljbGUiLCJudW1iZXJUb0J1eSI6MH0seyJ0eXBlIjoibGFyZ2VfYW5pbWFsIiwibnVtYmVyVG9CdXkiOjB9LHsidHlwZSI6InNtYWxsX2FuaW1hbCIsIm51bWJlclRvQnV5IjowfSx7InR5cGUiOiJzdHJvbGxlciIsIm51bWJlclRvQnV5IjowfSx7InR5cGUiOiJ3aGVlbGNoYWlyIiwibnVtYmVyVG9CdXkiOjB9XQ%3D%3D&fromPosition=60.193361,11.097887&toPosition=60.169244,10.249668"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{margin: '10px'}}
                        >
                            Oslo Airport to Hønefoss
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            component="a"
                            href="https://www.vy.no/en/see-travel-suggestions?from=Oslo%20S&to=H%C3%B8nefoss%20stasjon&fromDateTime=2024-03-22T05%3A00%3A00.000Z&includeModes=train&fromExternalId=NSR%3ANSR%3AStopPlace%3A59872%2CSILVER_RAIL%3A100%3A76&toExternalId=NSR%3ANSR%3AStopPlace%3A60049%2CSILVER_RAIL%3A1617%3A76&passengers=W3siaWQiOjAsImFnZSI6bnVsbCwiZGlzY291bnRzIjpbXSwiY2F0ZWdvcnkiOiJBZHVsdCIsIm5hbWUiOiJBZHVsdCJ9XQ%3D%3D&addons=W3sidHlwZSI6ImJpY3ljbGUiLCJudW1iZXJUb0J1eSI6MH0seyJ0eXBlIjoibGFyZ2VfYW5pbWFsIiwibnVtYmVyVG9CdXkiOjB9LHsidHlwZSI6InNtYWxsX2FuaW1hbCIsIm51bWJlclRvQnV5IjowfSx7InR5cGUiOiJzdHJvbGxlciIsIm51bWJlclRvQnV5IjowfSx7InR5cGUiOiJ3aGVlbGNoYWlyIiwibnVtYmVyVG9CdXkiOjB9XQ%3D%3D&fromPosition=59.910357,10.753051&toPosition=60.169244,10.249668"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{margin: '10px'}}
                        >
                            Oslo Sentral Station to Hønefoss
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            component="a"
                            href="https://www.vy.no/en/see-travel-suggestions?from=Sandefjord%20stasjon&to=H%C3%B8nefoss%20stasjon&fromDateTime=2024-03-22T05%3A00%3A00.000Z&includeModes=train&fromExternalId=NSR%3ANSR%3AStopPlace%3A58872&toExternalId=NSR%3ANSR%3AStopPlace%3A60049%2CSILVER_RAIL%3A1617%3A76&passengers=W3siaWQiOjAsImFnZSI6bnVsbCwiZGlzY291bnRzIjpbXSwiY2F0ZWdvcnkiOiJBZHVsdCIsIm5hbWUiOiJBZHVsdCJ9XQ%3D%3D&addons=W3sidHlwZSI6ImJpY3ljbGUiLCJudW1iZXJUb0J1eSI6MH0seyJ0eXBlIjoibGFyZ2VfYW5pbWFsIiwibnVtYmVyVG9CdXkiOjB9LHsidHlwZSI6InNtYWxsX2FuaW1hbCIsIm51bWJlclRvQnV5IjowfSx7InR5cGUiOiJzdHJvbGxlciIsIm51bWJlclRvQnV5IjowfSx7InR5cGUiOiJ3aGVlbGNoYWlyIiwibnVtYmVyVG9CdXkiOjB9XQ%3D%3D&fromPosition=59.135239,10.22247&toPosition=60.169244,10.249668"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{margin: '10px'}}
                        >
                            Sandefjord Station to Hønefoss
                        </Button>
                    </div>
                    <div className='Location_info_text'>
                        - From the train station you can take a bus or taxi to get to Kleivstua. Tickets for this can be bought on the Vy app as well.
                    </div>
                    <div className='Location_info_text' style={{paddingBottom: '20px'}}>
                        - We can drive people from the Hønefoss train station to the hotel if needed.
                    </div>
                </div>
                <div className='Location_information-text' style={{paddingTop: 'unset'}}>
                    <div className='Location_information-text-lg'>
                        Hønefoss Train station
                    </div>
                    <Map lat={60.16916760774383} lng={10.249274817359668} />
                </div>
                {/* <div className='Location_questions_form_container'>
                    <div className='Location_questions_form'>
                        Questions? Feel tree to send any questions to us about anything!
                        <div className="Rsvp_form_item">
                            <TextField
                                color="secondary"
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            
                        </div>
                        <div className="Rsvp_form_item">
                            <TextField
                                style={{width: '50%', paddingRight: '15px'}}
                                color="secondary"
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                style={{width: '50%'}}
                                color="secondary"
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                        <div className="Rsvp_form_item">
                            <TextField
                                color="secondary"
                                fullWidth
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Comment />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default React.memo(AdditionalInformation);