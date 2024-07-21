import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Tooltip title='Edit'>
      <IconButton color='primary' onClick={onClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
