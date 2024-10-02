import React, { useState, useEffect } from 'react';
import avatar from '../assets/User-profile.png';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/Validate';
import { Link } from 'react-router-dom';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { updateUser } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

// Déclaration du composant fonctionnel Profile
export default function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  // Récupération des fonctions de Zustand
  const setActive = useAuthStore((state) => state.setActive);
  const setUsername = useAuthStore((state) => state.setUsername);
  // Log the API data for debugging
  useEffect(() => {
    console.log("API Data:", apiData);
  }, [apiData]);

  // Initialisation de Formik pour gérer le formulaire
  const formik = useFormik({
    initialValues: {
      prenom: apiData?.prenom || '',
      nom: apiData?.nom || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      // Assigner l'avatar ou utiliser l'image existante
      values = {
        ...values,
        profile: file || apiData?.profile || '', // Utilise l'image actuelle si aucune nouvelle image n'est téléchargée
      };
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success: <b>Update Successfully...!</b>,
        error: <b>Could not update</b>
      });
    },
  });

  // Gestion de l'upload de fichier
  const onUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return; // Assure-toi qu'un fichier est sélectionné
    const base64 = await convertToBase64(selectedFile);
    setFile(base64);  // Stocke l'image convertie en base64 dans l'état local
  };


  // logout handler function
  function userLogout() {
    // Vider tout le localStorage
    localStorage.clear();
    
    // Réinitialiser l'état du store Zustand
    setActive(false);    // Désactiver l'utilisateur
    setUsername('');     // Réinitialiser le nom d'utilisateur
    
    // Redirection vers la page de connexion
    navigate('/');
  }

  // Vérification : Si une nouvelle image est uploadée, elle doit être prioritaire à l'affichage
  const profileImage = file || apiData?.profile || avatar;

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass}`} style={{ width: "45%" }}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              Vous pouvez modifier les détails
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  {/* Affichage de l'avatar sélectionné ou de l'avatar par défaut */}
                  <img src={profileImage} className={extend.profile_img} alt="avatar" />
                </label>
                <input onChange={onUpload} type="file" id="profile" accept="image/*" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <input
                    type="text"
                    id="prenom"
                    placeholder='Prenom'
                    name="prenom"
                    className={`${styles.textbox} ${extend.textbox}`}
                    {...formik.getFieldProps('prenom')}
                  />
                  <input
                    type="text"
                    id="nom"
                    placeholder='Nom'
                    name="nom"
                    className={`${styles.textbox} ${extend.textbox}`}
                    {...formik.getFieldProps('nom')}
                  />
                </div>
                <div className="name flex w-3/4 gap-10">
                  <input
                    type="text"
                    id="mobile"
                    placeholder='Contact'
                    className={`${styles.textbox} ${extend.textbox}`}
                    name="mobile"
                    {...formik.getFieldProps('mobile')}
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder='Adresse email*'
                    className={`${styles.textbox} ${extend.textbox}`}
                    name="email"
                    {...formik.getFieldProps('email')}
                  />
                </div>
                <div className="name flex w-3/4 gap-10">
                  <input
                    type="text"
                    id="address"
                    placeholder='Adresse'
                    className={`${styles.textbox} ${extend.textbox}`}
                    name="address"
                    {...formik.getFieldProps('address')}
                  />
                  <button className={styles.btn} type="submit">Modifier</button>
                </div>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Vous voulez vous déconnecter ? <button className='text-red-500' onClick={userLogout}>Se déconnecter</button></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
