import React from 'react';
import { signOut } from "firebase/auth";
import { Link } from 'react-router-dom'; // Import Link for routing
import { useState, useEffect } from 'react';
import {auth} from '../../firebase/config.js';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import videoAdd from '../../assets/add-video.png'
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import profile_icon from '../../assets/jack.png';
import VideoUploadForm from '../VideoUploadForm.jsx'; // Importez le composant VideoUploadForm

function Navbar() {
  const [showForm, setShowForm] = useState(false); // État pour contrôler la visibilité du formulaire
    const [videos, setVideos] = useState([]); // État pour stocker les vidéos

    // Fonction pour basculer la visibilité du formulaire
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // Fonction pour récupérer les vidéos depuis Firestore
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "videos"));
                const videosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVideos(videosData);
            } catch (error) {
                console.error("Error fetching videos: ", error);
            }
        };

        fetchVideos();
    }, []);

    function handleLogout() {
        if (confirm('Etes vous sur de vouloir vous déconnecter?')) {
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
        }
    }
  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
         <Link to="/">
          <img className='logo' src={logo} alt="" />
        </Link>
        
      </div>
   
      <div className='nav-middle flex-div'>
        <div className='search-box flex-div'>
          <input type='text' placeholder='Search' />
          <img src={search_icon} alt="" />
        </div>
      </div>

      <div className='nav-right flex-div'>
        <img className='add-video' src={videoAdd} alt=""  onClick={toggleForm} />
        
        <div className="btn-container">
                <button onClick={handleLogout} className='logout-btn'>Se deconnecter</button>
        </div>

        {/* Link to profile.jsx using React Router */}
        <Link to="/profile">
          <img src={profile_icon} className="user-icon" alt="Profile" />
        </Link>
      </div>
      {showForm && <VideoUploadForm />}
      
    </nav>


    
  );
}

export default Navbar;
