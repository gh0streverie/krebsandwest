import React from "react";
import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import homeImage from '../../Assets/weddinghome.png';
import fellowship from '../../Assets/fellowship.png';

import './Home.css';
import './Home.Mobile.css';

const Home = (props) => {

    const { handleChange } = props;

    return (
        <div className="Home_container home_sky">
            <img className="Home_image" src={homeImage} alt="Example" />
            <div className="Home_text_container">
                <div className="Home_line_divider" />
                <div className="Home_information-text-lg">
                    Your handbook to get you there and back again - A wedding tale
                    <br />
                    By Heather and Kristoffer
                    <img className="Home_image_fellowship" src={fellowship} alt="Example" />
                    Prepare your +5 charisma for a celebration of legendary proportions.
                    Adventure awaits as we embark on this quest for eternal love. Grab your potions and join us on this nerdy journey!
                </div>
            </div>
            <div className="Home_line_divider" style={{ transform: 'translatey(-27px)' }} />
            <Button
                onClick={() => handleChange(null, 4)}
                color="primary"
                variant="contained"
                size="large"
                endIcon={<Send />}
            >
                RSVP Here
            </Button>
            <div className="Home_text_container" style={{ background: 'unset' }}>
                <div className="Home_information-text-lg">
                    Please RSVP before the 1st of August, whether you can attend or not
                </div>
            </div>
            {/* <div style={{height: '33vh', width: '100vw', backgroundColor: '#0d0d6f'}} />
          <div style={{height: '33vh', width: '100vw', backgroundColor: '#6f2589'}} />
          <div style={{height: '33vh', width: '100vw', backgroundColor: '#cd3754'}} /> */}
        </div>
    );
}

export default React.memo(Home);