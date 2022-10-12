import styles from './page.module.css'

import {useEffect, useState} from 'react';
import {io} from 'socket.io-client'

import {useParams} from 'react-router-dom'

function Page(){

    const [socket,setSocket] = useState();
    const [input,setInput] = useState();
    const [userDoc,setUserDoc] = useState();
    const {id: documentId} = useParams();

    useEffect(()=>{
        setUserDoc(document.getElementById('inputTextArea'))
    })

    useEffect(()=>{
        //handles -> create and remove socket connection
        let serverUrl = "http://localhost:3001";
        // let serverUrl = "https://dashboard.heroku.com/apps/collab-live-server";
        const s = io(serverUrl);
        setSocket(s);
        return () => {
            //clear everything up, which was set in useEffect.
            s.disconnect()
        }
    },[])

    useEffect(()=>{
        //handles -> emiting data to server when own's document changes
        console.log("useEffect executed due to change event")
        if(socket==null || input==null) return
        socket.emit("send-changes",input)
    },[socket,input])

    useEffect(()=>{
        //handles -> receiving data from server when peer's document changes
        if(socket==null) return
        console.log("useEffect executed due to receive event")
        socket.on("receive-changes",handleUpdate)
    },[socket])

    useEffect(()=>{
        if(socket==null) return
        // socket.once("load-document",document=>{
        //     setInput(document);
        // });
        socket.emit('get-document',documentId);

    },[socket,input,documentId])
    
    function handleUpdate(ip){
        if(socket==null) return;
        console.log("handle update "+ip);
        setInput(ip,console.log("document updated "+ip));
        if(userDoc==null) return
        userDoc.value = ip; 
    }

    function handleChange(e){
        const ip = e.target.value;
        console.log("handle change "+ip);
        setInput(ip,console.log("state changed to "+ip));
        if(userDoc==null) return
        userDoc.value = ip; 
    }

    function debounce(fn,d=3000){
        let timer;
        return (...args)=>{     
            clearTimeout(timer) 
            timer = setTimeout(()=>{
                fn.apply(this,args)
            },d)
        }
    }

    return (
        <div className={styles.page}>
            <textarea id='inputTextArea' name='textarea' className={styles.textarea} onChange={debounce(handleChange)}>{input}</textarea>
        </div>
    )

}

export default Page;