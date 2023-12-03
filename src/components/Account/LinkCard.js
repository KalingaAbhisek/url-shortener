import React from 'react'
import { Typography, Button, Box, Hidden } from '@mui/material'
import { BarChart as ChartIcon } from '@mui/icons-material'
import format from 'date-fns/format'

const LinkCard = ({id, createdAt, name, longUrl, shortCode, totalClicks}) => {
    const shortUrl = `${window.location.host}/${shortCode}`;
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
            <Typography color="textSecondary" variant='overline'>
                Created at {format(createdAt,'dd MMM Y, HH:mm')}
            </Typography>
            <Box my={2}>
            <Typography style={{ marginBottom: "5px" }} variant="h5">{name}</Typography>
            <Typography>{longUrl}</Typography>
            </Box>
            <Box display='flex' alignItems='center'>
                <Box mr={3}>
                    <Typography color="primary">{shortUrl}</Typography>
                </Box>
                <Box mx={2}>
                    <Button color="primary" size="small" variant="outlined">Copy</Button>
                </Box>
                <Button color="error" size="small" variant="outlined" disableElevation>Delete</Button>
            </Box>
        </Box>
        <Box>
            <Box display='flex' justifyContent='center'>
                    <Typography>{totalClicks}</Typography>
                    <ChartIcon />
                </Box>
                <Hidden only="xs">
                    <Typography variant='overline'>Total Clicks</Typography>
                </Hidden>
             </Box>
        </Box>

  )
}

export default LinkCard