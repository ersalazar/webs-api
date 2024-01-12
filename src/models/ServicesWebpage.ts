import mongoose, {Schema, Document} from "mongoose";

export interface IServicesWebpage extends Document {
    domain: string;
    url: string;
    page_category: 'reparar' | 'reparacion';
    window_title: string;
    title_h1: string;
    subtitle_h2: string;
    meta_description: string;
    meta_keywords: string;
    image_url: string;
    mobile_image_url: string;
}

const servicesWebpageSchema: Schema<IServicesWebpage> = new Schema<IServicesWebpage>(
    {
        domain: { type: String, required: true },
        url: { type: String, required: true },
        page_category: { type: String, enum: ['reparar', 'reparacion'], required: true },
        window_title: { type: String, required: true },
        title_h1: { type: String, required: true },
        subtitle_h2: { type: String, required: true },
        meta_description: { type: String, required: true },
        meta_keywords: { type: String, required: true },
        image_url: { type: String, required: true },
        mobile_image_url: { type: String, required: true },
    },
    {
        timestamps: true
    }
    );
    
const ServivesWebpage = mongoose.model<IServicesWebpage>('ServicesWebpage', servicesWebpageSchema)

export default ServivesWebpage;


