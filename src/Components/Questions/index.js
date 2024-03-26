import React, {useState, useEffect} from 'react';
import { Button, CircularProgress, TextField, InputAdornment, Icon } from '@mui/material';
import { AccountCircle, Comment, Mail, Phone, MoreVert, Send } from '@mui/icons-material';
import SuccessIndicator from "../SuccessIndicator";

import './Questions.css';

const Questions = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const sendQuestion = (e) => {
        e.preventDefault();
        const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';
        setLoading(true);

        fetch('/api/sendquestion', {
            domain,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setOpen(true);

                if ((data.message === 'Fail!')) {
                    setSuccess(false);
                } else {
                    setSuccess(true);
                }
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setSuccess(false);
                setOpen(true);
            });
    };

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setSuccess(null);
    };

    useEffect(() => {
        const { name, phone, email, message} = formData;

        if (name !== '' && (phone !== '' || email !== '') && message !== '') {
            setIsFormValid(true)
        } else {
            setIsFormValid(false);
        };

    }, [formData.name, formData.phone, formData.email, formData.message])

    return (
        <div className='Questions_form_container'>
            <div className='Questions_form'>
                Questions? Feel tree to send any questions to us about anything!
                <div className="Questions_form_item">
                    <TextField
                        color="secondary"
                        fullWidth
                        label="Full Name"
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
                <div className="Questions_form_item">
                    <TextField
                        style={{ width: '50%', paddingRight: '15px' }}
                        color="secondary"
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Phone />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        style={{ width: '50%' }}
                        color="secondary"
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Mail />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="Questions_form_item">
                    <TextField
                        color="secondary"
                        fullWidth
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Comment />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="Rsvp_form_item">
                    <Button
                        onClick={sendQuestion}
                        color="secondary"
                        variant="contained"
                        disabled={!isFormValid}
                        size="large"
                        endIcon={loading ? null : <Send />}
                    >
                        {loading ? <CircularProgress color="inherit" /> : 'Send Question'}
                    </Button>
                </div>
                <SuccessIndicator open={open} success={success} handleClose={handleClose}/>
            </div>
        </div>
    );
};

export default React.memo(Questions);