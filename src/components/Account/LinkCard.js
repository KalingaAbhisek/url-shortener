import React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { BarChart as ChartIcon } from '@mui/icons-material'
import format from 'date-fns/format'

const LinkCard = ({id, createdAt, name, longUrl, shortCode, totalClicks}) => {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box>
            <Typography color="textSecondary" variant='overline'>
                Created at {format(createdAt,'dd MMM Y, HH:mm')}
            </Typography>
            <Box my={2}>
            <Typography variant="h5">{name}</Typography>
            <Typography>{longUrl}</Typography>
            </Box>
            <Box display='flex' alignItems='center'>
                <Box mr={3}>
                    <Typography color="primary">{window.location.host}/{shortCode}</Typography>
                </Box>
                <Button color="primary" size="small" variant="outlined">Copy</Button>
            </Box>
        </Box>
        <Box>
            <Box>
                <Box display='flex' justifyContent='center'>
                    <Typography>{totalClicks}</Typography>
                    <ChartIcon />
                </Box>
                <Typography variant='overline'>Total Clicks</Typography>
            </Box>
        </Box>
    </Box>

  )
}

export default LinkCard