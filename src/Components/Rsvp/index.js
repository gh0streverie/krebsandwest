import React, {useEffect, useState} from "react";
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import {AccountCircle, AddReaction, Comment, Send, MoreVert} from '@mui/icons-material';
import {TextField, Button } from '@mui/material';
import { Icon } from '@mui/material';

import './Rsvp.css';

const Rsvp = () => {

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        message: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const sendEmail = (e) => {
        e.preventDefault();
        const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

        axios.post(`${domain}/api/sendemail`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
                console.log('API response:', response.data);
                setFormData({
                    name: '',
                    amount: '',
                    message: ''
                });
            })
            .catch((error) => {
                console.error('There was a problem with the axios request:', error);
            });
    };

    useEffect(() => {
        const { name, amount } = formData;
        if (name !== '' && amount !== '') {
            setIsFormValid(true)
        } else {
            setIsFormValid(false);
        };

    }, [formData.name, formData.amount])

    return (
        <div className="Rsvp_container">
            <div className="Rsvp_header">
                RSVP
            </div>
            <div className="Rsvp_line_divider"/>
            <div className="Rsvp_info">
                Please respond with your ability to attend before the 1st of July
            </div>
            <div className="Rsvp_form_container">
                <div className="Rsvp_form_item">
                    <TextField
                        color="secondary"
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <Icon color="secondary">
                    <MoreVert />
                </Icon>
                <div className="Rsvp_form_item">
                    <TextField
                        color="secondary"
                        fullWidth
                        label="Total guests attending"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddReaction />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <Icon color="secondary">
                    <MoreVert />
                </Icon>
                <div className="Rsvp_form_item">
                    <TextField
                        color="secondary"
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Comment />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <Icon color="secondary">
                    <MoreVert />
                </Icon>
                <div className="Rsvp_form_item">
                    <Button 
                        onClick={sendEmail} 
                        color="secondary" 
                        variant="contained" 
                        disabled={!isFormValid}
                        size="large"
                        endIcon={<Send />}
                    >
                            RSVP
                    </Button>
                </div>
                
            </div>   
        </div>
    );
}

export default React.memo(Rsvp);