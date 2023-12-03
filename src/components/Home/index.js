import React, {useState} from 'react'
import { Typography, TextField, Button, Box, Grid, Hidden } from '@mui/material'
import AuthModal from './AuthModal'

const Home = () => {

  return (
    <Box p={3} display='flex' flexDirection='column' boxSizing='border-box' height="100vh" bgcolor="#56B7BA" color="#fff">
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant="h4">kalin.ga | URL Shortener</Typography>
        <Button color='inherit'>Login/Signup</Button>
      </Box>

      <AuthModal/>

      <Box display='flex' flexGrow={1} alignItems='center'>
        <Grid container alignItems='center'>
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Short URLs, Make every connection count</Typography>
              <Box my={2}>
                <Typography>Powerful link shortener to help your brand grow.</Typography>
                <Button variant='contained' disableElevation 
                size='large' style={{color: '#56B7BA'}}>Get Started</Button>
              </Box>
            </Box>
          </Grid>
          <Hidden only='xs'>
            <Grid item sm={6}>
              <img style={{width: '100%', borderRadius: '10px', boxShadow: '0px 10px 25px rgba(0,0,0,0.1)'}} src='./assets/mockup.png' alt='mockup' />
            </Grid>
          </Hidden>
        </Grid>
      </Box>

    </Box>
  )
}

export default Home