import { useState,useEffect } from "react";
import { createContext } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener,signOutUser } from "../../util/firebase/firebaseutil";
export const UserContest=createContext({
    currentUser:null,
    setCurrentUser:()=>{}
})
export const UserProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null)
    const value={currentUser,setCurrentUser}

    useEffect(()=>{
        const unsubscribe=onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocFromAuth(user)
            }
            setCurrentUser(user)
        })
        return unsubscribe
    },[])
    return <UserContest.Provider value={value}>{children}</UserContest.Provider>
}