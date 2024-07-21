import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import customFetch from '../../utils/customFetch';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEvent() {
  const [eventData, setEventData] = useState<{
    name: string;
    location: string;
    status: string;
  }>({
    name: '',
    location: '',
    status: 'Ongoing',
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await customFetch.get(`/admin/event/${id}`);

        setEventData({
          name: data.event?.name,
          location: data.event?.location,
          status: data.event.status || 'Ongoing',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      status: (form.elements.namedItem('status') as HTMLInputElement).value,
    };

    try {
      await customFetch.patch(`/admin/event/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            value={eventData.name}
            onChange={(e) =>
              setEventData({ ...eventData, name: e.target.value })
            }
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
            value={eventData.location}
            onChange={(e) =>
              setEventData({ ...eventData, location: e.target.value })
            }
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel id='status-label'>Status</InputLabel>
            <Select
              labelId='status-label'
              id='status'
              name='status'
              value={eventData.status}
              onChange={(e) =>
                setEventData({ ...eventData, status: e.target.value })
              }
              required
            >
              <MenuItem value='Ongoing'>Ongoing</MenuItem>
              <MenuItem value='Completed'>Completed</MenuItem>
            </Select>
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Update Event
          </Button>
        </Box>
      </Container>
    </>
  );
}
