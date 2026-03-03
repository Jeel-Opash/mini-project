import mongoose, { Schema, Document, Model } from "mongoose";



export const PerformanceEnum = [
  "Excellent",
  "Good",
  "Average",
  "Needs Work",
] as const;

export const TechnologyEnum = [
  "html",
  "css",
  "js",
  "react",
  "node",
  "mongodb",
  "java",
  "python",
  "cpp",
  "bootstrap",
] as const;

export const LevelEnum = [
  "basic",
  "intermediate",
  "advanced",
] as const;

type PerformanceType = (typeof PerformanceEnum)[number];
type TechnologyType = (typeof TechnologyEnum)[number];
type LevelType = (typeof LevelEnum)[number];



export interface IResult extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  technology: TechnologyType;
  level: LevelType;
  totalQuestions: number;
  correct: number;
  wrong: number;
  score: number;
  performance: PerformanceType;
}


const ResultSchema = new Schema<IResult>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    technology: {
      type: String,
      required: true,
      enum: TechnologyEnum,
      lowercase: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      enum: LevelEnum,
      lowercase: true,
      trim: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    correct: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    wrong: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    performance: {
      type: String,
      enum: PerformanceEnum,
      default: "Needs Work",
    },
  },
  {
    timestamps: true,
  }
);



ResultSchema.pre("save", function (this: IResult) {
  const total = Number(this.totalQuestions) || 0;
  const correct = Number(this.correct) || 0;

  this.score = total
    ? Math.round((correct / total) * 100)
    : 0;

  if (this.score >= 85) this.performance = "Excellent";
  else if (this.score >= 65) this.performance = "Good";
  else if (this.score >= 45) this.performance = "Average";
  else this.performance = "Needs Work";

  if (!this.wrong && total) {
    this.wrong = Math.max(0, total - correct);
  }
});



export const Result: Model<IResult> =
  mongoose.models.Result ||
  mongoose.model<IResult>("Result", ResultSchema);