import React from "react";
import './Faq.css';

const Faq = () => {

    return (
        <div className="Faq__container">
            <div className="Faq_information-text">
                Vegan and allergy friendly options will be available!
            </div>
        </div>
    );
}

export default React.memo(Faq);