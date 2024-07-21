import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Tooltip title='Delete'>
      <IconButton color='error' onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
