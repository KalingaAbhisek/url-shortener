import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Account from './components/Account'
import { ThemeProvider } from '@mui/material'
import createMuiTheme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={createMuiTheme}>
      <Router>
          <Routes>
            <Route path="/" element={<Home />}/> 
            <Route path="/account" element={<Account />}/> 
          </Routes>
      </Router>
    </ThemeProvider>
  )
}
export default App