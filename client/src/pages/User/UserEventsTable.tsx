import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/Title';
import ViewButton from '../../components/ViewButton';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface EventsTableProps {
  data: any;
}

const UserEventsTable: React.FC<EventsTableProps> = ({ data }) => {
  const navigate = useNavigate();
  const handleView = (id: string) => {
    navigate(`/user/dashboard/event/${id}`);
  };
  return (
    <React.Fragment>
      <Title>Recent Events</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align='right'>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.event.map((row: any) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>
                {row.start_date &&
                  dayjs(row.start_date).format('DD MMMM YYYY hh:mm a')}
              </TableCell>
              <TableCell>
                {row.start_date &&
                  dayjs(row.end_date).format('DD MMMM YYYY hh:mm a')}
              </TableCell>
              <TableCell> {row.status}</TableCell>
              <TableCell align='right'>
                <ViewButton onClick={() => handleView(row._id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default UserEventsTable;
