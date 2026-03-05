import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdOn: Date;
}

const userSchema: Schema<IUser> = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now }
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;