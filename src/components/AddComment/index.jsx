import React from 'react';

import styles from './AddComment.module.scss';
import axios from '../../axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export const Index = () => {
  const [comment, setComment] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const user = useSelector(state => state.auth.user);

  const handleSubmit = async ({ onCommentAdd }) => {
    axios
      .post(`/posts/${id}/comments`, { text: comment })
      .then(res => {
        setComment('');
        if (onCommentAdd) {
          onCommentAdd();
        }
      })
      .catch(err => {
        console.warn(err);
        alert('Помилка при додаванні коментаря');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={user?.avatarUrl || ''}
          sx={{ width: 40, height: 40 }}
          alt={user?.fullName}
        > 
        {user?.fullName?.[0]?.toUpperCase()}
        </Avatar>
        <div className={styles.form}>
          <TextField
            label="Написати коментар"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained"
            onClick={handleSubmit}
            disabled={isLoading || !comment.trim()}
          >
            {isLoading ? 'Завантаження...' : 'Додати коментар'}
          </Button>
        </div>
      </div>
    </>
  );
};
