import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
    try {
        let mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined in .env file");
        }
        // Remove any trailing slashes
        mongoUrl = mongoUrl.trim().replace(/\/+$/, "");
        // Check if URL has a database name (format: mongodb://host:port/dbname)
        // We need at least 4 parts: mongodb:, empty, host:port, dbname
        const urlParts = mongoUrl.split('/');
        const hasDbName = urlParts.length === 4 && urlParts[3].length > 0;
        if (!hasDbName) {
            // URL has no database name, append "travel"
            mongoUrl = mongoUrl + "/travel";
            console.log("Database name not specified, using default: travel");
        }
        const conn = await mongoose.connect(mongoUrl);
        console.log(`MongoDB Connected to: ${conn.connection.name}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        }
        else {
            console.error("Error connecting to MongoDB:", String(error));
        }
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map