import { Button } from '@mui/material';
import React from 'react';

const OutlinedButton = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`
      normal_btn
            inline-flex items-center px-4 py-2 border text-db border-db rounded-md 
            shadow-sm text-base font-medium bg-transparent
             hover:bg-db hover:text-white
             transition-all
                      
            `}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
