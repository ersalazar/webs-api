import { Request, Response } from 'express';
import { uploadToS3 } from '../utils/AwsS3';
import { IBlogPost } from '../models/BlogPosts';
const blogPostService = require('../services/BlogPostService'); // Import UserService


const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    const blogPosts = await blogPostService.getAllBlogPosts();
    res.status(200).json({data: blogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: `Internal server error while fetching all the blogPosts on controller`});
  }
};

const getBlogPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blogPost = await blogPostService.getBlogPostById(id);
    if (!blogPost) {
        res.status(404).json({message: `BlogPost not found with id ${id}`});
    }
    res.status(200).json({data: blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: `Internal server error while fetching blogPost with id ${req.params.id} on controller`});
  }
};

const createBlogPost = async (req: Request, res: Response) => {
  try {
    let imageUrl = null;
    const { domain, title_h3, short_description, service_info, order, status } = req.body;

    if (req.file) {
        const uploadResponse = await uploadToS3(req.file, 'blogPost');
        imageUrl = uploadResponse.Location;
    }

    const blogPostData= {
        domain,
        title_h3,
        short_description,
        service_info,
        image_url: imageUrl,
        order,
        status

    };

    const blogPost = await blogPostService.createBlogPost(blogPostData);
    res.status(201).json({data: blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: `Internal server error while creating blogPost on controller`});
  }
};

const updateBlogPost = async (req: Request, res: Response) => {
  try {
    let imageUrl = null;
    const { domain, title_h3, short_description, service_info, order, status } = req.body;

    if (req.file) {
        const uploadResponse = await uploadToS3(req.file, 'blogPost');
        imageUrl = uploadResponse.Location;
    }

    const blogPostData= {
        domain,
        title_h3,
        short_description,
        service_info,
        image_url: imageUrl,
        order,
        status

    };
    const { id } = req.params;
    const blogPost = await blogPostService.updateBlogPost(id,  blogPostData);
    if (!blogPost) {
        res.status(404).json({message: `BlogPost not found with id ${id}`});
    }
    res.status(200).json({data: blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: `Internal server error while updating blogPost with id ${req.params.id} on controller`});
  }
};

const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const deleted = await blogPostService.deleteBlogPost(req.params.id);
    if (!deleted) {
        res.status(404).json({message: `BlogPost not found with id ${id}`});
    }
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({message: `Internal server error while deleting blogPost with id ${req.params.id} on controller`});
  }
};

const getBlogPostByDomain = async (req: Request, res: Response) => {
    try {
        const { domain } = req.params;
        const blogPosts = await blogPostService.getBlogPostByDomain(domain);
        if (!blogPosts) {
            res.status(404).json({message: `BlogPost not found with domain ${domain}`});
        }
        res.status(200).json({data: blogPosts });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: `Internal server error while fetching blogPost with domain ${req.params.domain} on controller`});
    }
};

