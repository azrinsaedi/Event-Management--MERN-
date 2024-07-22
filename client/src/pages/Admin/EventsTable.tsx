import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import customFetch from '../../utils/customFetch';
import Title from '../../components/Title';
import DeleteButton from '../../components/DeleteButton';
import EditButton from '../../components/EditButton';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';

interface EventsTableProps {
  data: any;
  onDelete: () => void;
}

const StyledImage = styled('img')({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
});

const EventsTable: React.FC<EventsTableProps> = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEdit = (id: string) => {
    navigate(`/admin/dashboard/events/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        const response = await customFetch.post(
          `/admin/event/${deleteId}/verify-password`,
          { password }
        );

        if (response.status === 200) {
          await customFetch.delete(`/admin/event/${deleteId}`);
          setDeleteId(null);
          setOpen(false);
          setPassword('');
          setError('');
          onDelete();
        } else {
          setError('Incorrect password. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('An error occurred while deleting. Please try again.');
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPassword('');
    setError('');
  };

  return (
    <React.Fragment>
      <Title>Recent Events</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell align='right'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.event.map((row: any) => (
            <TableRow key={row._id}>
              <TableCell>
                <StyledImage src={row.image} alt={row.name} />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>
                {row.start_date &&
                  dayjs(row.start_date).format('DD MMMM YYYY hh:mm a')}
              </TableCell>
              <TableCell>
                {row.start_date &&
                  dayjs(row?.end_date).format('DD MMMM YYYY hh:mm a')}
              </TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <EditButton onClick={() => handleEdit(row._id)} />
              </TableCell>
              <TableCell align='right'>
                <DeleteButton onClick={() => handleDelete(row._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event?</Typography>
          <TextField
            margin='dense'
            label='Password'
            type='password'
            fullWidth
            variant='outlined'
            value={password}
            onChange={handlePasswordChange}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EventsTable;
