import { Request, Response } from 'express';
import { IServicesWebpage } from '../models/ServicesWebpage'; // Import the IServicesWebpage interface
import ServicesWebpage from '../models/ServicesWebpage'; // Import the Mongoose model
import { uploadToS3 } from  '../utils/AwsS3' // Import the uploadToS3 function

const ServicesWebpagesService = require('../services/ServicesWebpagesService');

const createServicesWebpage = async (req: Request, res: Response) => {
    try {
      // Destructure the request body to get the fields for the new ServicesWebpage
      const {
        domain,
        url,
        page_category,
        window_title,
        title_h1,
        subtitle_h2,
        meta_description,
        meta_keywords,
      } = req.body;
  
      // Create a new ServicesWebpage instance
      const newServicesWebpage: IServicesWebpage = new ServicesWebpage({
        domain,
        url,
        page_category,
        window_title,
        title_h1,
        subtitle_h2,
        meta_description,
        meta_keywords,
        image_url: '', // Initialize image_url with an empty string
        mobile_image_url: '', // Initialize mobile_image_url with an empty string
      });
  
      // Upload images to S3 (if provided)
      if (req.files) {
        // Check if 'image' and 'mobile_image' properties exist in req.files
        if ('image' in req.files) {
          const imageFile = req.files.image[0];
          // Use the uploadToS3 function to upload the 'image' file to S3
          const imageUploadResult = await uploadToS3(imageFile, domain, 'desktop');
          newServicesWebpage.image_url = imageUploadResult.Location;
        }
  
        if ('mobile_image' in req.files) {
          const mobileImageFile = req.files.mobile_image[0];
          // Use the uploadToS3 function to upload the 'mobile_image' file to S3
          const mobileImageUploadResult = await uploadToS3(mobileImageFile, domain);
          newServicesWebpage.mobile_image_url = mobileImageUploadResult.Location;
        }
      }
  
      // Save the new ServicesWebpage to the database
      try {
        await newServicesWebpage.save();
    
        // Return a success response with the created ServicesWebpage data
        res.status(201).json({ data: newServicesWebpage });
        } catch(err){
            console.error(err);
            res.status(500).json({ error: 'Internal server error while saving ServicesWebpage to database' });
        }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error while creating ServicesWebPage controller layer' });
    }
};

const getServicesWebpages = async (req: Request, res: Response) => {
    try {
      // Get all ServicesWebpages from database
        const servicesWebpages = await ServicesWebpagesService.getAllServicesWebpages();
      // Return a success response with all ServicesWebpages
      res.status(200).json({ data: servicesWebpages });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error while getting all ServicesWebpages on controller layer' });
    }
};

const getServicesWebpageById = async (req: Request, res: Response) => {
    try {
      // Get the ServicesWebpage id from the request params
      const { id } = req.params;
  
      // Get the ServicesWebpage from database
      const servicesWebpage = await ServicesWebpagesService.getServicesWebpageById(id);
  
      // Return a success response with the ServicesWebpage
      res.status(200).json({ data: servicesWebpage });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error while getting ServicesWebpage by id on controller layer' });
    }
};

const updateServicesWebpage = async (req: Request, res: Response) => {
    try {
      // Get the ServicesWebpage id from the request params
      const { id } = req.params;
  
      // Get the updated ServicesWebpage data from the request body
      const {
        domain,
        url,
        page_category,
        window_title,
        title_h1,
        subtitle_h2,
        meta_description,
        meta_keywords,
        image_url,
        mobile_image_url,
      } = req.body;
  
      // Create an object with the updated ServicesWebpage data
      const servicesWebpageDataToUpdate = {
        domain,
        url,
        page_category,
        window_title,
        title_h1,
        subtitle_h2,
        meta_description,
        meta_keywords,
        image_url,
        mobile_image_url,

      };
  
      // Upload images to S3 (if provided)
      if (req.files) {
        // Check if 'image' and 'mobile_image' properties exist in req.files
        if ('image' in req.files) {
          const imageFile = req.files.image[0];
          // Use the uploadToS3 function to upload the 'image' file to S3
          const imageUploadResult = await uploadToS3(imageFile, domain, 'desktop');
          servicesWebpageDataToUpdate.image_url = imageUploadResult.Location;
        }
  
        if ('mobile_image' in req.files) {
          const mobileImageFile = req.files.mobile_image[0];
          // Use the uploadToS3 function to upload the 'mobile_image' file to S3
          const mobileImageUploadResult = await uploadToS3(mobileImageFile, domain);
          servicesWebpageDataToUpdate.mobile_image_url = mobileImageUploadResult.Location;
        }
      }
  
      // Update the ServicesWebpage in the database
      const updatedServicesWebpage = await ServicesWebpagesService.updateServicesWebpage(id, servicesWebpageDataToUpdate);
  
      // Return a success response with the updated ServicesWebpage
      res.status(200).json({ data: updatedServicesWebpage });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error while updating ServicesWebpage on controller layer' });
    }
};

const deleteServicesWebpage = async (req: Request, res: Response) => {
    try {
      // Get the ServicesWebpage id from the request params
      const { id } = req.params;
  
      // Delete the ServicesWebpage from the database
      const deleted = await ServicesWebpagesService.deleteServicesWebpage(id);

      if (!deleted) {
        res.status(404).json({ error: 'ServicesWebpage not found' });
      }
      // Return a success response
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error while deleting ServicesWebpage on controller layer' });
    }
};

const getServicesWebpageByDomain = async (req: Request, res: Response) => {
    try {
      // Get the ServicesWebpage domain from the request params
      const { domain } = req.params;
  
      // Get the ServicesWebpage from database
      const servicesWebpage = await ServicesWebpagesService.getServicesWebpageByDomain(domain);
  
      // Return a success response with the ServicesWebpage
      res.status(200).json({ data: servicesWebpage });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error while getting ServicesWebpage by domain on controller layer' });
    }
}
