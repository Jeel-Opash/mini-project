import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { addTravel, editTravel, getTravel 
    ,deletetravel,favtravel,search} from "../controller/travel.controller.js";

const travelRouter = express.Router();

travelRouter.post("/addtravel", auth, addTravel);
travelRouter.get("/gettravel", auth, getTravel);
travelRouter.patch("/edittravel/:id", auth, editTravel);
travelRouter.delete("/deletetravel/:id", auth, deletetravel);
travelRouter.put("/favtravel/:id", auth, favtravel);
travelRouter.get("/search", auth, search);




export default travelRouter;