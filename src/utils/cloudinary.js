import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from 'fs';





    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME , // Replace with your Cloudinary cloud name 
        api_key: process.env.CLOUDINARY_API_KEY ,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    // Upload an file
    const uploadOnCloudinary = async (localFilePath) => {
        if (!localFilePath) {
            console.error('No file path provided for upload.');
            return null;
        }
        
        try {
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
            });
            // console.log('File uploaded successfully:', response.url);
            fs.unlinkSync(localFilePath); // Clean up the local file after upload
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath); // Clean up the local file if upload fails
            console.error('Error uploading file:', error);
            return null;
        }
    }
  

    console.log(response);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    


export default uploadOnCloudinary;