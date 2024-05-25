import React, { useState } from 'react';

const videoform = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [video, setVideo] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleVideoChange = (e) => setVideo(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation des données ici si nécessaire
    onSubmit({ title, username, video });
    // Réinitialiser le formulaire après la soumission si nécessaire
    setTitle('');
    setUsername('');
    setVideo(null);
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="Titre de la vidéo" />
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Nom d'utilisateur" />
      <input type="file" onChange={handleVideoChange} accept="video/*" />
      <button type="submit">Publier</button>
    </form>

  );
};

export default videoform;