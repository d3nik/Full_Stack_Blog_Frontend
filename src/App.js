import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserMe, isAuthSelector } from './redux/slices/auth';
import React from 'react';

import { Header } from './components';
import { Home, Profile, FullPost, Registration, AddPost, Login } from './pages';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);

  React.useEffect(() => {
    dispatch(fetchUserMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
