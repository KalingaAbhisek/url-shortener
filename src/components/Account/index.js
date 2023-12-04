import React, {useState, Fragment, useEffect, useMemo, useCallback} from 'react'
import { Grid, Box, Typography, Button, Divider, Snackbar, CircularProgress } from '@mui/material'
import Navbar from './Navbar'
import LinkCard from './LinkCard'
import ShortenURLModal from './ShortenURLModal'
import { app, firestore, auth } from '../../firebase'
import { nanoid } from 'nanoid'
import copy from 'copy-to-clipboard'

const Account = () => {
  const [fetchingLinks, setFetchingLinks] = useState(true)
  const[newLinkToaster, setNewLinkToaster] = useState(false);
  const [openModal, setOpenModal] =useState(false)
  const [links, setLinks] = useState([])
  const userId=auth.currentUser.uid;
  const linksPathRef = useMemo(
    () => firestore.collection("users").doc(userId).collection("links"),
    [userId]
  );

  const handleCreateShortenLink= async(name,longUrl, customUrl) => {
    const link={
      name, longUrl: longUrl.includes("http://") || longUrl.includes("https://")
      ? longUrl
      : `http://${longUrl}`, 
      createdAt: app.firestore.FieldValue.serverTimestamp(),
      shortCode: (customUrl.length>0) ? customUrl : nanoid(6),
      totalClicks: 0
    }

    const resp = await linksPathRef.add(link);
    setLinks(links=>[...links,{...link, createdAt: new Date(), id: resp.id}])
    setOpenModal(false);
  }

  useEffect(() => {
    const fetchLinks = async ()=>{
      const snapshot=await linksPathRef.get()
      const tempLinks = [];
      snapshot.forEach((doc)=>tempLinks.push({...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate()}))
      setLinks(tempLinks);
      setTimeout(()=>setFetchingLinks(false),1000);
    }

    fetchLinks();
  },[linksPathRef])
  
  const handleDeleteLink = useCallback(async linkDocId =>{
    if(window.confirm("Do you want to delete this link?")){
      await linksPathRef.doc(linkDocId).delete();
      setLinks(oldLinks => oldLinks.filter(link=>link.id !== linkDocId));
    }
  },[linksPathRef])

  const handleCopyLink = useCallback((shortUrl)=>{
    copy(shortUrl);
    setNewLinkToaster(true);
  },[]);

  return (<>
  <Snackbar open={newLinkToaster} onClose={()=>setNewLinkToaster(false)} autoHideDuration={3000} message="Link copied to the clipboard"/>
  {openModal && <ShortenURLModal createShortenLink={handleCreateShortenLink} handleClose={() => setOpenModal(false)}/>}
  <Navbar/>
  <Box mt={{xs: 3,sm: 5}} p={{xs:2, sm: 0}}>
  <Grid container justifyContent="center">
    <Grid item xs={12} sm={8}>
      <Box mb={5} display='flex'>
        <Box mr={3}>
          <Typography variant="h4">Links</Typography>
        </Box>
        <Button onClick={() => setOpenModal(true)} disableElevation variant="contained" color="primary">Create New</Button>
      </Box>
      {fetchingLinks ? (<Box textAlign='center'><CircularProgress/></Box>):(links.length===0)?<Box textAlign='center'><img style={{width: '225px', height: 'auto', marginBottom: '24px'}} src='/assets/no_links.svg' alt='no links'/><Typography>
        You have no links</Typography></Box>:links.sort((prevLink, nextLink)=>nextLink.createdAt-prevLink.createdAt).map((link,idx) =>
      <Fragment key={link.id}>
        <LinkCard {...link} deleteLink ={handleDeleteLink} copyLink={handleCopyLink}/>
        {idx !==links.length-1 && (<Box my={4}><Divider/></Box>)}
      </Fragment>)}
    </Grid>
  </Grid>
  </Box>
  <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            mb: 2,
            position: 'fixed',
            bottom: 8,
            width: '100%'
          }} textAlign='center'>
            <Typography>Made with ❤️ by <a href="http://kalin.ga/links">Kalinga Abhisek</a></Typography>
            <Typography variant="caption" color="initial">
            Copyright ©{new Date().getFullYear()}. All Rights Reserved.
          </Typography>
        </Box>
  </>
  )
}

export default Account
