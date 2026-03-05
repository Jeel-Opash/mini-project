import mongoose, { Document, Model } from "mongoose";
export interface ITravelStory extends Document {
    title: string;
    story: string;
    visitedLocation: string[];
    isFavourite: boolean;
    userId: mongoose.Types.ObjectId;
    createdOn: Date;
    imageUrl: string;
    visitedDate: Date;
}
declare const TravelStory: Model<ITravelStory>;
export default TravelStory;
//# sourceMappingURL=travel.model.d.ts.map