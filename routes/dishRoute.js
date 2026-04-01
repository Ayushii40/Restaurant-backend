import express from "express";
import { addDish, deleteDish, getAllDishes, updateDish } from "../controller/dish.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getall", getAllDishes);
router.post("/add", isAuthenticated, isAuthorized("admin"), addDish);
router.put("/update/:id", isAuthenticated, isAuthorized("admin"), updateDish);
router.delete("/delete/:id", isAuthenticated, isAuthorized("admin"), deleteDish);

export default router;
