import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyB05A1KNtFTfghH05iTJMYmY1hEAgvqDdU",
    authDomain: "hcde-438.firebaseapp.com",
    databaseURL: "https://hcde-438.firebaseio.com",
    projectId: "hcde-438",
    storageBucket: "hcde-438.appspot.com",
    messagingSenderId: "108378934604",
    appId: "1:108378934604:web:afc381dc5ab21938d913e9",
    measurementId: "G-0DG8K2K46S"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()