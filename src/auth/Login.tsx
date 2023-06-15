import { Button, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// createStyles (old) vs makeStyles (new)
// https://smartdevpreneur.com/material-ui-makestyles-usestyles-createstyles-and-withstyles-explained/
const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      margin: theme.spacing(3),
      //backgroundColor: '#680747',
      backgroundColor: '#F8AFA6',
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
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBar: {
      // backgroundColor: 'black',

      // borderBottomWidth: '5px',
      marginTop: 5,
      padding: '20px',
      borderColor: '',
    },
    input: {
      borderColor: 'transparent',
      borderBottomColor: 'black',
      borderWidth: '1px',
    },
    registerButton: {
      backgroundColor: 'grey',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      color: 'white',
    },
    loginButton: {
      backgroundColor: 'white',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      color: 'black',
    },
  }),
  { name: 'App' }
)

const LoginScreen = () => {
  const navigate = useNavigate()

  interface RegisterUser {
    email: string
    password: string
  }
  const [user, setUser] = useState<RegisterUser>({
    email: '',
    password: '',
  })

  const handleLogin = () => {
    console.log(user.email, user.password)

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(userCredentials => {
        console.log('logged in')
      })
      .then(() => {
        navigate('/progress')
      })
      .catch(error => alert(error.message))
  }

  const elements = [
    ['email', 'email address'],
    ['password', 'password'],
  ]
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        {elements.map((component: object) => {
          return (
            <div className={classes.inputBar}>
              <input
                className={classes.input}
                type={`${component[0]}`}
                placeholder={`${component[1]}`}
                onChange={text => {
                  setUser(prevInfo => ({
                    ...prevInfo,
                    [component[0]]: text.target.value,
                  }))

                  // GET HELP ON THIS
                }}
                autoCapitalize="none"
                autoCorrect="false"
                autoComplete="off"
              />
            </div>
          )
        })}
      </div>

      <Button
        className={classes.loginButton}
        onClick={() => {
          handleLogin()
        }}
      >
        Login
      </Button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <text
          style={{
            fontSize: '15px',
            display: 'inline',
            flexWrap: 'wrap',
            width: '60vw',
            color: 'white',
          }}
        >
          Haven't signed up??
        </text>
        <Button className={classes.registerButton} href="/auth/Register">
          Create Account
        </Button>
      </div>
    </div>
  )
}

export default LoginScreen
