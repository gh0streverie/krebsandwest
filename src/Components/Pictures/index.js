import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import {ArrowForward, ArrowBack} from '@mui/icons-material';

import './Pictures.css';

const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

const Pictures = () => {
    const [imageOffset, setImageOffset] = useState(0);
    const [imageAmount, setImageAmount] = useState(10);
    const [imageIds, setImageIds] = useState([]);

    useEffect(() => {
        fetch('/api/getimages', {
            domain,
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                setImageIds(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const changeIndex = (direction) => {
        if (direction === "+") {
            if ((imageOffset + imageAmount) <= imageIds.length) {
                setImageOffset(imageOffset + imageAmount);
            }
        } else {
            if ((imageOffset - 50) >= 0) {
                setImageOffset(imageOffset - imageAmount);
            }
        }
    }

    return (
        <div>
            <div className="Pictures_nav-btn-container">
                <Button
                    variant="contained"
                    component="span"
                    onClick={() => changeIndex("-")}
                    startIcon={<ArrowBack />}
                    sx={{marginLeft: '10px'}}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    component="span"
                    onClick={() => changeIndex("+")}
                    startIcon={<ArrowForward />}
                    sx={{marginLeft: '10px'}}
                >
                    Next
                </Button>
            </div>
            {imageIds.slice(imageOffset, (imageOffset + imageAmount)).map((id) => <img alt="an image" style={{width: '450px', padding: '10px'}} src={`https://storage.cloud.google.com/kandw_weddingpics/${id}`}/>)}
        </div> 
    );
};

export default Pictures;