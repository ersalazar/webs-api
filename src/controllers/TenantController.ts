import {Request, Response} from "express";

const TenantService = require('../services/TenantService');

const createTenant = async (req: Request, res: Response) => {
    try {
        const { name, domain } = req.body;

        const newTenant = await TenantService.createTenant({
            name,
            domain,
        });

        res.status(201).json({data: newTenant});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error while creating tenant on controller layer'});
    }
};

const getAllTenants = async (req: Request, res: Response) => {
    try {
        const tenants = await TenantService.getAllTenants();
        res.status(200).json({data: tenants});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Internal server error while fetching all tenants on controller layer' });
    }
};

const getTenantById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tenant = await TenantService.getTenantById(id);
        res.status(200).json({data: tenant});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `Internal server error while fetching tenant by id on controller layer`});
    }
};

const updateTenant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, domain } = req.body;

        const updatedTenant = await TenantService.updateTenant(id, {
            name,
            domain,
        });

        res.status(200).json({data: updatedTenant});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `Internal server error while updating tenant on controller layer`});
    }
};

const deleteTenant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await TenantService.deleteTenant(id);
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({message:  `Internal server error while deleting tenant on controller layer`});
    }
};

