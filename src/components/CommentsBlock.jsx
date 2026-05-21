import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';

import { isAdminSelector } from '../redux/slices/auth';
import axios from '../axios';

export const CommentsBlock = ({ items, children, isLoading = true, onCommentDeleted }) => {
  const isAdmin = useSelector(isAdminSelector);
  const currentUser = useSelector(state => state.auth.user);

  const onClickRemove = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await axios.delete(`/comments/${commentId}`);
      onCommentDeleted?.();  // notify parent to re-fetch comments
    }
  };

  return (
    <SideBlock title="Коментарі">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => {
          console.log('comment obj:', obj);
          return (
          <React.Fragment key={index}>
            <ListItem 
              alignItems="flex-start"
              secondaryAction={
                (isAdmin || currentUser?._id === obj.user._id) && !isLoading ? (
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={() => onClickRemove(obj._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }
              >
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar 
                    alt={obj.user.fullName}
                    src={obj.user.avatarUrl ? `http://localhost:4021${obj.user.avatarUrl}` : ''}
                    sx={{ width: 40, height: 40 }}
                  >
                    {obj.user.fullName?.[0]?.toUpperCase()}
                  </Avatar>
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        )})}
      </List>
      {children}
    </SideBlock>
  );
};
