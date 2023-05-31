import React from 'react';
import './style.scss';
import avatar from '../../assets/avatar.png';

const Avatar = () => (
  <picture className="avatar-wrapper">
    <img src={avatar} alt="Account image" />
  </picture>
);

export default Avatar;
