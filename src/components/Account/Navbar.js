import React from 'react'
import { Typography, AppBar, Toolbar, Button, Box } from '@mui/material'

const Navbar = () => {
  return (
    <AppBar elevation={0} position='static' color='secondary'>
    <Toolbar>
        <Typography variant="h6">kalin.ga</Typography>
        <Box ml="auto">
          <Button variant="text" color="inherit">Links</Button>
          <Button variant="text" color="inherit">Logout</Button>
        </Box>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar
