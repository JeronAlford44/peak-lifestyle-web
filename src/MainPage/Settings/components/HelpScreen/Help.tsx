import { useState } from 'react'
import { app } from '../../../../firebaseConfig'
import { auth } from '../../../../firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc } from 'firebase/firestore'
import { Button, TextField, makeStyles } from '@material-ui/core'
import { findAllByDisplayValue } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'

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

      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: '10vh',
    },
  }),
  { name: 'HelpForms' }
)

export default function HelpScreen() {
  const classes = useStyles()

  const navigate = useNavigate()
  const [msgSubject, setMsgSubject] = useState<String>('')
  const [msgBody, setMsgBody] = useState<String>('')
  const [submitted, setSubmitted] = useState(false)
  const db = getFirestore(app)

  const handleFormSubmit = async () => {
 
    const statusUpdate = (new Date().valueOf()).toString()
    if (msgBody.length > 0 && msgSubject.length > 0) {
     
      const formData = {
        from: auth.currentUser.email,
        subject: msgSubject,
        body: msgBody,
      }
      await setDoc(doc(db, 'HelpForms', statusUpdate), formData)
       
        .catch(error => alert(error))
      setSubmitted(true)
    } else {
      alert('Error: One or more text fields empty')
    }
  }

  const HelpForm = (
    <div>
      <TextField
        id="filled-read-only-input"
        multiline
        label=""
        defaultValue="Please describe the problem you are having or any suggestions on what we could do better"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
        style={{
          display: 'flex',

          alignSelf: 'center',
          justifySelf: 'center',
          width: '70vw',
        }}
      />

      <div className={classes.formContainer}>
        <form
          style={{
            marginBottom: '5vh',
          }}
        >
          <div
            style={{
              display: 'flex',
              // borderColor: 'black',
              // borderWidth: '2px',
              // borderStyle: 'solid',
              flexDirection: 'column',
              borderRadius: '16px',
            }}
          >
            <TextField
              id="filled-textarea"
              label="Subject"
              // multiline
              variant="standard"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '60vw',
                maxHeight: '40vh',
                position: 'relative',
                marginBottom: '2vh',
              }}
              placeholder="Subject"
              onChange={e => {
                setMsgSubject(e.target.value)
              }}
            />

            <TextField
              id="filled-textarea"
              label="Additional Details"
              multiline
              variant="filled"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '70vw',
                maxHeight: '40vh',
                position: 'relative',
                marginBottom: '5px',
              }}
              placeholder="Describe Problem Here"
              onChange={e => {
                setMsgBody(e.target.value)
              }}
            />
          </div>
        </form>
        <Button variant="contained" style={{ alignSelf: 'center' }} onClick={handleFormSubmit}>
          Submit Form
        </Button>
      </div>
    </div>
  )

  const submissionForm = (
    <div>
      <div style={{position: 'relative', display: 'flex',marginBottom: '10vh', alignSelf: 'center', justifySelf: 'center', marginTop: '5vh'}}>SUBMISSION SUCCESSFUL</div>
      <div style={{ color: 'black', marginBottom: '10vh' }}>
        Thank you for contacting us, we will reply to your email as soon as possible.
      </div>
      <Button variant='contained' onClick={() => setSubmitted(false)}>Submit New Form</Button>
      
    </div>
  )
  return <div>{!submitted ? HelpForm : submissionForm}</div>
}
