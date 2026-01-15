import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export const Index = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://images.pexels.com/photos/66863/goose-water-bird-nature-bird-66863.jpeg?cs=srgb&dl=pexels-pixabay-66863.jpg&fm=jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написати коментар"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Відправити</Button>
        </div>
      </div>
    </>
  );
};
