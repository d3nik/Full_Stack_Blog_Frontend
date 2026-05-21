import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { isAuthSelector, logout } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector(state => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onClickLogout = () => {
    handleMenuClose();
    if (window.confirm('Ви дійсно хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  // Get first letter of name
  const getFirstLetter = () => {
    return userData?.fullName?.charAt(0).toUpperCase() || 'U';
  };

  // Get avatar URL or use initials
  const getAvatarContent = () => {
    if (userData?.avatarUrl) {
      return (
        <Avatar
          alt={userData?.fullName}
          src={`http://localhost:4021${userData.avatarUrl}`}
          sx={{ width: 40, height: 40, cursor: 'pointer' }}
        />
      );
    }

    return (
      <Avatar sx={{ width: 40, height: 40, cursor: 'pointer', bgcolor: '#b243ee' }}>
        {getFirstLetter()}
      </Avatar>
    );
  };


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>D3_NIK BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Створити статтю</Button>
                </Link>
                
                <div 
                  className={styles.avatarContainer}
                  onClick={handleAvatarClick}
                  title={userData?.fullName}
                >
                  {getAvatarContent()}
                </div>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem disabled sx={{ fontWeight: 500 }}>
                    {userData?.fullName}
                  </MenuItem>
                  <MenuItem onClick={handleProfileClick}>
                    Профіль
                  </MenuItem>
                  <MenuItem onClick={onClickLogout}>
                    Вийти
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Увійти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
  // return (
  //   <div className={styles.root}>
  //     <Container maxWidth="lg">
  //       <div className={styles.inner}>
  //         <Link className={styles.logo} to="/">
  //           <div>D3_NIK BLOG</div>
  //         </Link>
  //         <div className={styles.buttons}>
  //           {isAuth ? (
  //             <>
  //               <Link to="/add-post">
  //                 <Button variant="contained">Створити статтю</Button>
  //               </Link>
  //               <Button onClick={onClickLogout} variant="contained" color="error">
  //                 Вийти
  //               </Button>
  //             </>
  //           ) : (
  //             <>
  //               <Link to="/login">
  //                 <Button variant="outlined">Увійти</Button>
  //               </Link>
  //               <Link to="/register">
  //                 <Button variant="contained">Створити аккаунт</Button>
  //               </Link>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </Container>
  //   </div>
  // );
};
