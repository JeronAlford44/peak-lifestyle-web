import { Button, makeStyles } from '@material-ui/core'
import { useContext, useState } from 'react'
import { auth, dbh } from '../firebaseConfig'
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { unsubscribe } from 'diagnostics_channel'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { UserProfileContext } from '../Providers/Context/UserProfileContext'


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

  const {userData, toggleItemState} = useContext(UserProfileContext)
  const handleRegister = async () => {
 

    if (user.password !== user.retypePassword) {
      alert('Passwords do not match')
    } else {
      setPersistence(auth, browserLocalPersistence)
  .then(async() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(userCredentials => {
          const newUser = userCredentials.user
          
          updateProfile(auth.currentUser, {
            displayName: user.name,
          }).then(async () => {
            toggleItemState('Name', auth.currentUser.displayName)
            toggleItemState('Email', auth.currentUser.email)
            toggleItemState('RegisterDate', new Date().valueOf())
            // toggleItemState(
            //   'ProfileImgUrl',
            //   'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
            // )
            
            await setDoc(doc(dbh, 'Users', auth.currentUser.uid), userData)

         
          })

      
        })
        .then(() => {
          navigate('/progress')
        })
        .catch(error => alert(error.message))
    }
  )
  }}

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
             
                    setUser(prevInfo => ({ ...prevInfo, retypePassword: text.target.value }))
                  } else {
                    setUser(prevInfo => ({
                      ...prevInfo,
                      [component[0]]: text.target.value,
                    }))
                  }

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

