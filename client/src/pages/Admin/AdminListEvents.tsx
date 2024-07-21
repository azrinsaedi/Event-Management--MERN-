import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import customFetch from '../../utils/customFetch';
import EventsTable from './EventsTable';

const AdminListEvents: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const { data } = await customFetch.get('/admin/event');
      setData(data);
    } catch (error) {
      setError('Error fetching data');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData(); // Refresh the data
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Toolbar />
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <EventsTable data={data} onDelete={refreshData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminListEvents;
