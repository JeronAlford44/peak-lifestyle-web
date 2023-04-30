import { useState } from "react"
import { app } from '../../../firebaseConfig'
import { auth } from '../../../firebaseConfig'
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(
    theme => ({
      root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        margin: theme.spacing(3),
        backgroundColor: '#680747',
        zIndex: 1,
        width: '95vw',
        height: '90vh',
      },
  
      formContainer: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }
    }),
    { name: 'HelpForms' }
  )

export default function HelpScreen(){

const classes = useStyles()

    const [msgSubject, setMsgSubject] = useState<String>('')
    const [msgBody, setMsgBody] = useState<String>('')
    const db = getFirestore(app)


    const handleFormSubmit = async() => {
        const statusUpdate = "time " + new Date(Date.now()).toLocaleTimeString().replaceAll(':', '-');
        const formData = {
from: auth.currentUser.email,
subject: msgSubject,
body: msgBody
        }
        await setDoc(doc(db, "HelpForms", statusUpdate), formData).then(()=>console.log('passed'));
    }
    return (
    
    
    
    <div>

<div style={{color:'black'}}>Please describe the problem you are having or any suggestions on what we could do better</div>
<form className={classes.formContainer}>
<input placeholder="Subject"
onChange={e => {
setMsgSubject(e.target.value)
}}

/>
<textarea placeholder="Describe Problem Here"
onChange={e => {
    setMsgBody(e.target.value)
}}

/>


</form>
<button onClick={handleFormSubmit}


    


>Submit form</button>


    </div>
    
    
    
    )
}