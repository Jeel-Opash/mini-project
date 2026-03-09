import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { addTravel, editTravel, getTravel, deleteTravel, favTravel, search, filter } from "../controller/travel.controller.js";
const travelRouter = express.Router();
travelRouter.post("/addtravel", auth, addTravel);
travelRouter.get("/gettravel", auth, getTravel);
travelRouter.patch("/edittravel/:id", auth, editTravel);
travelRouter.delete("/deletetravel/:id", auth, deleteTravel);
travelRouter.put("/favtravel/:id", auth, favTravel);
travelRouter.get("/search", auth, search);
travelRouter.get("/filter", auth, filter);
export default travelRouter;
//# sourceMappingURL=travel.route.js.map