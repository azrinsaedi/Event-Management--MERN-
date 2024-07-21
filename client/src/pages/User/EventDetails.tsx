import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, styled, Button } from '@mui/material';
import customFetch from '../../utils/customFetch';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledImage = styled('img')({
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const EventDetails: React.FC = () => {
  const [eventData, setEventData] = useState<{
    name: string;
    location: string;
    status: string;
    image: string;
  }>({
    name: '',
    location: '',
    status: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await customFetch.get(`/user/event/${id}`);

        setEventData({
          name: data.event?.name || 'No Name',
          location: data.event?.location || 'No Location',
          status: data.event?.status || 'No Status',
          image: data.event?.image || 'No Image',
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Typography variant='h6' align='center'>
        Loading...
      </Typography>
    );
  }

  return (
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 2,
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          {eventData.name}
        </Typography>

        <StyledImage src={eventData.image} alt={eventData.name} />

        <Typography variant='h6' color='text.secondary' gutterBottom>
          Location: {eventData.location}
        </Typography>
        <Typography variant='body1' color='text.primary' paragraph>
          Status: {eventData.status}
        </Typography>
        <Button
          variant='outlined'
          color='error'
          onClick={() => navigate(-1)} // Go back to the previous page
          sx={{ mb: 2 }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default EventDetails;
