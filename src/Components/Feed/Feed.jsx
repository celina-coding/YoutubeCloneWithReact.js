import React, { useEffect } from 'react';
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



const Feed = () => {


   


  return (
    <div className="feed">
    
       
       <Link to={`video/20/4521`} className='card'>
              <img src={thumbnail1} alt=""/>
              <h2>Meilleure chaine youtube ever !!!!</h2>
              <h3> LOLITA</h3>
              <p> 24k vues , ya 2 jours</p>
           </Link>  
        



           <div className="card">
       
       <Link to={`video/20/4521`} className='card'>
              <img src={thumbnail2} alt=""/>
              <h2>Meilleure chaine youtube ever !!!!</h2>
              <h3> LOLITA</h3>
              <p> 24k vues , ya 2 jours</p>
           </Link>  
           </div> 




           <div className="card">
       
       <Link to={`video/20/4521`} className='card'>
              <img src={thumbnail3} alt=""/>
              <h2>Meilleure chaine youtube ever !!!!</h2>
              <h3> LOLITA</h3>
              <p> 24k vues , ya 2 jours</p>
           </Link>  
           </div>
         
     

      
      </div>

          )}
    

export default Feed
