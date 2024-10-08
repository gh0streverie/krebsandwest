import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, LinearProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import travel from '../../Assets/travel.png';

import './ImageUploader.css';
import './ImageUploader.mobile.css';

const MAX_TRANSFER_SIZE = 75 * 1024 * 1024; // 75 MB

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
    const [selectedFilesTotalSize, setSelectedFilesTotalSize] = useState(0);
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [requestError, setRequestError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [requestSuccess, setRequestSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [segments, setSegments] = useState(0);
    const [progress, setProgress] = useState(0);

    const handleFileSelect = (event) => {
        let newTotalSize = selectedFilesTotalSize;
        const files = Array.from(event.target.files);

        files.forEach((file) => {
            newTotalSize += file.size
        });

        const newPreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setSelectedFiles([...selectedFiles, ...files]);
        setSelectedFilesTotalSize(newTotalSize);
        setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    };

    const handleRemove = (index) => {
        let newTotalSize = 0;
        const newPreviews = [...previews];
        newPreviews.splice(index, 1);

        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);

        newSelectedFiles.forEach((file) => {
            newTotalSize += file.size
        });

        setSelectedFiles(newSelectedFiles);
        setSelectedFilesTotalSize(newTotalSize);
        setPreviews(newPreviews);
    };

    const sendImageUploadRequest = async (formData, index, total) => {

        const domain = 'https://krebs-and-west-1adf2ab65cd8.herokuapp.com';

        fetch('/api/uploadimages', {
            domain,
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(() => {
                setProgress(progress + 1);
                if (index === total) {
                    setRequestSuccess(true);
                    setSuccessMessage("Pictures uploaded sucessfully, thank you! To send more, remove the existing images and select different ones.");
                    setUploading(false);
                }
            })
            .catch(error => {
                setErrorMessage("Whoops, something went wrong saving the pictures. Please try again.");
                setRequestError(true);
                console.error(error);
                setUploading(false);
            });
    }

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            setErrorMessage("");
            setRequestError(false);

            try {
                const formDataArray = [new FormData()];
                let size = 0;
                let index = 0;

                Array.from(selectedFiles).forEach((file) => {
                    if ((size + file.size) >= MAX_TRANSFER_SIZE) {
                        size = 0;
                        formDataArray.push(new FormData());
                        index++;
                    }

                    size += file.size;
                    formDataArray[index].append('images', file);
                });

                setSegments(formDataArray.length);

                formDataArray.forEach((form, i) => {
                    setUploading(true);
                    sendImageUploadRequest(form, (i + 1), formDataArray.length);
                })

            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
    };

    const clearImages = () => {
        setSelectedFiles([]);
        setPreviews([]);
    }

    // useEffect(() => {
    //     if (selectedFiles && selectedFiles.length > 15) {
    //         setErrorMessage("Please select a max of 15 images at once");
    //         setValidationError(true);
    //     } else {
    //         setErrorMessage("");
    //         setValidationError(false);
    //     }
    // }, [selectedFiles])

    // useEffect(() => {
    //     if (selectedFilesTotalSize >= MAX_TRANSFER_SIZE) {
    //         setErrorMessage("Maximum file size reached. Please remove images until you don't see this error message any more, then upload them. \n To upload more pictures, remove ones that you have saved and add new ones.");
    //         setValidationError(true);
    //     } else {
    //         setErrorMessage("");
    //         setValidationError(false);
    //     }
    // }, [selectedFilesTotalSize]);

    return (
        <div className='ImageUploader_container'>
            <div className='ImageUploader_sky'>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <img className="ImageUploader_image_travel" src={travel} alt="travel" />
                    <Typography variant="h3" gutterBottom>
                        Please upload your wedding photos here.
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                        <b>Thank you!</b>
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
                    <Button
                        variant="contained"
                        component="span"
                        onClick={clearImages}
                        startIcon={<ClearIcon />}
                        sx={{marginLeft: '10px'}}
                    >
                        Clear Images
                    </Button>
                    {selectedFiles.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body1">
                                {selectedFiles.length} file(s) selected
                            </Typography>
                            {
                                (validationError || requestError) &&
                                <Typography variant="body1" sx={{color: 'red'}}>
                                    <b>{errorMessage}</b>
                                </Typography>
                            }
                            {
                                (requestSuccess) &&
                                <Typography variant="body1" sx={{color: 'green'}}>
                                    <b>{successMessage}</b>
                                </Typography>
                            }
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpload}
                                disabled={uploading || validationError}
                                sx={{ mt: 2 }}
                            >
                                Upload All
                            </Button>
                        </Box>
                    )}
                    {uploading && (
                        <Box sx={{ mt: 2 }}>
                            <LinearProgress variant="determinate" value={progress / segments} />
                            <LinearProgress  />
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
                                        sx={{ position: 'absolute', top: 5, transform: 'translatex(-80px)' }}
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