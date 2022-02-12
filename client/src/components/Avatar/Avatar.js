import React from 'react';
import styles from './Avatar.module.css';

const Avatar = () => {
    return (
        <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className={`${styles.img} rounded-circle m-auto`}
        />
    );
};

export default Avatar;
