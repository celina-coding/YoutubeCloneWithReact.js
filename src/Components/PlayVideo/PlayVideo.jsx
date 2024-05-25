import React, { useState } from 'react';
import { useEffect } from 'react';
import './PlayVideo.css';

import video1 from '../../assets/video.mp4';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
   // State variables for like and dislike counts, and whether the video is liked/disliked
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const { videoId } = useParams(); // Obtenir l'ID de la vidéo depuis les paramètres d'URL
  const [video, setVideo] = useState(null); // État pour stocker les détails de la vidéo
  const [relatedVideos, setRelatedVideos] = useState([]); // État pour stocker les vidéos associées


  // No need for `isDisliked` state anymore

  const onLikeButtonClick = () => {
    const newLikeCount = likeCount + (isLiked ? -1 : 1);
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);
  };

  const onDislikeButtonClick = () => {
    // Update dislike count only if the video is not already disliked
    if (!isLiked) {
      setDislikeCount(dislikeCount + 1); // Correct update here
    } else {
      setDislikeCount(dislikeCount - 1);
      setIsLiked(true); // Set liked to true to remove dislike
    }
  }


  const handleShareClick = () => {
    // Get the current video URL
    const videoUrl = window.location.href;

    // Use the Clipboard API to copy the URL to clipboard
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        console.log('Video URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy video URL:', err);
      });
  };
  

  return (
    <div className='play-video'>
      <video src={video1} controls autoPlay muted />
      <h3>Comment se sentir une fois vous avez fini les etudes ya dellali</h3>
      <div className="play-video-info">
        <p>24k vues , ya 2 jours</p>
        <div>
          <span>
            <img src={like} alt="Like" onClick={onLikeButtonClick} />
            <br />
             {`${likeCount}`.padStart(2, '0')}
          </span>
          <span>
            <img src={dislike} alt="Dislike" onClick={onDislikeButtonClick} />
            <br />
            {`${dislikeCount}`.padStart(2, '0')}
          </span>
          
          <span className="share-button" onClick={handleShareClick}>
            <img src={share} alt="Share" />
            Share
          </span>
         
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
        <div>
          <p>litou</p>
          <span>1M d'abonnees</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>Cette chaine de devlopememnt personnel</p>
        <p>Subscribe litou to watch more tutorials</p>
        <hr />
        <h4>10 comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>litou <span>one day ago</span></h3>
            <p>cool video broooo</p>
            <div className="comment-action">
              <img src={like} alt="Like" />
              <span>50</span>
              <img src={dislike} alt="Dislike" />
              <span>20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
