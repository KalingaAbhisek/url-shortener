import React, {useState, Fragment, useEffect} from 'react'
import { Grid, Box, Typography, Button, Divider } from '@mui/material'
import Navbar from './Navbar'
import LinkCard from './LinkCard'
import ShortenURLModal from './ShortenURLModal'
import { app, firestore, auth } from '../../firebase'
import { nanoid } from 'nanoid'

// const dummyData = [
//   {
//     id: '3453',
//     createdAt: new Date(),
//     name: "My website",
//     longUrl: "https://google.com",
//     shortCode: 'xyzs',
//     totalClicks: 12
//   },
//   {
//     id: '3453',
//     createdAt: new Date(),
//     name: "My website",
//     longUrl: "https://google.com",
//     shortCode: 'xyzs',
//     totalClicks: 12
//   }
// ]

const Account = () => {
  const [openModal, setOpenModal] =useState(false)
  const [links, setLinks] = useState([])
  const userId=auth.currentUser.uid;
  // const linksPathRef = useMemo(
  //   () => firestore.collection("users").doc(userId).collection("links"),
  //   [userId]
  // );

  const handleCreateShortenLink= async(name,longUrl, customUrl) => {
    const link={
      name, longUrl: longUrl.includes("http://") || longUrl.includes("https://")
      ? longUrl
      : `http://${longUrl}`, 
      createdAt: app.firestore.FieldValue.serverTimestamp(),
      shortCode: (customUrl!=='') ? customUrl : nanoid(6),
      totalClicks: 0
    }

    const resp = await firestore.collection("users").doc(userId).collection("links").add(link);
    setLinks(links=>[...links,{...link, createdAt: new Date(), id: resp.id}])
    setOpenModal(false);
  }

  useEffect(() => {
    const fetchLinks = async ()=>{
      const snapshot=await firestore.collection("users").doc(userId).collection("links").get()
      const tempLinks = [];
      snapshot.forEach((doc)=>tempLinks.push({...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate()}))
      setLinks(tempLinks);
    }

    fetchLinks();
  },[])
  return (<>
  {openModal && <ShortenURLModal createShortenLink={handleCreateShortenLink} handleClose={() => setOpenModal(false)}/>}
  <Navbar/>
  <Box mt={5}>
  <Grid container justifyContent="center">
    <Grid item xs={8}>
      <Box mb={5} display='flex'>
        <Box mr={3}>
          <Typography variant="h4">Links</Typography>
        </Box>
        <Button onClick={() => setOpenModal(true)} disableElevation variant="contained" color="primary">Create New</Button>
      </Box>
      {links.sort((prevLink, nextLink)=>nextLink.createdAt-prevLink.createdAt).map((link,idx) =>
      <Fragment key={link.id}>
        <LinkCard {...link}/>
        {idx !==links.length-1 && (<Box my={4}><Divider/></Box>)}
      </Fragment>)}
    </Grid>
  </Grid>
  </Box>
  </>
  )
}

export default Account
