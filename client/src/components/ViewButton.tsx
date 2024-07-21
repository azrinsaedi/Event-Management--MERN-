import React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';

const ViewButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Tooltip title='View'>
      <IconButton color='primary' onClick={onClick}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ViewButton;
