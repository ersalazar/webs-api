import mongoose, {Schema, Document} from 'mongoose';

export interface ITenant extends Document {
    name: string;
    domaian: string;
}

const tenantSchema : Schema<ITenant> = new Schema<ITenant> (
    {
        name: {type: String, required: true},
        domaian: {type: String, required : true},
    },
    { 
        timestamps : true
    }
);

const Tenant = mongoose.model<ITenant>('Tenant', tenantSchema);

export default Tenant;