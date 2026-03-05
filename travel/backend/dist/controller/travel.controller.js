import Travel from "../models/travel.model.js";
export const addTravel = async (req, res) => {
    try {
        const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
        const userId = req.user?._id;
        if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const travel = new Travel({
            title,
            story,
            visitedLocation,
            imageUrl,
            visitedDate,
            userId,
            isFavourite: false,
            createdOn: new Date()
        });
        const savedTravel = await travel.save();
        return res.status(201).json({
            success: true,
            data: savedTravel
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
export const getTravel = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const travelstories = await Travel.find({ userId: userId }).sort({
            isFavourite: -1,
            createdOn: -1,
        });
        return res.status(200).json({ stories: travelstories });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "get api not work ",
        });
    }
};
//# sourceMappingURL=travel.controller.js.map