import { useState } from "react";

const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

const Pictures = () => {
    const [imageUrls, setImageUrls] = useState([]);

    useState(() => {
        fetch('/api/getimages', {
            domain,
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                setImageUrls(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <div>
            {imageUrls.map((url) => <img alt="an image" style={{width: '300px', padding: '10px'}} src={`https://storage.cloud.google.com/kandw_weddingpics/${url}`}/>)}
        </div>
    );
};

export default Pictures;