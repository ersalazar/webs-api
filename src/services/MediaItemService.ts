
import MediaItem, {IMediaItem} from "../models/MediaItem";

const getAllMediaItem = async() : Promise<IMediaItem[]> =>{
    try {
        return await MediaItem.find()
    }
    catch(err: any){
        console.log(err)
        throw new HttpErrors(500, `Internal server error while fetching all MediaItems`)
    }
}

const createMediaItem = async (mediaItemData: IMediaItem): Promise<IMediaItem> => {
    try {
        const createdMediaItem = await MediaItem.create(mediaItemData);
        return createdMediaItem;
    } catch (err: any) {
        console.log(err);
        throw new HttpErrors(500, `Internal server error while creating MediaItem`);
    }
};

const getMediaItemById = async(id: string) : Promise<IMediaItem> => {
    try {
        const mediaItem = await MediaItem.findById(id);

        if (!mediaItem) {
            throw new HttpErrors(404, `Blog post with id ${id} not found`);
        }

        return mediaItem;
    }
    catch (err: any){
        console.log(err);
        throw new HttpErrors(500, `Internal server error while fetching MediaItem with id ${id}`);
    }
}

const updateMediaItem = async (id: string, mediaItemData: IMediaItem): Promise<IMediaItem> => {
    try {
        const updatedMediaItem = await MediaItem.findByIdAndUpdate(id, mediaItemData, { new: true });

        if (!updatedMediaItem) {
            throw new HttpErrors(404, `MediaItem with id ${id} not found`);
        }

        return updatedMediaItem;
    } catch (err: any) {
        console.log(err);
        throw new HttpErrors(500, `Internal server error while updating MediaItem with id ${id}`);
    }
};

const deleteMediaItem = async (id: string): Promise<void> => {
    try {
        const deletedMediaItem = await MediaItem.findByIdAndDelete(id);

        if (!deletedMediaItem) {
            throw new HttpErrors(404, `MediaItem with id ${id} not found`);
        }
    } catch (err: any) {
        console.log(err);
        throw new HttpErrors(500, `Internal server error while deleting MediaItem with id ${id}`);
    }
};

const getAllByTenant = async (tenantId: string): Promise<IMediaItem[]> => {
    try {
        const mediaItems = await MediaItem.find({ tenantId });
        return mediaItems;
    } catch (err: any) {
        console.log(err);
        throw new HttpErrors(500, `Internal server error while fetching MediaItems for tenant ${tenantId}`);
    }
};

module.exports = {
    getAllByTenant,
    getAllMediaItem,
    getMediaItemById,
    createMediaItem,
    updateMediaItem,
    deleteMediaItem,
}