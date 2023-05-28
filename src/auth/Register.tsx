import { Button, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { auth, dbh } from '../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { unsubscribe } from 'diagnostics_channel'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

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
      backgroundColor: 'black',
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
      backgroundColor: 'white',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    loginButton: {
      backgroundColor: 'grey',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      color: 'white',
    },
  }),
  { name: 'App' }
)
var finalUser
const RegisterScreen = () => {
  const navigate = useNavigate()

  interface RegisterUser {
    name: string
    email: string
    password: string
    retypePassword: string
  }
  const [user, setUser] = useState<RegisterUser>({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
  })

  const handleRegister = async () => {
    // console.log(user.password, user.retypePassword)

    if (user.password !== user.retypePassword) {
      alert('Passwords do not match')
    } else {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(userCredentials => {
          const newUser = userCredentials.user
          console.log(newUser)
          finalUser = newUser
          updateProfile(auth.currentUser, {
            displayName: user.name,
          }).then(async () => {
            await setDoc(doc(dbh, 'Users', auth.currentUser.uid), {
              info: {
                name: user.name,
                email: user.email,
                RegisterDate: new Date().valueOf(),
                ChatLogs: {
                  ['Text']: 'firestoreTimestamp',
                },
              },
            })

            // console.log('Logged in with:', newUser.email)
            // console.log('Welcome', newUser.displayName)
          })

      
        })
        .then(() => {
          navigate('/home')
        })
        .catch(error => alert(error.message))
    }
  }

  const elements = [
    ['name', 'name'],
    ['email', 'email address'],
    ['password', 'password'],
    ['password', 'confirm password'],
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
                  if (component[1] === 'confirm password') {
                    // console.log(component)
                    setUser(prevInfo => ({ ...prevInfo, retypePassword: text.target.value }))
                  } else {
                    setUser(prevInfo => ({
                      ...prevInfo,
                      [component[0]]: text.target.value,
                    }))
                  }

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
        className={classes.registerButton}
        onClick={() => {
          handleRegister()
        }}
      >
        Register
      </Button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: 'white' }}>Already have an account?</div>
        <Button className={classes.loginButton} href="/auth/Login">
          Login
        </Button>
      </div>
    </div>
  )
}

export default RegisterScreen
export { finalUser }
