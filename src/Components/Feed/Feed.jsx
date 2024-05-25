import React, { useEffect } from 'react';
import { auth, db } from '../../firebase/config';
import './Feed.css';
import thumbnail1 from '../../assets/thumbnail1.png'
import {Link} from 'react-router-dom'
import { API_KEY } from '../../data'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { useState } from 'react';
import VideoUploadForm from '../VideoUploadForm'; // Importez le composant VideoUploadForm
import { collection, getDocs } from "firebase/firestore"; // Importez les fonctions nécessaires pour Firestore




const Feed = () => {


   const [videos, setVideos] = useState([]); // État pour stocker les vidéos
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

  return (
    <div>

  
     {/* Section pour afficher les vidéos */}
     <section className='video-gallery'>
     {videos.map((video) => (
        <div key={video.id} className='video-card'>
           <Link to={`video/20/${video.id}`}>
           <img src={video.thumbnailURL} alt={video.title} className='video-thumbnail' />
              <h3>{video.title}</h3>
              <p>Uploaded by: {video.username}</p>
          </Link>  
        </div> 
              
     ))}
     </section>  

      
      </div>

          )}
    

export default Feed
