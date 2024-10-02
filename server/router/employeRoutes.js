import express from 'express';
import { ajouterNouvelEmploye } from '../controllers/employeController.js';

const router = express.Router();

router.post('/ajouter', ajouterNouvelEmploye);

export default router;
