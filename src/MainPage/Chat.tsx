import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
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
      fontSize: '32px',
      fontFamily: 'Courier',
      borderColor: 'transparent',
      borderWidth: '5px',
      width: '70vw',

      margin: '20px',
    },
    chatContainer: {
      display: 'flex',
      backgroundColor: 'white',
      height: '65vh',
      width: '90vw',
      alignItems: 'flex-end',
      flexDirection: 'column-reverse',
    },

    chatBubble: {
      borderColor: 'white',
      borderWidth: '5px',
      borderRadius: '18px',
      backgroundColor: '#680747',
      flexWrap: 'wrap',
      maxWidth: '20vw',
      padding: '10px',
      marginRight: '5vw',
      position: 'relative',

      color: 'white',
    },
  }),
  { name: 'App' }
)

const ChatScreen = () => {
  const [userInput, setUserInput] = useState(['Hello', 'World'])
  const classes = useStyles()

  const [currInput, setCurrInput] = useState('')

  const updateTextFieldUser = () => {
    setUserInput(prevInput => {
      return [...prevInput, currInput]
    })
    setCurrInput('')
  }
  return (
    <div>
      <div className={classes.chatContainer}>
        {userInput.map(word => {
          if (word !== '') {
            return <div className={classes.chatBubble}>{word}</div>
          }
        })}
      </div>
      <div className={classes.inputBarContainer}>
        <input
          className={classes.inputBar}
          onChange={e => {
            console.log(e)
            console.log(e.target.value)
            console.log(userInput)
            setCurrInput(e.target.value)
          }}
        ></input>
        <button
          style={{
            backgroundColor: 'transparent',
            borderColor: 'white',
            position: 'relative',
            top: '10px',
            left: '50px',
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
