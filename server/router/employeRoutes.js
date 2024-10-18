import express from 'express';
import { ajouterNouvelEmploye,obtenirDetailsEmploye,afficherTousLesEmployes,afficherTousLesEmployesAvecAffectationsTriees, mettreAJourEmploye  } from '../controllers/employeController.js';
import Auth from '../middleware/auth.js';
const router = express.Router();

router.post('/ajouter', Auth, ajouterNouvelEmploye);

// Route pour afficher toutes les données liées à un employé
router.get('/:employeId', obtenirDetailsEmploye);
// Route pour afficher tout les employés
router.get('/', afficherTousLesEmployes);
// Route pour afficher tout les employés
// router.get('/employeAffectDate/:', afficherTousLesEmployesAvecAffectationsTriees);

router.put('/:employeId',Auth, mettreAJourEmploye )
export default router;
