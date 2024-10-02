import React, { useState } from 'react';
import avatar from '../assets/User-profile.png';
import styles from '../styles/Username.module.css';
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { registerValidation } from '../helper/Validate';
import { Link, useNavigate } from 'react-router-dom';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

// Déclaration du composant fonctionnel Register (formulaire d'inscription)
export default function Register() {

  const navigate = useNavigate();
  // useState pour gérer l'état du fichier (avatar)
  const [file, setFile] = useState();

  // Initialisation de Formik pour gérer le formulaire
  const formik = useFormik({
    // Valeurs initiales des champs du formulaire
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    // Utilisation de la fonction de validation pour les mots de passe
    validate: registerValidation,
    // Désactivation de la validation à la perte de focus
    validateOnBlur: false,
    // Désactivation de la validation à chaque changement de champ
    validateOnChange: false,

    // Fonction qui s'exécute lors de la soumission du formulaire
    onSubmit: async (values) => {
      // Assignation du fichier (avatar) au profil, ou d'une chaîne vide si aucun fichier n'est sélectionné
      values = await Object.assign(values, { profile: file || '' })
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register.</b>
      });
      registerPromise.then(function(){navigate('/')});
    },
  })

  /** Gestion de l'upload de fichier avec Formik */
  const onUpload = async e => {
    // Conversion du fichier en Base64
    const base64 = await convertToBase64(e.target.files[0]);
    // Mise à jour de l'état avec la chaîne Base64 du fichier
    setFile(base64);
  }

  // Rendu du composant Register
  return (
    <div className="container mx-auto">

      {/* Toaster pour afficher les notifications */}
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "45%" }}>

          {/* Titre de la page d'inscription */}
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Inscription</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              Rejoignez nous
            </span>
          </div>

          {/* Formulaire d'inscription */}
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">

              {/* Zone pour uploader et afficher l'image de profil */}
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  {/* Affichage de l'avatar sélectionné ou de l'avatar par défaut */}
                  <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                </label>
                {/* Input pour uploader un fichier (image de profil) */}
                <input onChange={onUpload} type="file" id="profile" />
              </div>

              {/* Champs de texte pour l'email, le nom d'utilisateur et le mot de passe */}
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  type="email"
                  id="email"
                  placeholder='Adresse email*'
                  name="email"
                  className={styles.textbox}
                  {...formik.getFieldProps('email')}
                />
                <input
                  type="text"
                  id="username"
                  placeholder="Nom d'utilisateur"
                  name="username"
                  className={styles.textbox}
                  {...formik.getFieldProps('username')}
                />
                <input
                  type="password"
                  id="password"
                  placeholder='Mot de passe'
                  name="password"
                  className={styles.textbox}
                  {...formik.getFieldProps('password')}
                />
                {/* Bouton de soumission du formulaire */}
                <button className={styles.btn} type="submit">S'inscrire</button>
              </div>

              {/* Lien pour les utilisateurs déjà inscrits pour se connecter */}
              <div className="text-center py-4">
                <span className='text-gray-500'>Vous avez déjà un compte ? <Link className='text-red-500' to="/">Se connecter</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
