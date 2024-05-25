import React, { useState } from 'react';
import { storage, db, auth } from '../firebase/config'; // Assurez-vous d'importer 'auth' depuis le fichier de configuration Firebase
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import '../styles/VideoUploadForm.css';

function VideoUploadForm() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleThumbnailChange = (event) => {
    const selectedThumbnail = event.target.files[0];
    setThumbnail(selectedThumbnail);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !file || !thumbnail) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    try {
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
          console.error("Error uploading file: ", error);
          setUploadMessage("Erreur lors du téléchargement de la vidéo.");
        }, 
        async () => {
          console.log('File uploaded successfully');
          setUploadMessage("Vidéo téléchargée avec succès.");
          setFormSubmitted(true);

          try {
            const videoURL = await getDownloadURL(uploadTask.snapshot.ref);
            const thumbnailRef = ref(storage, `thumbnails/${thumbnail.name}`);
            const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnail);

            thumbnailUploadTask.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Thumbnail upload is ' + progress + '% done');
              },
              (error) => {
                console.error("Error uploading thumbnail: ", error);
              },
              async () => {
                console.log('Thumbnail uploaded successfully');
                const thumbnailURL = await getDownloadURL(thumbnailUploadTask.snapshot.ref);
                const userId = auth.currentUser.uid;

                // Récupérer le nom d'utilisateur de l'utilisateur actuellement connecté
                const userDocRef = doc(db, 'Users', userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                  const userData = userDocSnap.data();
                  const username = userData.username;

                  // Ajouter le document de la vidéo avec le champ 'username'
                  const videoRef = await addDoc(collection(db, 'videos'), {
                    title: title,
                    videoURL: videoURL,
                    thumbnailURL: thumbnailURL,
                    userId: userId,
                    username: username // Ajouter le champ 'username'
                  });
                  console.log('Document added with ID: ', videoRef.id);
                } else {
                  console.error('User document not found');
                }
              }
            );

          } catch (error) {
            console.error('Error adding document: ', error);
          }
        }
      );
    } catch (error) {
      console.error("Error uploading file: ", error);
      setUploadMessage("Erreur lors du téléchargement de la vidéo.");
    }
  };

  return (
    <div>
      {formSubmitted ? (
        <div className="success-message">
        <p>Votre vidéo a été soumise avec succès!</p>
        {uploadMessage && <p>{uploadMessage}</p>}
      </div>
      ) : (
        <form className="upload-form" onSubmit={handleSubmit}>
          <h2>Partager une vidéo</h2>
          <br />
          <label>
            Titre de la vidéo:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <br />
          <label>
            Importer une vidéo:
            <input type="file" onChange={handleFileChange} accept="video/*" />
          </label>
          <br />
          <label>
            Miniature de la vidéo:
            <input type="file" onChange={handleThumbnailChange} accept="image/*" />
          </label>
          <br />
          <button type="submit">Publier</button>
        </form>
      )}
    </div>
  );
}

export default VideoUploadForm;
