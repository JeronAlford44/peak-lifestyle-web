import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { collection, doc, getDocFromCache, getDocs, setDoc, updateDoc } from 'firebase/firestore'

import { app, auth, dbh } from '../../firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'

import SendIcon from '@mui/icons-material/Send'
import { METHODS } from 'http'

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
      flexDirection: 'row',

      // backgroundColor: '#680747',
      backgroundColor: 'transparent',
      borderColor: 'grey',
      borderStyle: 'solid',
      borderRadius: '16px',
    },
    inputBar: {
      padding: '3px',
      fontSize: '14px',
      // fontFamily: 'Courier',
      borderColor: 'transparent',
      borderWidth: '1px',
      width: '60vw',
      height: '5vh',
      backgroundColor: 'transparent',

      color: 'grey',

      // flexWrap: 'wrap',

      margin: '5px',
    },
    chatContainer: {
      display: 'flex',
      backgroundColor: 'black',
      maxHeight: '73vh',
      maxWidth: '90vw',
      height: '75vh',
      width: '90vw',

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
  const [userInput, setUserInput] = useState(['Hello', 'World'])
  const classes = useStyles()

  const [Greetings, setGreetings] = useState<item[]>([])

  const [currInput, setCurrInput] = useState('')

  useEffect(() => {
    // FUNCTION TO RETRIEVE GREETINGS
    const retrieveData = async () => {
      const coll = collection(dbh, 'greetings')
      const querySnapshot = await getDocs(coll)
      const newGreetings = []
      querySnapshot.forEach(async doc => {
        console.log(doc.id, ' => ', doc)
        const data = doc.data()

        const item = {
          id: doc.id,
          text: data.text,
        }
        newGreetings.push(item)
      })

      setGreetings(newGreetings)
    }

    retrieveData()
  }, [])
  interface item {
    id: string
    text: string
  }

  useEffect(() => {
    //DEVELPOER FUNCTION TO GET ALL GREETINGS
    const printGreetings = () => {
      Greetings.forEach(element => {
        console.log('Text:', element.text)
      })
    }
    printGreetings()
  }, [Greetings])
  const updateTextFieldUser = async () => {
    setUserInput(prevInput => {
      return [...prevInput, currInput]
    })
    const [jsonResponse, setJsonResponse] = useState('')

    // const date = new Date().valueOf()
    // const newChatLogs = {
    //   [date]: currInput,
    // }

    async function PushData() {
      try {
        const POST_MSG_TO_API = () => {
         const response =  fetch(
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
        console.log(response)
        
        }
        const POST_MSG_TO_DB = () => {
          const date = new Date().valueOf()
          const doc_ref = doc(db, 'Users', auth.currentUser.uid)
          updateDoc(doc_ref, {
            
            [`info.ChatLogs.${date}`]: currInput,
          })

        }
        // https://test-pwa-lac.vercel.app/push
      
        const [POST_MSG_TO_API_CALLBACK, POST_MSG_TO_DB_CALLBACK] = await Promise.allSettled([POST_MSG_TO_API(), POST_MSG_TO_DB()])
        console.log(POST_MSG_TO_API_CALLBACK.status)
        console.log(POST_MSG_TO_DB_CALLBACK.status)
        // if (!POST_MSG_TO_API_CALLBACK.ok) {
        //   throw new Error('Request failed with status ' + response.status)
        // } else {
        //   console.log('PUSH REQUEST SUCCESS')
        // }

        // const data = await response.json()
        // console.log(data)
      } catch (error) {
        console.log(error)
        alert(error)

      }
    }

    await PushData()
      .then(() => setCurrInput(''))
      .catch(error => alert(error))
   
  }
  return (
    <div>
      <div className={classes.chatContainer}>
        {[...Greetings].map((word, idx) => {
          if (idx >= 1) {
            return
          }
          if (word.text !== '') {
            return (
              <div key={idx} className={classes.chatBotBubble}>
                {word.text}
              </div>
            )
          }
        })}
        {[...userInput].map((word, idx) => {
          if (word !== '') {
            return (
              <div key={idx} className={classes.chatUserBubble}>
                {word}
              </div>
            )
          }
        })}
      </div>
      <div className={classes.inputBarContainer}>
        <input
          className={classes.inputBar}
          value={currInput}
          autoCapitalize="none"
          autoCorrect="false"
          autoComplete="off"
          onChange={e => {
            setCurrInput(e.target.value)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && currInput.length > 0) {
              updateTextFieldUser()
            }
          }}
          placeholder="Message"
        ></input>
        <button
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            position: 'relative',
          }}
          onClick={updateTextFieldUser}
        >
          <SendIcon
            style={{
              color: 'white',
              backgroundColor: 'transparent',
              height: '40px',
              width: '40px',
            }}
          />
        </button>
      </div>
    </div>
  )
}

export default ChatScreen
