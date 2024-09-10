import React, { useState } from 'react';
import {
    Card, CardHeader, CardContent,
    Grid, Box, Button, IconButton,
    Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ImageUploader = () => {
    const [images, setImages] = useState([]);


    const handleFileChange = (event) => {
        uploadImages(event.target.files);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const uploadImages = async (files) => {
        const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

        try {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('images', file);
            });

            fetch('/api/uploadimages', {
                domain,
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    setImages([...images, ...Array.from(files)]);
                })
                .catch(error => {
                    console.error(error);
                });


        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <Card>
            <CardHeader title="Image Uploader" />
            <Divider />
            <CardContent>
                <Box>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Upload Images
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            hidden
                        />
                    </Button>
                    <Grid container spacing={2}>
                        {images.map((image, index) => (
                            <Grid item xs={4} key={index}>
                                <Box position="relative">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Uploaded Image ${index}`}
                                        className="w-full h-auto object-cover rounded-md"
                                    />
                                    <IconButton
                                        onClick={() => handleRemoveImage(index)}
                                        sx={{
                                            position: 'absolute',
                                            top: 4,
                                            right: 4,
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            },
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ImageUploader;