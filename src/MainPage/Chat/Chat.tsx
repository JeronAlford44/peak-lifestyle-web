import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { collection, doc, getDocFromCache, getDocs } from 'firebase/firestore'

import { app, dbh } from '../../firebaseConfig'
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
  { name: 'ChatScreen' }
)

const ChatScreen = () => {
  const db = getFirestore(app)
  const [userInput, setUserInput] = useState(['Hello', 'World'])
  const classes = useStyles()
  const [botInput, setBotInput] = useState(['welcome!', 'how are you today?'])
  const [botsTurn, setBotsTurn] = useState<boolean>(true)
  const [Greetings, setGreetings] = useState<item[]>([])

  const [currInput, setCurrInput] = useState('')
  
  useEffect(() => {
    console.log('HELLO')
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

        // const greetingColl = collection(dbh, 'greetings', doc.id)
      })

      setGreetings(newGreetings)
    }

    retrieveData()
  }, [])
  interface item  {
    'id': string,
    'text': string
  }

  useEffect(() => {
    const printGreetings = () => {
    Greetings.forEach(element => {
      console.log("Text:",element.text)
    });
  }
    printGreetings()
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
