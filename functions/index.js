/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp();
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.linkCreated = functions.firestore.document('users/{userId}/links/{linkId}').onCreate((snapshot, context)=>{
    const {userId, linkId} = context.params
    const {longUrl, shortCode} = snapshot.data();

    return admin.firestore().doc(`links/${shortCode}`).set({
        userId,
        linkId: linkId,
        longUrl
    })
});

exports.linkDeleted =  functions.firestore.document('users/{userId}/links/{linkId}').onDelete((snapshot, context) => {
    const {shortCode} = snapshot.data();

    return admin.firestore().doc(`links/${shortCode}`).delete();
})
