import React, { useState, useEffect, useRef } from "react";
import {
    ImageList,
    ImageListItem,
    Dialog,
    DialogContent,
    IconButton,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Pictures.css"; // Import the CSS file

const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

const Pictures = () => {
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
    }, []);
    const [images, setImages] = useState([]);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [visibleCount, setVisibleCount] = useState(6); // Number of images to show initially
    const [loading, setLoading] = useState(false); // Loading state for infinite scroll
    const loaderRef = useRef(null); // Ref for the loader element

    const handleClickOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Load more images when the user scrolls to the bottom
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && !loading && visibleCount < images.length) {
                    setLoading(true);
                    // Simulate a delay for loading more images
                    setTimeout(() => {
                        setVisibleCount((prevCount) => prevCount + 6);
                        setLoading(false);
                    }, 500); // Adjust the delay as needed
                }
            },
            { threshold: 1.0 } // Trigger when the loader is fully visible
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [visibleCount, loading, images.length]);

    return (
        <div>
            {/* Fancy Header */}
            <div className="header">
                <h1>Wedding Picture Gallery</h1>
                <p>Scroll to explore more images</p>
            </div>

            {/* Image Previews using ImageList */}
            <div className="image-list-container">
                <ImageList className="image-list" cols={3} gap={8}>
                    {images.slice(0, visibleCount).map((image, index) => (
                        <ImageListItem key={index} className="image-list-item">
                            <img
                                src={image}
                                alt={`preview-${index}`}
                                onClick={() => handleClickOpen(image)}
                                loading="lazy" // Enable lazy loading for better performance
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>

            {/* Loading Spinner for Infinite Scroll */}
            {visibleCount < images.length && (
                <div ref={loaderRef} className="loader">
                    <CircularProgress color="primary" />
                </div>
            )}

            {/* Full-Screen Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogContent className="dialog-content">
                    <IconButton
                        className="close-button"
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={selectedImage}
                        alt="full-screen"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Pictures;