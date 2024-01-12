import User, {IUser} from '../models/User'


const getAllUsers = async (): Promise<IUser[]> => {
    try {
        return await User.find();
    }
    catch(err){
        console.log(err)
        throw new HttpErrors(500, `Internal server error while fetching all the users`)
    }
}

const getUserById = async (id: string): Promise<IUser | null> => {
    try {
        const user = await User.findById(id);
        return user;
    }
    catch(err){
        console.log(err)
        throw new HttpErrors(500, `Internal server error while fetching user with id ${id}`);
    }
}

const createUser = async (userData: IUser): Promise<IUser> => {
    try {
        const user = new User(userData);
        return await user.save();
    }
    catch(err){
        console.log(err)
        throw new HttpErrors(500, `Internal server error while creating user`);
    }
}

const updateUser = async (id: string, userData: IUser): Promise<IUser | null> => {
    try {
        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        return user;
    }
    catch(err){
        console.log(err)
        throw new HttpErrors(500, `Internal server error while updating user with id ${id}`);
    }
}

const deleteUser = async (id: string): Promise<boolean> => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return false;
        }
        return true;
    }
    catch(err){
        console.log(err)
        throw new HttpErrors(500, `Internal server error while deleting user with id ${id}`);
    }
}


module.exports ={
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

