import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const { username } = useAuthStore(state => state.auth); // Récupérer l'username
  const [OTP, setOTP] = useState('');
  const [otpSent, setOtpSent] = useState(() => {
    // Vérifier dans le localStorage si l'OTP a été envoyé
    return localStorage.getItem('otpSent') === 'true'; 
  });
  
  const isFirstRender = useRef(true); // Utiliser useRef pour stocker le statut du premier rendu
  const navigate = useNavigate();

  // Vérifie si l'OTP doit être envoyé
  const shouldSendOTP = () => {
    const otpSentTime = localStorage.getItem('otpSentTime'); // Récupérer la date d'envoi de l'OTP
    if (otpSent && otpSentTime) {
      const currentTime = new Date();
      const elapsedTime = currentTime - new Date(otpSentTime); // Temps écoulé depuis l'envoi de l'OTP
      const otpTimeout = 60 * 1000; // 1 minute
      return elapsedTime > otpTimeout; // Vérifie si 1 minute est écoulée
    }
    return true; // Si l'OTP n'a jamais été envoyé, on peut l'envoyer
  };

  const sendOTP = async () => {
    if (username) {
      try {
        console.log("Username: ", username); // Log du nom d'utilisateur
        const otpResponse = await generateOTP(username); // Attendre la réponse de la fonction
        console.log("OTP Response: ", otpResponse); // Log de la réponse
  
        // Vérifiez si la réponse est valide
        if (otpResponse) {
          toast.success('OTP has been sent to your email!');
          setOtpSent(true); // Marque OTP comme envoyé
          localStorage.setItem('otpSent', 'true'); // Stocker dans localStorage
          localStorage.setItem('otpSentTime', new Date().toISOString()); // Stocker la date d'envoi
        } else {
          toast.error('Problem while generating OTP');
        }
      } catch (error) {
        console.error("Error generating OTP: ", error); // Log de l'erreur
        toast.error('Problem while generating OTP');
      }
    } else {
      toast.error('No username found!');
    }
  };
  

  // Utiliser useEffect pour générer l'OTP au premier rendu si pas encore envoyé
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Après le premier rendu, on met à jour isFirstRender
      if (shouldSendOTP()) {
        sendOTP(); // Envoyer l'OTP seulement si on ne l'a pas encore fait ou si le délai a expiré
      } else {
        toast.info('OTP has already been sent! Please wait before requesting a new one.'); // Affiche un toast d'information
      }
    }
  }, [username, otpSent]);

  // Fonction pour gérer la soumission du formulaire
  async function onSubmit(e) {
    e.preventDefault();
    console.log("Submitting OTP: ", OTP);
    try {
        const { status } = await verifyOTP(username, OTP); // Assurez-vous que username est passé ici
        console.log("Verification status: ", status);
        if (status === 201) { // Vérifiez que le statut est 200 (OK)
            toast.success('Verified Successfully');
            navigate('/reset');
        } else {
            toast.error('Wrong OTP! Check your email again!');
        }
    } catch (error) {
        console.error("Verification error: ", error);
        toast.error('Error while verifying OTP!');
    }
}

  
  // Fonction pour renvoyer l'OTP lors du clic sur "Resend"
  const resendOTP = async (e) => {
    e.preventDefault(); // empêche la soumission du formulaire
    if (shouldSendOTP()) {
      setOTP(''); // Réinitialiser l'OTP
      await sendOTP();
      toast.success('OTP has been resent!'); // Affiche un toast de succès
    } else {
      toast.error('Please wait before requesting a new OTP.'); // Message d'attente
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recuperation</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter your confirmation code
            </span>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>
            <div className="flex flex-col mb-6">
              <div className="textbox flex flex-col items-center gap-6">
                <span className='py-2 text-sm text-left text-gray-500'>
                  Enter the 6-digit code sent to your email
                </span>
                <input
                  type="text"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  id="OTP"
                  placeholder='Confirmation Code'
                  className={styles.textbox}
                />
                <button className={styles.btn} type="submit">Verify</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>
                  Didn't receive your code? <button className='text-red-500' onClick={resendOTP}>Resend</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
