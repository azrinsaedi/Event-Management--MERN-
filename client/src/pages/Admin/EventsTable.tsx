import React from 'react';
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
import customFetch from '../../utils/customFetch';
import Title from '../../components/Title';
import DeleteButton from '../../components/DeleteButton';
import EditButton from '../../components/EditButton';
import { styled } from '@mui/material/styles';

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
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/admin/dashboard/events/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await customFetch.delete(`/admin/event/${deleteId}`);
        setDeleteId(null);
        setOpen(false);
        onDelete(); 
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
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
          Are you sure you want to delete this event?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EventsTable;
