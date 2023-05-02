import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { doc, getDocFromCache } from 'firebase/firestore'

import { app } from '../../firebaseConfig'
import { getFirestore } from 'firebase/firestore'
import { getDoc } from 'firebase/firestore'

import SendIcon from '@mui/icons-material/Send'

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
      backgroundColor: 'white',
      height: '73vh',
      width: '90vw',

      flexDirection: 'column',
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
  { name: 'App' }
)

const ChatScreen = () => {
  const db = getFirestore(app)
  const [userInput, setUserInput] = useState(['Hello', 'World'])
  const classes = useStyles()
  const [botInput, setBotInput] = useState(['welcome!', 'how are you today?'])
  const [botsTurn, setBotsTurn] = useState<boolean>(true)
  const [Greetings, setGreetings] = useState<object>({})

  const [currInput, setCurrInput] = useState('')
  const fetchGreetings = async () => {
    // Get a document, forcing the SDK to fetch from the offline cache.
    const docRef = doc(db, 'Chatbot', 'greetings')

    const docSnap = await getDoc(docRef)
      .then(val => setGreetings(val.data().greetings))
      .then(() => console.log(JSON.stringify(Greetings).split(',')))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    console.log(Greetings)
  }, [Greetings])
  const updateTextFieldUser = () => {
    setUserInput(prevInput => {
      return [...prevInput, currInput]
    })
    setCurrInput('')
  }
  return (
    <div>
      <div>Chat</div>
      <div className={classes.chatContainer}>
        {[...botInput].map(word => {
          if (word !== '') {
            return <div className={classes.chatBotBubble}>{word}</div>
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
            fetchGreetings()
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
