import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { app, firestore } from '../../firebase'
import {CircularProgress, Box, Typography} from '@mui/material'

const LinkRedirect = () => {
    const {shortCode} = useParams()
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchLinkDoc = async ()=>{
            const linkDoc = await firestore.collection("links").doc(shortCode).get();
            if(linkDoc.exists) {
                const {longUrl, linkId, userId} = linkDoc.data();
                await firestore.collection("users").doc(userId).collection("links").doc(linkId).update({totalClicks: app.firestore.FieldValue.increment(1)})
                window.location.href = longUrl
            }
            else{
                setLoading(false)
            }
        }
        fetchLinkDoc()
    },[])

    if(loading) {
        return(
            <Box mt={10} textAlign='center'>
                <CircularProgress/>
                <Typography>Redirecting to the link</Typography>
            </Box>
        )
    }
    else{
        return(
            <Box mt={10} textAlign='center'>
                <Typography>Link is invalid</Typography>
            </Box>
        )
    }
}

export default LinkRedirect