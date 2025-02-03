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
        fetch(`/api/getimages?${new URLSearchParams(window.location.search).toString()}`, {
            domain,
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                setImages(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const [images, setImages] = useState([]);

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [startIndex, setStartIndex] = useState(0); // Start index of the visible window
    const [loading, setLoading] = useState(false); // Loading state for infinite scroll
    const loaderRef = useRef(null); // Ref for the bottom loader element
    const topLoaderRef = useRef(null); // Ref for the top loader element
    const windowSize = 36; // Maximum number of images to load at a time
    const loadStep = 9; // Number of images to load at a time

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
                if (firstEntry.isIntersecting && !loading && startIndex + windowSize < images.length) {
                    setLoading(true);
                    // Simulate a delay for loading more images
                    setTimeout(() => {
                        setStartIndex((prevIndex) => prevIndex + loadStep); // Slide the window forward by 10 images
                        setLoading(false);
                    }, 500); // Adjust the delay as needed
                }
            },
            { threshold: 0.9 } // Trigger when the loader is fully visible
        );

        const currentLoader = loaderRef.current;

        if (currentLoader) {
            observer.observe(currentLoader);
        }

        // Cleanup the observer when the component unmounts or when the loaderRef changes
        return () => {
            if (currentLoader) {
                observer.unobserve(currentLoader);
            }
        };
    }, [startIndex, loading, images.length, windowSize, loadStep]);

    // Load previous images when the user scrolls to the top
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && !loading && startIndex > 0) {
                    setLoading(true);
                    // Simulate a delay for loading previous images
                    setTimeout(() => {
                        setStartIndex((prevIndex) => Math.max(0, prevIndex - loadStep)); // Slide the window backward by 10 images
                        setLoading(false);
                    }, 500); // Adjust the delay as needed
                }
            },
            { threshold: 1.0 } // Trigger when the loader is fully visible
        );

        const currentTopLoader = topLoaderRef.current;

        if (currentTopLoader) {
            observer.observe(currentTopLoader);
        }

        // Cleanup the observer when the component unmounts or when the topLoaderRef changes
        return () => {
            if (currentTopLoader) {
                observer.unobserve(currentTopLoader);
            }
        };
    }, [startIndex, loading, windowSize, loadStep]);

    // Calculate the visible images based on the current window
    const visibleImages = images.slice(startIndex, startIndex + windowSize);

    return (
        <div>
            {/* Fancy Header */}
            <div className="header">
                <h1>Wedding Photo Gallery</h1>
                <p>Scroll to explore more stunning images</p>
            </div>

            {/* Top Loader for Scrolling Up */}
            {startIndex > 0 && (
                <div ref={topLoaderRef} className="loader">
                    <CircularProgress color="primary" />
                </div>
            )}

            {/* Image Previews using ImageList */}
            <div className="image-list-container">
                <ImageList className="image-list" cols={3} gap={8}>
                    {visibleImages.map((image, index) => (
                        <ImageListItem key={startIndex + index} className="image-list-item">
                            <img
                                src={image}
                                alt={`preview-${startIndex + index}`}
                                onClick={() => handleClickOpen(image)}
                                loading="lazy" // Enable lazy loading for better performance
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>

            {/* Bottom Loader for Scrolling Down */}
            {startIndex + windowSize < images.length && (
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