import React from "react";
import {Send} from '@mui/icons-material';
import {Button} from '@mui/material';

import './Home.css';
import homeImage from '../../Assets/weddinghome.png';
import fellowship from '../../Assets/fellowship.png';

const Home = (props) => {

  const {handleChange} = props;

  return (
      <div className="Home_container home_sky">
          <img className="Home_image" src={homeImage} alt="Example" />
          <div className="Home_text_container">
              <div className="Home_line_divider"/>
              <div className="Home_information-text-lg">
                Welcome to the home page for the epic quest of Heather and Kristoffer's union
                <img className="Home_image_fellowship" src={fellowship} alt="Example" />
                Your handbook to get you there and back again
              </div>
              <div className="Home_information-text ">
                Prepare your +5 charisma for a celebration of legendary proportions. 
                Adventure awaits as we embark on this quest for eternal love. Grab your potions and join us on this nerdy journey!
              </div>
          </div>
          <div className="Home_line_divider" style={{transform: 'translatey(-27px)'}}/>
          <Button 
              onClick={() => handleChange(null, 4)} 
              color="primary" 
              variant="contained" 
              size="large"
              endIcon={<Send />}
          >
              RSVP Here
          </Button>
          <div className="Home_text_container" style={{background: 'unset'}}>
            Please respond with your ability to attend before the 1st of August
          </div>
          {/* <div style={{height: '33vh', width: '100vw', backgroundColor: '#0d0d6f'}} />
          <div style={{height: '33vh', width: '100vw', backgroundColor: '#6f2589'}} />
          <div style={{height: '33vh', width: '100vw', backgroundColor: '#cd3754'}} /> */}
      </div>
  );
}

export default React.memo(Home);