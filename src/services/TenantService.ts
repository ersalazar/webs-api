import Tenant, {ITenant} from '../models/Tenant'

const getAllTenants = async (): Promise<ITenant[]> => {
    try {
        return await Tenant.find()
    } catch (err) {
        console.log(err)
        throw new HttpErrors(500, `Internal server error while fetching all tenants`)
    }
}

const getTenantById = async (id: string): Promise<ITenant> => {
    try {
        const tenant = await Tenant.findById(id)
        if (!tenant) {
            throw new HttpErrors(404, `Tenant not found`)
        }
        return tenant
    } catch (err) {
        console.log(err)
        throw new HttpErrors(500, `Internal server error while fetching tenant by id`)
    }
}

const createTenant = async (tenantData: ITenant): Promise<ITenant> => {
    try {
        return await Tenant.create(tenantData)
    } catch (err) {
        console.log(err)
        throw new HttpErrors(500, `Internal server error while creating tenant`)
    }
}

const updateTenant = async (id: string, tenantData: ITenant): Promise<ITenant> => {
    try {
        const updatedTenant = await Tenant.findByIdAndUpdate(id, tenantData, { new: true })
        if (!updatedTenant) {
            throw new HttpErrors(404, `Tenant not found`)
        }
        return updatedTenant
    } catch (err) {
        console.log(err)
        throw new HttpErrors(500, `Internal server error while updating tenant`)
    }
}

const deleteTenant = async (id: string): Promise<void> => {
    try {
        const deletedTenant = await Tenant.findByIdAndDelete(id)
        if (!deletedTenant) {
            throw new HttpErrors(404, `Tenant not found`)
        }
    } catch (err) {
        console.log(err)
        throw new HttpErrors(500, `Internal server error while deleting tenant`)
    }
}

export {
    getAllTenants,
    getTenantById,
    createTenant,
    updateTenant,
    deleteTenant
}
