const { Storage } = require('@google-cloud/storage');

class ImageService {
    storage = null;

    constructor() {
        this.storage = new Storage({
            projectId: process.env.STORAGE_ID,
            credentials: {
                client_email: process.env.STORAGE_EMAIL,
                private_key: process.env.STORAGE_KEY,
            },
        });
    }

    async saveImage(files, res) {
        try {
            const uploadedImages = await Promise.all(
                files.map(async (file) => {
                    const fileName = `${Date.now()}-${file.originalname}`;
                    await this.storage.bucket('kandw_weddingpics').file(fileName).save(file.buffer);
                    return { url: `https://storage.googleapis.com/kandw_weddingpics/${fileName}` };
                })
            );
            res.json(uploadedImages);
        } catch (error) {
            console.error('Error uploading images:', error);
            res.status(500).json({ error: 'Failed to upload images' });
        }
    }
}

module.exports = ImageService;