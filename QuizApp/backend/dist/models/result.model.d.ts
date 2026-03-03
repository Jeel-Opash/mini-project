import mongoose, { Document, Model } from "mongoose";
export declare const PerformanceEnum: readonly ["Excellent", "Good", "Average", "Needs Work"];
export declare const TechnologyEnum: readonly ["html", "css", "js", "react", "node", "mongodb", "java", "python", "cpp", "bootstrap"];
export declare const LevelEnum: readonly ["basic", "intermediate", "advanced"];
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
export declare const Result: Model<IResult>;
export {};
//# sourceMappingURL=result.model.d.ts.map