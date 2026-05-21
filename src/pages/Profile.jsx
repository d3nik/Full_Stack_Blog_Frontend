import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  TextField,
  Button,
  Avatar,
  Box,
  Typography,
  Alert,
  Divider,
} from '@mui/material';
import axios from '../axios';
import { updateUserProfile } from '../redux/slices/auth';

export const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user);
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    fullName: userData?.fullName || '',
    email: userData?.email || '',
    password: '',
    confirmPassword: '',
    avatarFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatarFile: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Upload avatar if changed
      let avatarUrl = userData?.avatarUrl;
      if (formData.avatarFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', formData.avatarFile);
        const uploadRes = await axios.post('/upload', formDataUpload);
        avatarUrl = uploadRes.data.url;
      }

      // Validate passwords match
      if (formData.password && formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        setLoading(false);
        return;
      }

      const updatePayload = {
        fullName: formData.fullName,
        email: formData.email,
        avatarUrl,
      };

      if (formData.password) {
        updatePayload.password = formData.password;
      }

      const response = await axios.patch('/users/profile/me', updatePayload);
      
      setMessage('Profile updated successfully');
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        email: response.data.email,
        fullName: response.data.fullName,
        password: '',
        confirmPassword: '',
        avatarFile: null,
      }));

      // Dispatch action to update Redux store
      dispatch(updateUserProfile(updatePayload));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <Container>
        <Alert severity="error">Please log in to view your profile</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={userData?.avatarUrl ? `${process.env.REACT_APP_API_URL}${userData.avatarUrl}` : ''}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" sx={{ mb: 1 }}>
            {userData?.fullName}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {userData?.email}
          </Typography>
          {userData?.role === 'admin' && (
            <Typography variant="body2" sx={{ color: 'error.main' }}>
              Admin
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {message && (
          <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
              Change Password (leave blank to keep current password)
            </Typography>

            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              margin="normal"
            />

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Profile Picture
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              {formData.avatarFile && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Selected: {formData.avatarFile.name}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    fullName: userData?.fullName || '',
                    email: userData?.email || '',
                    password: '',
                    confirmPassword: '',
                    avatarFile: null,
                  });
                  setMessage('');
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary">
                Email Address
              </Typography>
              <Typography variant="body1">{userData?.email}</Typography>
            </Box>
            
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary">
                Full Name
              </Typography>
              <Typography variant="body1">{userData?.fullName}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};