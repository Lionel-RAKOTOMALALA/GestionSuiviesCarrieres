import express from 'express';
import { ajouterNouvelEmploye,obtenirDetailsEmploye,afficherTousLesEmployes,afficherTousLesEmployesAvecAffectationsTriees  } from '../controllers/employeController.js';

const router = express.Router();

router.post('/ajouter', ajouterNouvelEmploye);

// Route pour afficher toutes les données liées à un employé
router.get('/:employeId', obtenirDetailsEmploye);
// Route pour afficher tout les employés
router.get('/', afficherTousLesEmployes);
// Route pour afficher tout les employés
router.get('/employeAffectDate/:', afficherTousLesEmployesAvecAffectationsTriees);
export default router;
