

import { model } from "mongoose";
import ServivesWebpage, {IServicesWebpage} from "../models/ServicesWebpage";


const getAllServicesWebpages =async (): Promise<IServicesWebpage[]> => {
    try{
        return await ServivesWebpage.find()
    }
    catch(err) {
        console.log(err)
        throw new HttpErrors(500, `Internal Server Error while fetching all ServicesWebpages`)
    }
}

const getServicesWebpageById = async (id: string): Promise<IServicesWebpage> => {
    try {
        const servicesWebpage = await ServivesWebpage.findById(id);
        if (!servicesWebpage) {
            throw new HttpErrors(404, `ServicesWebpage not found`);
        }
        return servicesWebpage;
    } catch (err) {
        console.log(err);
        throw new HttpErrors(500, `Internal Server Error while finding ServicesWebpage by id`);
    }
};


const createServicesWebpage = async (servicesWebpage: IServicesWebpage): Promise<IServicesWebpage> => {
    try {
        return await ServivesWebpage.create(servicesWebpage);
    } catch (err) {
        console.log(err);
        throw new HttpErrors(500, `Internal Server Error while creating ServicesWebpage`);
    }
};

const updateServicesWebpage = async (id: string, servicesWebpage: IServicesWebpage): Promise<IServicesWebpage> => {
    try {
        const updatedWebpage = await ServivesWebpage.findByIdAndUpdate(id, servicesWebpage, { new: true });
        if (!updatedWebpage) {
            throw new HttpErrors(404, `ServicesWebpage not found`);
        }
        return updatedWebpage;
    } catch (err) {
        console.log(err);
        throw new HttpErrors(500, `Internal Server Error while updating ServicesWebpage`);
    }
};

const deleteServicesWebpage = async (id: string): Promise<boolean> => {
    try {
        const deletedWebpage = await ServivesWebpage.findByIdAndDelete(id);
        if (!deletedWebpage) {
            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        throw new HttpErrors(500, `Internal Server Error while deleting ServicesWebpage`);
    }
};

const getAllServicesWebpagesByDomain = async (Domain: string): Promise<IServicesWebpage[]> => {
    try {
        return await ServivesWebpage.find({ Domain });
    } catch (err) {
        console.log(err);
        throw new HttpErrors(500, `Internal Server Error while fetching all ServicesWebpages by Domain`);
    }
};

module.exports = {
    getAllServicesWebpages,
    getServicesWebpageById,
    createServicesWebpage,
    updateServicesWebpage,
    deleteServicesWebpage,
    getAllServicesWebpagesByDomain
};
