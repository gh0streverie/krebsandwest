import React, { useEffect, useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle, AddReaction, Comment, Send, MoreVert } from '@mui/icons-material';
import { Alert, Button, CircularProgress, Snackbar, TextField } from '@mui/material';
import { Icon } from '@mui/material';

import './Rsvp.css';

const Rsvp = () => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
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

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setSuccess(null);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';
        setLoading(true);

        fetch('/api/sendemail', {
            domain,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLoading(false);
                setSuccess(true);
                setOpen(true);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                setSuccess(false);
                setOpen(true);
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
            <div className="Rsvp_line_divider" />
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
                        endIcon={loading ? null : <Send />}
                    >
                        {loading ? <CircularProgress color="inherit" /> : 'RSVP'}
                    </Button>
                </div>
                {open && success &&
                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        message="This Snackbar will be dismissed in 5 seconds."
                    >
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="standard"
                            sx={{ width: '100%' }}
                        >
                            Thank you for the RSVP!
                        </Alert>
                    </Snackbar>
                }
                {open && !success &&
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        message="This Snackbar will be dismissed in 5 seconds."
                    >
                        <Alert
                            onClose={handleClose}
                            severity="error"
                            variant="standard"
                            sx={{ width: '100%' }}
                        >
                            Sorry, something unexpected happened. Please try again.
                        </Alert>
                    </Snackbar>
                }
            </div>
        </div>
    );
}

export default React.memo(Rsvp);