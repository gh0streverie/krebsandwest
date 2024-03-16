import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import './Map.css';

const libraries = ['places'];
const mapContainerStyle = {
    width: '80vw',
    height: '500px',
};

const Map = (props) => {
    const {lat, lng} = props;
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAGy366zaN8tanaNlNYozkECN9tBeiCxP4',
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div className='Map_container'>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={18}
                center={{lat, lng}}
            >
                <Marker position={{lat, lng}} />
            </GoogleMap>
        </div>
    );
};

export default Map;