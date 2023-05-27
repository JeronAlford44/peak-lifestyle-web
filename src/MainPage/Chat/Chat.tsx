import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { collection, doc, getDocFromCache, getDocs, setDoc, updateDoc } from 'firebase/firestore'

import { app, auth, dbh } from '../../firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'

import SendIcon from '@mui/icons-material/Send'
import handleChatbotReq from '../../Chatbot/chatbot'
import { error } from 'console'

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

      backgroundColor: '#680747',
    },
    inputBar: {
      padding: '3px',
      fontSize: '14px',
      // fontFamily: 'Courier',
      borderColor: 'transparent',
      borderWidth: '5px',
      width: '60vw',
      height: '5vh',

      // flexWrap: 'wrap',

      margin: '20px',
    },
    chatContainer: {
      display: 'flex',
      backgroundColor: 'black',
      maxHeight: '73vh',
      maxWidth: '90vw',
      height: '73vh',
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
  const [botInput, setBotInput] = useState(['welcome!', 'how are you today?'])
  const [botsTurn, setBotsTurn] = useState<boolean>(true)
  const [Greetings, setGreetings] = useState<item[]>([])

  const [currInput, setCurrInput] = useState('')

  useEffect(() => {
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

    const date = new Date().valueOf()
    const newChatLogs = {
      [date]: currInput,
    }

    const chatDocRef = doc(dbh, 'Users', auth.currentUser.uid)

    // await fetch('/users', {method: 'POST', body: JSON.stringify({Test: newChatLogs})}).catch(error => console.log(error))
    async function PushData() {
      try {
        const response = await fetch(
          `https://flask-vercel-api-zeta.vercel.app/users/id=${auth.currentUser.uid}/msg=${currInput}`,
          
        )

        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status)
        } else {
          console.log('PUSH-TEXT REQUEST SUCCESS')
        }

        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.log('error: ', error)
      }
    }

    await PushData()
      .then(() => setCurrInput(''))
      .catch(error => console.log('error 1: ', error))
    // const getData = async() => {
    //   try {
    //     const response = await fetch('https://flask-vercel-api-zeta.vercel.app', {
    //       headers: { 'Content-Type': 'application/json' },
    //     })

    //     if (!response.ok) {
    //       throw new Error('Request failed with status ' + response.status)
    //     }
    //     else {
    //       console.log("GET-TEXT REQUEST SUCCESS")
    //     }

    //     const data = await response.json().then(res => console.log(res))
    //     console.log(data)
    //   } catch (error) {
    //     console.log('error: ', error)
    //   }
    // }
    // await getData().catch(error => console.log(error))
    await setDoc(chatDocRef, { info: { ChatLogs: newChatLogs } }, { merge: true })
    // handleChatbotReq()
  }
  return (
    <div>
      <div className={classes.chatContainer}>
        {[...Greetings].map(word => {
          if (word.text !== '') {
            return <div className={classes.chatBotBubble}>{word.text}</div>
          }
        })}
        {[...userInput].map(word => {
          if (word !== '') {
            return <div className={classes.chatUserBubble}>{word}</div>
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
            console.log('greetings', Greetings)

            console.log(e.target.value)
            console.log(userInput)
            setCurrInput(e.target.value)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && currInput.length > 0) {
              updateTextFieldUser()
            }
          }}
        ></input>
        <button
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            position: 'relative',
            top: '15px',
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
