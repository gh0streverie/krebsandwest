import React, { useState, useEffect } from "react";
import {
    ImageList,
    ImageListItem,
    Dialog,
    DialogContent,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import './Pictures.css';

const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

const Pictures = () => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [images, setImages] = useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClickOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch('/api/getimages', {
            domain,
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                setImages(data.map((id) => `https://storage.cloud.google.com/kandw_weddingpics/${id}`));
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <div className="Pictures_container">
            {/* Image Previews using ImageList */}
            <ImageList cols={3} gap={8}>
                {images.map((image, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={image}
                            alt={`preview-${index}`}
                            style={{ width: "100%", cursor: "pointer" }}
                            onClick={() => handleClickOpen(image)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            {/* Full-Screen Dialog */}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                maxWidth="lg"
            >
                <DialogContent>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        style={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={selectedImage}
                        alt="full-screen"
                        style={{ width: "100%", height: "auto" }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Pictures;