import React, {useState, useEffect} from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Account from './components/Account'
import { ThemeProvider, CircularProgress, Box } from '@mui/material'
import createMuiTheme from './theme'
import { auth } from './firebase'
import LinkRedirect from './components/LinkRedirect'

const App = () => {
  const [user, setUser]=useState(null);
  const {pathname}=useLocation()
  const [initialLoad, setInitialLoad] = useState(pathname === '/' || pathname === '/account'? true: false)

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
          <Routes>
            <Route path="/" element={user? <Navigate to="/account" /> :<Home />}/> 
            <Route path="/account" element={user? <Account /> : <Navigate to="/" />}/>
            <Route path="/:shortCode" element={<LinkRedirect />}/> 
          </Routes>
    </ThemeProvider>
  )
}
export default App