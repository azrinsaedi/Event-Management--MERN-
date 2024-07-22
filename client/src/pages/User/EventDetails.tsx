import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, styled, Button } from '@mui/material';
import customFetch from '../../utils/customFetch';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';

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
    start_date: string;
    end_date: string;
    status: string;
    image: string;
  }>({
    name: '',
    location: '',
    start_date: '',
    end_date: '',
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
          start_date: data.event?.start_date || 'No Start Date',
          end_date: data.event?.end_date || 'No End Date',
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
        <Typography variant='body1' color='text.primary' paragraph>
          Start Date:
          {dayjs(eventData.start_date).format('DD MMMM YYYY hh:mm a')}
        </Typography>
        <Typography variant='body1' color='text.primary' paragraph>
          End Date: {dayjs(eventData.end_date).format('DD MMMM YYYY hh:mm a')}
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
