import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { addTravel, getTravel } from "../controller/travel.controller.js";
const userTravel = express.Router();
userTravel.post('/addtravel', auth, addTravel);
userTravel.get('/gettravel', auth, getTravel);
export default userTravel;
//# sourceMappingURL=travel.route.js.map