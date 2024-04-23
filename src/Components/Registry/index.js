import React from 'react';
import travel from '../../Assets/travel.png';
import gift from '../../Assets/gift.png';

import './Registry.css';
import './Registry.Mobile.css';

const Registry = (props) => {
    return (
        <div className='Registry_container'>
            <div className="Registry_line_divider" />
            <div className='Registry_message_container'>
                <img className="Registry_image_gift" src={gift} alt="gift" />
                <div className='Registry_header' style={{marginBottom: '30px'}}>
                    Registry
                </div>
                <div className='Registry_body'>
                    Please know that your presence at our wedding is present enough! However, for friends and family who have been asking for gift ideas, we are asking for a gift of money for our travel fund, home improvment fund, or anything life throws our way fund. As we intend to explore the world and be DIY home owners. Feel free to specify which you would like your gift to go towards.                    <br />
                    <br />
                    Thank you!     
                </div>
                <div className='Registry_body'>
                    ~ Heather and Kristoffer
                </div>
                <img className="Registry_image_travel" src={travel} alt="travel" />
            </div>
            <div className="Registry_line_divider"/>
        </div>
    );
};

export default React.memo(Registry);