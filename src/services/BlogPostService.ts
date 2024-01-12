
import { ModifyResult } from "mongoose";
import BlogPost, {IBlogPost} from "../models/BlogPosts";

const getAllBlogPosts = async() : Promise<IBlogPost[]> => {
    try {
        return await BlogPost.find();
    }
    catch (err: any){
        console.log(err);
        throw new HttpErrors(500, `Internal server error while fetching all blogposts`);
    }
}

const getBlogPostById = async(id: string) : Promise<IBlogPost> => {
    try {
        const blogPost = await BlogPost.findById(id);

        if (!blogPost) {
            throw new HttpErrors(404, `Blog post with id ${id} not found`);
        }

        return blogPost;
    }
    catch (err: any){
        console.log(err);
        throw new HttpErrors(500, `Internal server error while fetching blogpost with id ${id}`);
    }
}

const createBlogPost = async(blogPostData: IBlogPost) : Promise<IBlogPost> => {
    try {
        return await BlogPost.create(blogPostData);
    }
    catch (err: any){
        console.log(err);
        throw new HttpErrors(500, `Internal server error while creating blogpost`);
    }
}

const updateBlogPost = async(id: string, blogPostData: IBlogPost) : Promise<IBlogPost> => {
    try {
        const UpdatedPost = await BlogPost.findByIdAndUpdate(id, blogPostData, { new: true });

        if (!UpdatedPost){
            throw new HttpErrors(404, `Blog post with id ${id} not found`);
        }

        return UpdatedPost

    }
    catch (err: any){
        console.log(err);
        throw new HttpErrors(500, `Internal server error while updating blogpost with id ${id}`);
    }
}

const deleteBlogPost = async (id: string): Promise<void> => {
    try {
      const deletedPost = await BlogPost.findByIdAndDelete(id);
  
      if (!deletedPost) {
        throw new HttpErrors(404, `Blog post with id ${id} not found`);
      }
  
    } catch (err: any) {
      // Log the error using a proper logging mechanism
      console.error(`Error while deleting blog post: ${err.message}`);
      
      throw new HttpErrors(500, `Internal server error while deleting blog post with id ${id}`);
    }
  }
  

const getBlogsByDomain= async(domain: string) : Promise<IBlogPost[]> => {
    try {
        return await BlogPost.find({ domain });
    }
    catch (err: any){
        console.log(err);
        throw new HttpErrors(500, `Internal server error while fetching blogposts for Domain${domain}`);
    }
}

module.exports = {
    getAllBlogPosts,
    getBlogPostById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getBlogsByDomain,
}