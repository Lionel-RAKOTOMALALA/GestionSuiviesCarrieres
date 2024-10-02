/** 
 * Fonction pour convertir un fichier en Base64
 * @param {File} file - Le fichier à convertir
 * @returns {Promise} - Une promesse qui renvoie la chaîne Base64 du fichier ou une erreur
 */
export default function convertToBase64(file) {
    // Retourne une promesse qui se résout avec la donnée en Base64 ou se rejette en cas d'erreur
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();  // Création d'une nouvelle instance de FileReader pour lire le fichier
        
        // Utilisation de la méthode readAsDataURL pour lire le fichier et le convertir en Base64
        fileReader.readAsDataURL(file); 
        
        // Quand le fichier est chargé avec succès
        fileReader.onload = () => {
            resolve(fileReader.result); // La promesse est résolue avec le résultat en Base64
        };

        // En cas d'erreur de lecture du fichier
        fileReader.onerror = (error) => {
            reject(error); // La promesse est rejetée avec l'erreur correspondante
        };
    })
}
