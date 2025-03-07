import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    name: String,
    email: String,
});

export default model<IUser>('User', userSchema);
