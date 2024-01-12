import mongoose, {Schema, Document} from "mongoose";

export interface IBlogPost extends Document {
    domain: string;
    title_h3: string;
    short_description: string,
    service_info: string;
    image_url: string | null;
    order: number;
    status: boolean;
}

const blogPostSchema: Schema<IBlogPost> = new Schema<IBlogPost>(
    {
        domain : {type: String, required: true},
        title_h3: {type: String, required: true},
        short_description: {type: String, required: true},
        service_info: {type: String, required: true},
        image_url: {type: String, required: false},
        order: {type: Number, required: true},
        status: {type: Boolean, required: true, default: true}
    },
    { timestamps : true }
)

const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema)

export default BlogPost;