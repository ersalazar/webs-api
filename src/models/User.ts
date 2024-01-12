import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'editor' | 'admin';
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ['editor', 'admin'] },
    },
    { timestamps: true } // Add timestamps option
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;