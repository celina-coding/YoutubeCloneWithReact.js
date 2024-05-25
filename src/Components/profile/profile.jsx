import React from 'react';
import './Profile.css';
import profile_icon from '../../assets/jack.png';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__photo">
        <img src={profile_icon} alt="" className="profile__photo-image" />
      </div>
      <div className="profile__info">
        <h1 className="profile__name">Jean Dupont</h1>
        <p className="profile__title">Développeur Front-End</p>
        <p className="profile__description">Je suis un développeur Front-End passionné par la création d'interfaces utilisateur attrayantes et réactives.</p>
      </div>
    </div>
  );
};

export default Profile;
