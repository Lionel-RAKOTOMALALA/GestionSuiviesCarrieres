import React, { useEffect } from 'react';
import avatar from '../assets/profile.jpeg';
import styles from '../styles/Username.module.css';
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/Validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook'

export default function Reset() {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{isLoading, apiData,status, serverError}] = useFetch('createResetSession');

  useEffect(()=>{
    console.log(apiData);
    
  })
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      try {
        let resetPromise = resetPassword({ username, password: values.password });
        await toast.promise(resetPromise, {
          loading: 'Réinitialisation du mot de passe...',
          success: <b>Mot de passe réinitialisé avec succès!</b>,
          error: <b>Erreur lors de la réinitialisation du mot de passe.</b>
        });
        
        // Attendez que la réinitialisation du mot de passe soit terminée
        await resetPromise;
    
        // Une fois le mot de passe réinitialisé, effectuez la redirection
        navigate('/');
        
      } catch (error) {
        console.error("Erreur lors de la réinitialisation:", error);
        // Gestion des erreurs ici si nécessaire
      }
    },
  })

if(isLoading) return <h1 className=' text-2xl font-bold'>isLoading</h1>
if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Entrez un nouveau mot de passe
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">

              <div className="textbox flex flex-col items-center gap-6">
                <input
                  type="text"
                  id="password"
                  placeholder='Nouveau mot de passe'
                  name="password"
                  className={styles.textbox}
                  {...formik.getFieldProps('password')}
                />
                <input
                  type="text"
                  id="password"
                  placeholder='confirmer le mot de passe'
                  name="confirm_pwd"
                  className={styles.textbox}
                  {...formik.getFieldProps('confirm_pwd')}
                />
                <button className={styles.btn} type="submit">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
