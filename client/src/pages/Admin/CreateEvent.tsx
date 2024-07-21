import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import customFetch from '../../utils/customFetch';

const Input = styled('input')({
  display: 'none',
});

const CreateEvent: React.FC = () => {
  const [file1, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (file1) {
      data.append('image', file1);
    }
    try {
      await customFetch.post('/admin/event', data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Event Name'
            name='name'
            type='text'
            autoComplete='name'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='location'
            label='Location'
            type='text'
            id='location'
            autoComplete='location'
          />
          <label htmlFor='image-upload'>
            <Input
              accept='image/*'
              id='image-upload'
              type='file'
              onChange={handleFileChange}
            />
            <Button
              variant='contained'
              component='span'
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Image
            </Button>
          </label>
          {preview && (
            <Box mt={2} textAlign='center'>
              <Typography variant='h6'>Image Preview:</Typography>
              <img
                src={preview}
                alt='Image Preview'
                style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
              />
            </Box>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Create Event
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CreateEvent;
