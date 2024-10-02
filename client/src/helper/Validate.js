import * as Yup from 'yup';
import toast from "react-hot-toast";
import { authenticate } from "./helper";

/** Schéma Yup pour valider le nom d'utilisateur */
const usernameSchema = Yup.string()
  .required(() => {
    toast.error('Username Required...!');
    return 'Username Required...!';
  });

/** Schéma Yup pour valider le mot de passe */
const passwordSchema = Yup.string()
  .required(() => {
    toast.error("Password required...!");
    return 'Password required...!';
  })
  .min(4, () => {
    toast.error('Password should be at least 4 characters long...!');
    return 'Password should be at least 4 characters long...!';
  })
  .matches(/[!@#$%^&*(),.?":{}|<>]/, () => {
    toast.error('Password should contain at least one special character...!');
    return 'Password should contain at least one special character...!';
  });

/** Schéma Yup pour valider l'email */
const emailSchema = Yup.string()
  .email(() => {
    toast.error("Invalid Email...!");
    return 'Invalid Email...!';
  })
  .required(() => {
    toast.error('Email Required...!');
    return 'Email Required...!';
  });

/** Valider le nom d'utilisateur sur la page de login */
export async function usernameValidate(values) {
  const errors = {};

  try {
    await usernameSchema.validate(values.username);
  } catch (err) {
    errors.username = err.message;
  }

  if (values.username) {
    // Check if the user exists
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exist = toast.error('User does not exist...!');
    }
  }

  return errors;
}

/** Valider le mot de passe */
export async function passwordValidate(values) {
  const errors = {};

  try {
    await passwordSchema.validate(values.password);
  } catch (err) {
    errors.password = err.message;
  }

  return errors;
}

/** Valider le formulaire d'inscription */
export async function registerValidation(values) {
  const errors = {};

  try {
    await usernameSchema.validate(values.username);
  } catch (err) {
    errors.username = err.message;
  }

  try {
    await passwordSchema.validate(values.password);
  } catch (err) {
    errors.password = err.message;
  }

  try {
    await emailSchema.validate(values.email);
  } catch (err) {
    errors.email = err.message;
  }

  return errors;
}

/** Valider la page de profil */
export async function profileValidation(values) {
  const errors = {};

  try {
    await emailSchema.validate(values.email);
  } catch (err) {
    errors.email = err.message;
  }

  return errors;
}
