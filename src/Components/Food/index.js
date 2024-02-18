import React from "react";
import './Food.css';

const Food = () => {

    return (
        <div className="Food_food_container">
            <div className="Food_information-text">
                Vegan and allergy friendly options will be available!
            </div>
        </div>
    );
}

export default React.memo(Food);