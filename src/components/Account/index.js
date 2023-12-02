import React, {useState, Fragment} from 'react'
import { Grid, Box, Typography, Button, Divider } from '@mui/material'
import { Navbar } from './Navbar'
import LinkCard from './LinkCard'

const dummyData = [
  {
    id: '3453',
    createdAt: new Date(),
    name: "My website",
    longUrl: "https://google.com",
    shortCode: 'xyzs',
    totalClicks: 12
  },
  {
    id: '3453',
    createdAt: new Date(),
    name: "My website",
    longUrl: "https://google.com",
    shortCode: 'xyzs',
    totalClicks: 12
  }
]

const Account = () => {
  const [links, setLinks] = useState(dummyData)
  return (<>
  <Navbar/>
  <Box mt={5}>
  <Grid container justifyContent="center">
    <Grid item xs={8}>
      <Box mb={5} display='flex'>
        <Box mr={3}>
          <Typography variant="h4">Links</Typography>
        </Box>
        <Button disableElevation variant="contained" color="primary">Create New</Button>
      </Box>
      {links.map((link,idx) =>
      <Fragment key={link.id}>
        <LinkCard {...link}/>
        {idx !==links.length-1 && (<Box my={4}><Divider/></Box>)}
      </Fragment>)}
    </Grid>
  </Grid>
  </Box>
  </>
  )
}

export default Account
