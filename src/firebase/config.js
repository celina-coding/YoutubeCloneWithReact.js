import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Votre configuration Firebase pour votre application web

  const firebaseConfig = {
    apiKey: "AIzaSyBVLljTIYnqgCm5GQR7FSV0EyX51QIuIPQ",
    authDomain: "video-project-with-firebase.firebaseapp.com",
    databaseURL: "https://video-project-with-firebase-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "video-project-with-firebase",
    storageBucket: "video-project-with-firebase.appspot.com",
    messagingSenderId: "377453697780",
    appId: "1:377453697780:web:63a0fdb5d1dfe020fc1ca1"
  };
  


// Initialisez Firebase avec votre configuration
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Définir la fonction handleSubmit pour gérer l'envoi du formulaire
const handleSubmit = async (event, title, file, thumbnail, setFormSubmitted, handleUploadMessage) => {
  event.preventDefault();

  // Vérifier si les champs requis sont remplis
  if (!title || !file || !thumbnail) {
    alert('Veuillez remplir tous les champs du formulaire.');
    return;
  }

  try {
    // Obtenir l'utilisateur actuellement connecté
    const user = auth.currentUser;
    if (!user) {
      alert('Vous devez être connecté pour publier une vidéo.');
      return;
    }

    const uid = user.uid;

    // Télécharger le fichier vidéo dans Firebase Storage
    const videoRef = ref(storage, `videos/${file.name}`);
    const videoUploadTask = uploadBytesResumable(videoRef, file);

    // Télécharger la miniature dans Firebase Storage
    const thumbnailRef = ref(storage, `thumbnails/${thumbnail.name}`);
    const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnail);

    // Attendre le succès du téléchargement de la vidéo et de la miniature
    await Promise.all([videoUploadTask, thumbnailUploadTask]);

    // Récupérer les URL de téléchargement de la vidéo et de la miniature
    const videoURL = await getDownloadURL(videoUploadTask.snapshot.ref);
    const thumbnailURL = await getDownloadURL(thumbnailUploadTask.snapshot.ref);

    // Récupérer le document de l'utilisateur pour obtenir le username
    const userDocRef = doc(db, 'Users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const username = userData.username;

      // Créer un nouveau document dans la collection "videos"
      const videoDocRef = await addDoc(collection(db, 'videos'), {
        userId: uid,
        username: username,
        title: title,
        videoURL: videoURL,
        thumbnailURL: thumbnailURL // Ajouter le champ de miniature de vidéo
      });
      console.log('Document added with ID: ', videoDocRef.id);
      setFormSubmitted(true); // Mettre à jour l'état pour indiquer que le formulaire a été soumis avec succès
    } else {
      console.error('User document not found');
      handleUploadMessage("Erreur: utilisateur non trouvé.");
    }
  } catch (error) {
    console.error("Error uploading file: ", error);
    handleUploadMessage("Erreur lors du téléchargement de la vidéo.");
  }
};

export { app, auth, db, storage, handleSubmit };
