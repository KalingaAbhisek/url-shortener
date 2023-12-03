import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box} from '@mui/material'
import { auth } from '../../firebase'

const AuthModal = () => {
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
        if(isSignIn) {
            await auth.signInWithEmailAndPassword(form.email, form.password);
        }
        else{
            await auth.createUserWithEmailAndPassword(form.email, form.password);
            } 
        }

  return (
    <Dialog open fullWidth>
        <DialogTitle>{isSignIn? 'Sign In' : 'Sign Up'}</DialogTitle>
        <DialogContent>
            <Typography>Home</Typography>
    <TextField variant='filled' style={{marginBottom: '24px'}} fullWidth value={form.email} name="email" onChange={handleChange} label="Email"/>
    <TextField variant='filled' fullWidth type="password" value={form.password} name="password" onChange={handleChange} label="Password"/>
        </DialogContent>
        <DialogActions>
            <Box width="100%" display='flex' justifyContent='space-between' alignItems='center' mb={1} mx={2}>
                <Typography onClick={()=> setIsSignIn(o=>!o)}>{isSignIn? "Don't have an account?": 'Already have an account'}</Typography>
                <Button disableElevation variant="contained" color='primary' onClick={handleAuth}>{isSignIn? 'Sign In' : 'Sign Up'}</Button>
            </Box>
        </DialogActions>
    </Dialog>
  )
}

export default AuthModal