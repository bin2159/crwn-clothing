import {initializeApp} from 'firebase/app'
import {createUserWithEmailAndPassword, getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAjsSh9v1FJ50Kkg19kzDssq74ERuFwz00",
    authDomain: "crown-db-e7d7a.firebaseapp.com",
    projectId: "crown-db-e7d7a",
    storageBucket: "crown-db-e7d7a.appspot.com",
    messagingSenderId: "314819220857",
    appId: "1:314819220857:web:481f37de24212eae338ba8"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const provider=new GoogleAuthProvider();
    provider.setCustomParameters({
    prompt:"select_account"
  })
  export const auth=getAuth()
  export const signInWithGooglePopup=()=>signInWithPopup(auth,provider)
 
  const db=getFirestore()
  export const createUserDocFromAuth=async(userAuth,additionalInfo={})=>{
    const userDocRef=doc(db,'user',userAuth.uid)
    console.log(userDocRef)
    const userSnapshot=await getDoc(userDocRef)
    console.log(userSnapshot)
    if(!userSnapshot.exists()){
        const {displayName,email}=userAuth
        const createdAt=new Date()
        try
        {
            await setDoc(userDocRef,{
            displayName,
            email,
            createdAt,
            ...additionalInfo
        })
        }
        catch(error){
            console.log(error)
        }
    }
    return userSnapshot
}
export const createAuthUserWithEmailAndPassword=async(email,password)=>{
    if(!email || !password) return 
    return await createUserWithEmailAndPassword(auth,email,password)
}