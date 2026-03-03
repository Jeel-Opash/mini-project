import mongoose, { Schema } from "mongoose";

const PerformanceEnum = ['Excellent', 'Good', 'Average', 'Needs Work'] as const;
const TechnologyEnum = ['html', 'css', 'js', 'react', 'node', 'mongodb', 'java', 'python', 'cpp', 'bootstrap'] as const;
const LevelEnum = ['basic', 'intermediate', 'advanced'] as const;

type PerformanceType = typeof PerformanceEnum[number];
type TechnologyType = typeof TechnologyEnum[number];
type LevelType = typeof LevelEnum[number];

interface IResult {
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

export const ResultSchema = new Schema<IResult>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    technology: {
        type: String,
        required: true,
        trim: true,
        enum: TechnologyEnum
    },
    level: {
        type: String,
        required: true,
        enum: LevelEnum
    },
    totalQuestions: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    correct: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    wrong: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    performance: {
        type: String,
        enum: PerformanceEnum,
        default: 'Needs Work'
    }
}, {
    timestamps: true
});

(ResultSchema as any).pre('save', function (this: mongoose.Document & IResult, next: (err?: any) => void) {
    const total = Number(this.totalQuestions) || 0;
    const correct = Number(this.correct) || 0;

    this.score = total ? Math.round((correct / total) * 100) : 0;

    if (this.score >= 85) this.performance = 'Excellent';
    else if (this.score >= 65) this.performance = 'Good';
    else if (this.score >= 45) this.performance = 'Average';
    else this.performance = 'Needs Work';

    if ((this.wrong === undefined || this.wrong === null) && total) {
        this.wrong = Math.max(0, total - correct);
    }

    next();
});

export const Result =
    mongoose.models.Result || mongoose.model<IResult>('Result', ResultSchema);