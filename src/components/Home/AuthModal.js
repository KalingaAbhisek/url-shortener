import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box, IconButton, CircularProgress} from '@mui/material'
import { auth } from '../../firebase'
import {Close as CloseIcon} from '@mui/icons-material'

const AuthModal = ({onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);
    const [form, setForm]=useState({
        email: '',
        password: '',
      })
    
      const handleChange = event => setForm(oldForm=>({
        ...oldForm,
        [event.target.name]: event.target.value
      }))

      const handleAuth = async () => {
        setLoading(true);
        try{
            if(isSignIn) {
                await auth.signInWithEmailAndPassword(form.email, form.password);
            }
            else{
                await auth.createUserWithEmailAndPassword(form.email, form.password);
            }
        }
        catch(err){
            setError(err.message);
            setLoading(false)
        } 
    }

  return (
    <Dialog open fullWidth>
        <DialogTitle>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                {isSignIn? 'Sign In' : 'Sign Up'}
                <IconButton onClick={()=>onClose()} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Typography>Home</Typography>
    <TextField variant='filled' style={{marginBottom: '24px'}} fullWidth value={form.email} name="email" onChange={handleChange} label="Email"/>
    <TextField variant='filled' fullWidth type="password" value={form.password} name="password" onChange={handleChange} label="Password"/>
    <Box mt={2} color='red'>
        <Typography>{error}</Typography>
    </Box>
        </DialogContent>
        <DialogActions>
            <Box width="100%" display='flex' justifyContent='space-between' alignItems='center' mb={1} mx={2}>
                <Typography onClick={()=> setIsSignIn(o=>!o)}>{isSignIn? "Don't have an account?": 'Already have an account'}</Typography>
                <Button disableElevation variant="contained" color='primary' onClick={handleAuth} disabled={loading}>{loading ? <CircularProgress size={22} color="inherit"/> : isSignIn? ('Sign In') : ('Sign Up')}</Button>
            </Box>
        </DialogActions>
    </Dialog>
  )
}

export default AuthModal