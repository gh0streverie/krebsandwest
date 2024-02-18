import React, { useState } from 'react';
import { Paper, Button } from '@mui/material';

import './Location.css';

const Location = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        'https://static.wixstatic.com/media/4be797_e30b2b61de834d17a4f1b621da8de493~mv2.jpg/v1/fill/w_2500,h_1666,al_c/4be797_e30b2b61de834d17a4f1b621da8de493~mv2.jpg',
        'https://seenorway.files.wordpress.com/2014/10/bilde-700b.jpg',
        'https://res.cloudinary.com/simpleview/image/upload/v1582644005/clients/norway/aerial_view_of_oslo_islands_photo_visitOSLO_f_w_oslo_069e41f6-8df9-4039-934e-68c120651749.jpg',
    ];

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
        <div className='Location_container'>
            <div style={{position: 'relative', overflow: 'hidden', height: 600}}>
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
                <Button color="info" onClick={handlePrevSlide}>
                    Prev
                </Button>
                <Button color="info" onClick={handleNextSlide}>
                    Next
                </Button>
            </div>
            <div className='Location_text_container'>
                {currentSlide === 0 && 
                    <div className='Location_information-text-lg'>
                        Kleivstua
                    </div>
                }
                {currentSlide === 1 && 
                    <div className='Location_information-text-lg'>
                        Sundvollen
                    </div>
                }
                {currentSlide === 2 && 
                    <div className='Location_information-text-lg'>
                        Oslo
                    </div>
                }
            </div>
        </div>
    );
};

export default React.memo(Location);