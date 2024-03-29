import React, { useEffect, useState } from "react";
import { AccountCircle, Comment, Mail, MusicNote, Phone, Restaurant, Send, MoreVert } from '@mui/icons-material';
import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, InputAdornment } from '@mui/material';
import { Icon } from '@mui/material';
import {COMING, DAY_OPTIONS} from '../../Utils/Constants';
import SuccessIndicator from "../SuccessIndicator";

import './Rsvp.css';
import './Rsvp.Mobile.css';

const Rsvp = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        diet: '',
        amount: 0,
        message: '',
        guests: [],
        songs: '',
        coming: COMING.YES,
        days: DAY_OPTIONS.ONE
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

    const handleAmountChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            guests: new Array(value).fill('')
        }));
    }
    const handleGuestChange = (index, value) => {
        const newValues = [...formData.guests];
        newValues[index] = value;

        setFormData(prevState => ({
            ...prevState,
            guests: newValues
        }));
    }

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

    useEffect(() => {
        const { name, email, guests, phone, coming } = formData;

        if (name !== '' && coming === COMING.NO && email !== '') {
            setIsFormValid(true)
        } else if (name !== '' && phone !== '' && email !== '' && guests.filter((val) => !val).length === 0) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false);
        };

    }, [formData.name, formData.guests, formData.coming, formData.phone, formData.email])

    return (
        <div className="Rsvp_container">
            <div className="Rsvp_header">
                RSVP
            </div>
            <div className="Rsvp_line_divider" />
            <div className="Rsvp_info">
                Please respond with your ability to attend before the 1st of August
            </div>
            <div className="Rsvp_form_container">
                <div className="Rsvp_form_item">
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
                <div className="Rsvp_form_item">
                    <TextField
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
                </div>
                <div className="Rsvp_form_item">
                    <TextField
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
                <div className="Rsvp_form_radio">
                    <FormControl>
                        <FormLabel id="coming-label">Will you be able to attend?</FormLabel>
                        <RadioGroup
                            aria-labelledby="coming-label"
                            value={formData.coming}
                            name="coming"
                            onChange={handleChange}
                        >
                            <FormControlLabel value={COMING.YES} control={<Radio />} label="Yes, I will be attending" />
                            <FormControlLabel value={COMING.NO} control={<Radio />} label="Unfortunately, I will not be able to attend" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {formData.coming === COMING.YES && 
                    <div className="Rsvp_form_radio">
                        <FormControl>
                            <FormLabel id="days-label">What nights will you be staying?</FormLabel>
                            <RadioGroup
                                aria-labelledby="days-label"
                                value={formData.days}
                                name="days"
                                onChange={handleChange}
                            >
                                <FormControlLabel value={DAY_OPTIONS.ONE} control={<Radio />} label="I will be staying Friday night" />
                                <FormControlLabel value={DAY_OPTIONS.TWO} control={<Radio />} label="I will be staying Thursday and Friday night" />
                                <FormControlLabel value={DAY_OPTIONS.NONE} control={<Radio />} label="I will not be staying at Kleivstua" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                }
                {formData.coming === COMING.YES && 
                    <div className="Rsvp_form_item">
                        <FormControl fullWidth>
                            <InputLabel id="guests-label">Additional Guests</InputLabel>
                            <Select
                                labelId="guests-label"
                                color="secondary"
                                fullWidth
                                label="Additional Guests"
                                name="amount"
                                value={formData.amount}
                                onChange={handleAmountChange}
                                required
                            >
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                }
                {formData.coming === COMING.YES && formData.guests.map((value, i) => {
                    return (
                        <div className="Rsvp_form_item" key={i}>
                            <TextField
                                color="secondary"
                                fullWidth
                                label={"Guest " + (i + 1)}
                                name="guests"
                                value={value}
                                onChange={(e) => handleGuestChange(i, e.target.value)}
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
                    );
                })}
                {formData.coming === COMING.YES && 
                    <div className="Rsvp_form_item">
                        <TextField
                            color="secondary"
                            fullWidth
                            label="Song requests at reception"
                            name="songs"
                            value={formData.songs}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MusicNote />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                }
                {formData.coming === COMING.YES && 
                    <div className="Rsvp_form_item">
                        <TextField
                            color="secondary"
                            fullWidth
                            label="Dietary requirements or food allergies"
                            name="diet"
                            value={formData.diet}
                            onChange={handleChange}
                            multiline
                            rows={2}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Restaurant />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                }   
                <div className="Rsvp_form_item">
                    <TextField
                        color="secondary"
                        fullWidth
                        label="Questions, comments, or anything else we should know?"
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
                <SuccessIndicator open={open} success={success} handleClose={handleClose} indicatorMessage={'Thank you for the RSVP!'}/>
            </div>
        </div>
    );
}

export default React.memo(Rsvp);