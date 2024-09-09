import React, { useState } from 'react';
import {
    Card, CardHeader, CardContent,
    Grid, Box, Button, IconButton,
    Typography, Divider
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Storage } from '@google-cloud/storage';

const ImageUploader = () => {
    const [images, setImages] = useState([]);

    // Initialize the Google Cloud Storage client
    const storage = new Storage({
        projectId: process.env.STORAGE_ID,
        credentials: {
            client_email: process.env.STORAGE_EMAIL,
            private_key: process.env.STORAGE_KEY,
        },
    });

    const handleFileChange = async (event) => {
        const files = event.target.files;
        const uploadedImages = await Promise.all(
            Array.from(files).map(async (file) => {
                const fileName = `${Date.now()}-${file.name}`;
                await storage.bucket('kandw_weddingpics').file(fileName).save(file);
                return { file, url: `https://storage.googleapis.com/kandw_weddingpics/${fileName}` };
            })
        );
        setImages([...images, ...uploadedImages]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
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
                        {images.map(({ file, url }, index) => (
                            <Grid item xs={4} key={index}>
                                <Box position="relative">
                                    <img
                                        src={url}
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
};

export default ImageUploader;