import React from "react";
import { Alert, Snackbar } from '@mui/material';

const SuccessIndicator = (props) => {
    const {open, success, handleClose} = props;
    
    return (
        <div>
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
    );
};

export default React.memo(SuccessIndicator);