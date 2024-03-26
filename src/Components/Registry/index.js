import React from 'react';
import travel from '../../Assets/travel.png';
import gift from '../../Assets/gift.png';

import './Registry.css';

const Registry = (props) => {
    return (
        <div className='Registry_container'>
            <div className='Registry_message_container'>
                <div className="Registry_line_divider" style={{transform: 'translateY(-100px)'}}/>
                <img className="Registry_image_gift" src={gift} alt="gift" />
                <div className='Registry_header' style={{marginBottom: '30px'}}>
                    Registry
                </div>
                <div className='Registry_body' style={{width: '50vw', marginTop: '30px'}}>
                    Please know that your presence at our wedding is present enough! However, for friends and family who have been asking for gift ideas, we are asking for a gift of money to our travel fund, as we intend to explore and travel the world.
                    <br />
                    Thank you!     
                </div>
                <div className='Registry_body' style={{width: '50vw', marginTop: '30px'}}>
                    ~ Heather and Kristoffer
                </div>
                <img className="Registry_image_travel" src={travel} alt="travel" />
                <div className="Registry_line_divider" style={{transform: 'translateY(100px)'}}/>
            </div>
        </div>
    );
};

export default React.memo(Registry);