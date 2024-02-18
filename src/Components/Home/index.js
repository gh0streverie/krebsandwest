import React from "react";
import './Home.css';
import homeImage from '../../Assets/weddinghome.png';

const Home = () => {

  return (
      <div className="Home_container home_sky">
        <img className="Home_image" src={homeImage} alt="Example" />
        <div className="Home_text_container">
          <div className="Home_information-text-lg">
            Welcome to the home epic quest of Heather and Kris's union - the web page!
          </div>
          <div className="Home_information-text ">
            Prepare your +5 charisma for a celebration of legendary proportions. 
            Adventure awaits as we embark on this quest for eternal love. Grab your potions and join us on this nerdy journey!
          </div>
        </div>
      </div>
  );
}

export default React.memo(Home);