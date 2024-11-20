import express from "express";
import { addService } from "../controllers/ServiceController.js"; // Assurez-vous que le chemin est correct

const router = express.Router();

router.post("/", addService);

export default router;
