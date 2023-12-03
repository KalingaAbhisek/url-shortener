import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Account from './components/Account'
import { ThemeProvider, CircularProgress, Box } from '@mui/material'
import createMuiTheme from './theme'
import { auth } from './firebase'

const App = () => {
  const [user, setUser]=useState(null);
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
      setInitialLoad(false)
    })
  },[])

  if(initialLoad) return(
    <Box mt={5} display='flex' justifyContent='center'>
      <CircularProgress />
    </Box>
  )
  
  return (
    <ThemeProvider theme={createMuiTheme}>
      <Router>
          <Routes>
            <Route path="/" element={user? <Navigate to="/account" /> :<Home />}/> 
            <Route path="/account" element={user? <Account /> : <Navigate to="/" />}/> 
          </Routes>
      </Router>
    </ThemeProvider>
  )
}
export default App