import mongoose from 'mongoose';
import Employe from '../model/Employe.model.js';
import StatutEmploye from '../model/StatutEmploye.model.js';
import AffectationEmploye from '../model/AffectationEmploye.model.js';
import Diplome from '../model/Diplome.model.js';
import Decision from '../model/Decision.model.js';

export const ajouterNouvelEmploye = async (req, res) => {
  const { employeData, statutData, affectationData, diplomeData, decisionData } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const employe = new Employe(employeData);
    await employe.save({ session });

    const statut = new StatutEmploye({ ...statutData, employeId: employe._id });
    await statut.save({ session });

    const affectation = new AffectationEmploye({ ...affectationData, employeId: employe._id });
    await affectation.save({ session });

    if (diplomeData) {
      const diplome = new Diplome({ ...diplomeData, employeId: employe._id });
      await diplome.save({ session });
    }

    if (decisionData) {
      const decision = new Decision({ ...decisionData, employeId: employe._id });
      await decision.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ employe });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};
