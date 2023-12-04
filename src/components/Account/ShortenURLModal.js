import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, TextField, IconButton, CircularProgress} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'
import { firestore } from '../../firebase';

const ShortenURLModal = ({handleClose, createShortenLink}) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name:"",
        longUrl:"",
        customUrl:""
    })
    const [form, setForm]=useState({
        name: '',
        longUrl: '',
        customUrl: '',
    })

    const handleChange = event => setForm(oldForm=>({
        ...oldForm,
        [event.target.name]: event.target.value
      }))
    
    const handleSubmit= async ()=>{
        const errors = {}
        const tName = form.name.trim();
        const tLongUrl = form.longUrl.trim();
        const tCustomUrl = form.customUrl.trim();
        const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi

        const regex = new RegExp(expression);

        if(tName.length <3 || tName.length > 20){
            errors.name="The name should be min 3 and max 20 characters long."
        }

        if(!regex.test(tLongUrl)){
            errors.longUrl = 'Invalid Long URL'
        }

        if(tCustomUrl.length>0){
            const linkDoc = await firestore.collection("links").doc(tCustomUrl).get();
            if(linkDoc.exists){
                errors.customUrl='Custom URL already exists. Try something else!!!'
            }
        }

        if(!!Object.keys(errors).length > 0){
            return setErrors(errors);
        }
        setLoading(true);
        try{
            setTimeout(() =>createShortenLink(tName, tLongUrl, tCustomUrl),1000)
        }
        catch(err){
            setLoading(false);
        }
        
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
                <TextField 
               error={!!errors.name} helperText={errors.name} value={form.name} name="name" onChange={handleChange} fullWidth variant="filled" label="Name"/>
            </Box>
            <Box mb={3}>
                <TextField error={!!errors.longUrl} helperText={errors.longUrl}
                value={form.longUrl} name="longUrl" onChange={handleChange} fullWidth variant="filled" label="Long URL"/>
            </Box>
            <TextField error={!!errors.customUrl} helperText={errors.customUrl} value={form.customUrl} name="customUrl" onChange={handleChange} fullWidth variant="filled" label="Custom URL (optional)"/>
        </DialogContent>
        <DialogActions>
            <Box mr={2} my={1}>
                <Button onClick={handleSubmit} color="primary" variant="contained" disableElevation disabled={loading}>{loading ? <CircularProgress size={22} color="inherit"/>: "Create"}</Button>
            </Box>
        </DialogActions>
    </Dialog>

  )
}

export default ShortenURLModal