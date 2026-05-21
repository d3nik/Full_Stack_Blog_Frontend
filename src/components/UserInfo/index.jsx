import React from 'react';
import styles from './UserInfo.module.scss';
import { Avatar } from '@mui/material';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Avatar className={styles.avatar} 
      src={avatarUrl ? `http://localhost:4021${avatarUrl}` : '/noavatar.png'} 
      alt={fullName}
      >
        {fullName?.[0]?.toUpperCase()}
      </Avatar>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
