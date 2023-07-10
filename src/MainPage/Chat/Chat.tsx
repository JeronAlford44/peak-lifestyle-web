import { AppBar, TextField, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { collection, doc, getDocFromCache, getDocs, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

import { app, auth, dbh } from '../../firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import SendIcon from '@mui/icons-material/Send'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { FilledInput } from '@mui/material'




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
    ButtonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      bottom: 100,
      alignItems: 'center',
    },
    imageSize: {
      height: '20px',
      width: '20px',
    },
    buttonComponents: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '40px',
      width: '50px',
    },
    inputBarContainer: {
      // flexDirection: 'row',

      // backgroundColor: '#680747',
      // backgroundColor: 'transparent',
      // borderColor: 'grey',
      // borderStyle: 'solid',
      // borderWidth: '10px'
      
      maxHeight: '30vh',
    },
    inputBar: {
      marginTop: '1vh',
      padding: '3px',
      fontSize: '14px',
      overflow: 'scroll',
      color: 'white',
      borderColor: 'transparent',
      // fontFamily: 'Courier',
      
     
      width: '80vw',
        maxHeight: '10vh',

      // backgroundColor: 'transparent',

      

     
      margin: '5px',
    },
    chatContainer: {
      display: 'flex',
      backgroundColor: 'white',
      maxHeight: '75vh',
      
      height: '90vh',
      width: '100vw',

      flexDirection: 'column',
      overflowY: 'scroll',
    },

    chatUserBubble: {
      borderColor: 'white',
      borderWidth: '5px',
      borderRadius: '18px',
      backgroundColor: '#680747',
      flexWrap: 'wrap',

      maxWidth: '40vw',
      padding: '10px',
      marginRight: '5vw',
      position: 'relative',
      marginBottom: '5px',
      alignSelf: 'flex-end',

      color: 'white',
    },
    chatBotBubble: {
      borderColor: 'white',
      borderWidth: '5px',
      borderRadius: '18px',
      backgroundColor: 'Grey',
      flexWrap: 'wrap',
      maxWidth: '40vw',
      padding: '10px',
      marginRight: '5vw',
      position: 'relative',
      marginBottom: '5px',
      alignSelf: 'flex-start',

      color: 'white',
    },
  }),
  { name: 'ChatScreen' }
)

const ChatScreen = e => {
  const db = getFirestore(app)
  const [userInput, setUserInput] = useState<string>('')
  const classes = useStyles()

  const [prevLogs, setPrevLogs] = useState<string[]>([])

  const [currInput, setCurrInput] = useState('')
  const [RECEIVED_MSG, setRECEIVED_MSG] = useState<any>({})
useEffect(() => {
  const getPrevSystemLogs = async () => {
  }
  const getPrevUserLogs = async () => {
  }
  // const getPrevLogs = async () => {
  //   const doc_ref = doc(db, 'Users', auth.currentUser.uid)
  //   const docSnap = await getDocFromCache(doc_ref)
  //   const data = docSnap.data()
  //   const prevLogs = data.info.ChatLogs.User
  //   setPrevLogs(prevLogs)
  // }
  // getPrevLogs()
},[])
  useEffect(() => {
    //RECEIVED_MSG.msg is the path to get a message from a python backend JSON response
    if (RECEIVED_MSG.msg != undefined && RECEIVED_MSG.msg != null && RECEIVED_MSG.msg != '') {
      //When the value of RECEIVED_MSG is updated, the message is updated to cloud firestore db and is displayed on left side of chat screen
     
      const date = new Date().valueOf()
      const doc_ref = doc(db, 'ChatLogs', auth.currentUser.uid)
      updateDoc(doc_ref, {
        [`System.${new Date().valueOf()}`]: {[RECEIVED_MSG.msg]: serverTimestamp()},
        
         
        
      })
      const TEXT_ELEMENT = document.createElement('div')
      TEXT_ELEMENT.className += classes.chatBotBubble
      const node = document.createTextNode(RECEIVED_MSG.msg)
      TEXT_ELEMENT.appendChild(node)

      const element = document.getElementById('ChatContainer')
      element.appendChild(TEXT_ELEMENT)
    }
  }, [RECEIVED_MSG])

  useEffect(() => {
    if (userInput != undefined && userInput != null && userInput != '') {
      //When the value of userInput is updated, the message is updated to cloud firestore db from a separate fetch request on line 211 and is displayed on right side of chat screen
      //for chat messages dispayed on right side of the screen
      const TEXT_ELEMENT = document.createElement('div')
      TEXT_ELEMENT.className += classes.chatUserBubble
      const node = document.createTextNode(userInput)
      TEXT_ELEMENT.appendChild(node)

      const element = document.getElementById('ChatContainer')
      element.appendChild(TEXT_ELEMENT)
    }
  }, [userInput])

  interface item {
    id: string
    text: string
  }

  const updateTextFieldUser = async () => {
    setUserInput(currInput)

    async function PushData() {
      try {
        const POST_MSG_TO_API = async () => {
          const response = await fetch(
            // `https://flask-vercel-api-zeta.vercel.app/users/id=${auth.currentUser.uid}/msg=${currInput}`
            'https://test-pwa-lac.vercel.app/push',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                msg: currInput,
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
              }),
            }
          )
            .then(data => data.json())
            .then(res => {
              setRECEIVED_MSG(res)
            })
          //POST RESPONCE TO DB
        }
        const POST_MSG_TO_DB = async () => {
          const date = new Date().valueOf()
          const doc_ref = doc(db, 'ChatLogs', auth.currentUser.uid)
          await updateDoc(doc_ref, {
            [`User.${new Date().valueOf()}`]: {[currInput]: serverTimestamp()}
          })
        }

        const [POST_MSG_TO_API_CALLBACK, POST_MSG_TO_DB_CALLBACK] = await Promise.allSettled([
          POST_MSG_TO_API(),
          POST_MSG_TO_DB(),
        ])
        console.log(POST_MSG_TO_API_CALLBACK.status)
        console.log(POST_MSG_TO_DB_CALLBACK.status)
      } catch (error) {
        alert(error)
    
      }
    }

    await PushData()
      .then(() => setCurrInput(''))
      .catch(error => alert(error))
  }
  return (
    <div style={{ overflow: 'scroll' }}>
      <div className={classes.chatContainer} id="ChatContainer"></div>
      <div className={classes.inputBarContainer}>
        <AppBar
          position="static"
          color="secondary"
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '13vh',
            opacity: '100%',
            borderBottomColor: 'white',
            borderBottomWidth: '8px',
            borderBottomStyle: 'solid',
          }}
        >
          <FilledInput
            multiline
            disableUnderline
            className={classes.inputBar}
            value={currInput}
            autoCapitalize="none"
            autoCorrect="false"
            autoComplete="off"
            onChange={e => {
              setCurrInput(e.target.value)
            }}
            inputProps={{ sx: { color: 'white' } }}
            onKeyDown={e => {
              if (e.key === 'Enter' && currInput.length > 0) {
                updateTextFieldUser()
              }
            }}
            placeholder="Message"
          />
          <button
            style={{
              display: 'flex',

              marginTop: '3vh',

              backgroundColor: 'transparent',
              borderColor: 'transparent',
            }}
            onClick={updateTextFieldUser}
          >
            <CloudUploadIcon
              style={{
                position: 'relative',
                color: 'white',

                height: '40px',
                width: '40px',
              }}
            />
          </button>
        </AppBar>
      </div>
    </div>
  )
}

export default ChatScreen
