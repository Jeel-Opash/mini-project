import { Document, Model } from "mongoose";
export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    createdOn: Date;
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map