
import { Request, Response } from 'express';
import { uploadToS3 } from '../utils/AwsS3';
import MediaItem, { IMediaItem } from '../models/MediaItem';
const mediaItemService = require('../services/MediaItemService'); // Import UserService



export const createMediaItem = async (req: Request, res: Response) => {
    try {
       const { domain, title_h3, short_description, order, redirect_url } = req.body;
 
       let imageUrl: string | null = null;
       let mobileImageUrl: string | null = null;
 
       if (req.files) {
          const files = req.files as { [fieldname: string]: Express.Multer.File[] };
 
          if (files.image && files.image[0]) {
             const uploadResponse = await uploadToS3(files.image[0], domain, 'desktop');
             imageUrl = uploadResponse.Location;
          }
 
          if (files.mobileImage && files.mobileImage[0]) {
             const uploadResponse = await uploadToS3(files.mobileImage[0], domain, 'mobile');
             mobileImageUrl = uploadResponse.Location;
          }
       }
 
       const newMediaItem = new MediaItem({
          domain,
          title_h3,
          short_description,
          order,
          image_url: imageUrl, // This will be null if no desktop image was uploaded
          mobile_image_url: mobileImageUrl, // This will be null if no mobile image was uploaded
          redirect_url
       });

       try{
           await newMediaItem.save();
           res.status(201).json(newMediaItem);
       }
       catch(err){
           console.log(err);
           res.status(500).json({ message: `Internal server error while creating mediaItem on service` });
       }
    } catch (error) {
       res.status(500).json({ message: `Internal server error while creating mediaItem on controller` });
    }
 };

export const getAllMediaItems = async (req: Request, res: Response) => {
    try {
    const mediaItems = await mediaItemService.getAllMediaItems();
    res.status(200).json({ data: mediaItems });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Internal server error while fetching all the mediaItems on controller` });
    }
};

export const getMediaItemById = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const mediaItem = await mediaItemService.getMediaItemById(id);
    if (!mediaItem) {
        res.status(404).json({ message: `MediaItem not found with id ${id}` });
    }
    res.status(200).json({ data: mediaItem });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Internal server error while fetching mediaItem with id ${req.params.id} on controller` });
    }
};

export const updateMediaItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Assuming the ID of the media item is passed as a URL parameter
        const { domain, title_h3, short_description, order, redirect_url } = req.body;

        let updates: Partial<IMediaItem> = {
            domain,
            title_h3,
            short_description,
            order,
            redirect_url
        };

        if (req.files) {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            if (files.image && files.image[0]) {
                const uploadResponse = await uploadToS3(files.image[0], domain, 'desktop');
                updates.image_url = uploadResponse.Location;
            }

            if (files.mobileImage && files.mobileImage[0]) {
                const uploadResponse = await uploadToS3(files.mobileImage[0], domain, 'mobile');
                updates.mobile_image_url = uploadResponse.Location;
            }
        }

        try {
            const updatedMediaItem = await MediaItem.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedMediaItem) {
                return res.status(404).json({ message: 'Media item not found' });
            }

            res.status(200).json(updatedMediaItem);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: `Internal server error while updating mediaItem on service` });
        }
    } catch (error) {
        res.status(500).json({ message: `Internal server error while updating mediaItem on controller` });
    }
};

export const deleteMediaItem = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const deleted = await mediaItemService.deleteMediaItem(id);
    if (!deleted) {
        res.status(404).json({ message: `MediaItem not found with id ${id}` });
    }
    res.status(204).json();
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Internal server error while deleting mediaItem with id ${req.params.id} on controller` });
    }
}

export const getMediaItemsByDomain = async (req: Request, res: Response) => {
    try {
        const { domain } = req.params;
        const mediaItems = await mediaItemService.getMediaItemsByDomain(domain);
        res.status(200).json({ data: mediaItems });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Internal server error while fetching all the mediaItems on controller` });
    }
}