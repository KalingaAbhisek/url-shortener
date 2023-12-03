import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, TextField, IconButton} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'

const ShortenURLModal = ({handleClose, createShortenLink}) => {
    const [form, setForm]=useState({
        name: '',
        longUrl: '',
        customUrl: ''
    })

    const handleChange = event => setForm(oldForm=>({
        ...oldForm,
        [event.target.name]: event.target.value
      }))
    
    const handleSubmit=()=>{
        createShortenLink(form.name, form.longUrl, form.customUrl)
    }

  return (
    //onClose={handleClose}
    <Dialog fullWidth open={true}>
        <DialogTitle>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                Shorten URL
                <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box mb={3}>
                <TextField value={form.name} name="name" onChange={handleChange} fullWidth variant="filled" label="Name"/>
            </Box>
            <Box mb={3}>
                <TextField value={form.longUrl} name="longUrl" onChange={handleChange} fullWidth variant="filled" label="Long URL"/>
            </Box>
            <TextField value={form.customUrl} name="customUrl" onChange={handleChange} fullWidth variant="filled" label="Custom URL (optional)"/>
        </DialogContent>
        <DialogActions>
            <Box mr={2} my={1}>
                <Button onClick={handleSubmit} color="primary" variant="contained" disableElevation>Create</Button>
            </Box>
        </DialogActions>
    </Dialog>

  )
}

export default ShortenURLModal