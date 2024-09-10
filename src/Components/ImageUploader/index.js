import React, { useState } from 'react';
import { Button, Typography, Box, LinearProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import travel from '../../Assets/travel.png';

import './ImageUploader.css';
import './ImageUploader.mobile.css';

const Input = styled('input')({
    display: 'none',
});

const ImagePreview = styled('img')({
    height: '100%',
    width: '350px',
    objectFit: 'cover',
});

const ImageUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const newPreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    };

    const handleRemove = (index) => {
        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);

        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);
    };

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            setUploading(true);
            const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

            try {
                const formData = new FormData();
                Array.from(selectedFiles).forEach((file) => {
                    formData.append('images', file);
                });

                fetch('/api/uploadimages', {
                    domain,
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(() => {
                        setUploading(false);
                    })
                    .catch(error => {
                        setUploading(false);
                        console.error(error);
                    });


            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
    };

    return (
        <div className='ImageUploader_container'>
            <div className='ImageUploader_sky'>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <img className="ImageUploader_image_travel" src={travel} alt="travel" />
                    <Typography variant="h3" gutterBottom>
                        Please upload your wedding photos here!
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '15px' }}>
                        <div className='ImageUploader_line_divider' />
                    </Box>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleFileSelect}
                        />
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            Select Images
                        </Button>
                    </label>
                    {selectedFiles.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">{selectedFiles.length} file(s) selected</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpload}
                                disabled={uploading}
                                sx={{ mt: 2 }}
                            >
                                Upload All
                            </Button>
                        </Box>
                    )}
                    {uploading && (
                        <Box sx={{ mt: 2 }}>
                            <LinearProgress />
                        </Box>
                    )}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {previews.map((preview, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box sx={{ position: 'relative' }}>
                                    <ImagePreview src={preview.preview} alt={`Preview ${index}`} />
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemove(index)}
                                        sx={{ position: 'absolute', top: 5, right: 110 }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        </div>
    );
}

export default ImageUploader;