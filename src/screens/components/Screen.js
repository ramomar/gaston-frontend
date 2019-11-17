import React from 'react';
import { Box } from 'grommet';

function Screen({ children }) {
  return (
    <Box
      fill='vertical'
      pad={{ horizontal: 'small' }}>
      {children}
    </Box>
  );
}

export default Screen;
