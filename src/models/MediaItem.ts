import mongoose,  {Schema, Document} from "mongoose";

export interface IMediaItem extends Document {
    domain: string;
    title_h3: string;
    short_description: string;
    order: number;
    image_url: string;
    mobile_image_url: string;
    redirect_url: string;

}

const mediaItemSchema : Schema<IMediaItem> = new Schema<IMediaItem>(
    {
        domain : {type: String, required: true},
        title_h3: {type: String, required: true},
        short_description: {type: String, required: true},
        order: {type: Number, required: true},
        image_url: {type: String, required: true},
        mobile_image_url: {type: String, required: true},
        redirect_url: {type: String, required: true},
    },
    { timestamps: true}
);

const MediaItem = mongoose.model<IMediaItem>('MediaItem', mediaItemSchema);


export default MediaItem;