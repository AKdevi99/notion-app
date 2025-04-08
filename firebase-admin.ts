// import {
//     initializeApp,
//     getApps,
//     getApp,
//     cert,
//     App,
//   } from "firebase-admin/app";
  
//   import { getFirestore } from "firebase-admin/firestore";
  

// const servicekey = require("@/service_key.json");

// let app:App;

// if(getApps().length === 0 ){
//     app = initializeApp({
//         credential:cert(servicekey),
//     });
// }else {
//     app = getApp();
// }


// const adminDb = getFirestore(app);


// export { app as adminApp, adminDb };



import admin from "firebase-admin";
const serviceKey = require("@/service_key.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceKey),
  });
}

const adminApp = admin.app(); // Optional: get the initialized app
const adminDb = admin.firestore();

export { adminApp, adminDb };
