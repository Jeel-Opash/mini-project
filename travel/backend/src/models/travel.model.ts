import mongoose, { Schema, Document, Model } from "mongoose";

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

const travelStorySchema: Schema<ITravelStory> = new Schema({
  title: { type: String, required: true },
  story: { type: String, required: true },
  visitedLocation: { type: [String], default: [] },
  isFavourite: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdOn: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  visitedDate: { type: Date, required: true }
});

const Travel: Model<ITravelStory> = mongoose.model<ITravelStory>("TravelStory", travelStorySchema);

export default Travel;