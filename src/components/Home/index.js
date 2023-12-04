import React, {useState} from 'react'
import { Typography, TextField, Button, Box, Grid, Hidden } from '@mui/material'
import AuthModal from './AuthModal'

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false)
  return (
    <Box p={3} display='flex' flexDirection='column' boxSizing='border-box' height="100vh" bgcolor="#56B7BA" color="#fff">
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography variant="h4">kalin.ga | URL Shortener</Typography>
        <Button onClick={()=>setOpenAuthModal(true)} variant='outlined' color='inherit'  disableElevation>Login/Signup</Button>
      </Box>

      {openAuthModal  && <AuthModal onClose={()=>setOpenAuthModal(false)}/>}

      <Box display='flex' flexGrow={1} alignItems='center'>
        <Grid container alignItems='center'>
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Short URLs, Make every connection count</Typography>
              <Box my={2}>
                <Typography>Powerful link shortener to help your brand grow.</Typography>
                </Box>
                <Button variant='contained' disableElevation color='inherit'
                size='large' style={{color: '#56B7BA'}} onClick={()=>setOpenAuthModal(true)}>Get Started</Button>
            </Box>
          </Grid>
          <Hidden only='xs'>
            <Grid item sm={6}>
              <img style={{width: '100%', borderRadius: '10px', boxShadow: '0px 10px 25px rgba(0,0,0,0.1)'}} src='./assets/mockup.png' alt='mockup' />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
      <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            mb: 2,
            position: 'fixed',
            bottom: 2,
            width: '100%'
          }} textAlign='center'>
            <Box><img src="https://counter7.optistats.ovh/private/freecounterstat.php?c=krdm2u725hd75qcz1bupugg6u13258h3"  /></Box>
            <Typography>Made with ❤️ by <a href="http://kalin.ga/links">Kalinga Abhisek</a></Typography>
          <Typography variant="caption" color="initial">
            Copyright ©{new Date().getFullYear()}. All Rights Reserved.
          </Typography>
        </Box>
    </Box>
  )
}

export default Home