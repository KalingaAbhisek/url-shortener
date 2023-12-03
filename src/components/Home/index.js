import React, {useState} from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { auth } from '../../firebase'

const Home = () => {
  const [form, setForm]=useState({
    email: '',
    password: '',
  })

  const handleChange = event => setForm(oldForm=>({
    ...oldForm,
    [event.target.name]: event.target.value
  }))

  const handleSignup= async()=>{
    await auth.createUserWithEmailAndPassword(form.email, form.password);
  }

  const handleSignin= async()=>{
    await auth.signInWithEmailAndPassword(form.email, form.password);
  }

  return (
    <>
      <Typography>Home</Typography>
      <TextField value={form.email} name="email" onChange={handleChange} label="Email"/>
      <TextField type="password" value={form.password} name="password" onChange={handleChange} label="Password"/>
      <Button onClick={handleSignup}>SignUp</Button>
      <Button onClick={handleSignin}>SignIn</Button>
    </>
  )
}

export default Home