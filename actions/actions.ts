'use server';

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { backIn } from "framer-motion";
import { Bath } from "lucide-react";


export async function createNewDocument(){

    const {sessionClaims} = await auth();

    if (!sessionClaims) {
        throw new Error("Unauthorized");
      }
      
      
    //create a new document

    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title:"New Doc"
    })

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId:sessionClaims?.email!,
        role:"owner",
        createdAt: new Date(),
        roomId:docRef.id,
    })

    return {docId:docRef.id}
}


export async function deleteDocument(roomId:string){
    const {sessionClaims} = await auth();

    if (!sessionClaims) {
        throw new Error("Unauthorized");};
    
    console.log("deleteDocument",roomId);
    
    try {
        //delete the document reference
        await adminDb.collection("documents").doc(roomId).delete();

        const query = await adminDb
        .collectionGroup("rooms")
        .where("roomId","==",roomId)
        .get();


        //delete the room reference in the user's collection for every user in the room
        const batch = adminDb.batch();

        query.docs.forEach((doc) =>{
            batch.delete(doc.ref);
        });

        await batch.commit();

        //delete room in liveblocks
        await liveblocks.deleteRoom(roomId);

        return {success:true};
    

        
    } catch (error) {
        console.error(error);
        return {success:false};
        
    }

}


export async function inviteUserToDocument(roomId:string, email:string){
    const {sessionClaims} = await auth();

    if (!sessionClaims) {
        throw new Error("Unauthorized");};
    
    console.log("inviteUserToDocument",roomId,email);
    try {
        await adminDb
        .collection("users")
        .doc(email)
        .collection("rooms")
        .doc(roomId)
        .set({
            userId:email,
            role:"editor",
            createdAt:new Date(),
            roomId,
        });

        return {success:true}
        
    } catch (error) {
        console.error(error);
        return {success:false};
        
    }

}