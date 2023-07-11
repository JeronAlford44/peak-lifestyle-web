import { Button, TextField, makeStyles } from '@material-ui/core'
import { useContext, useState } from 'react'
import { auth, dbh } from '../firebaseConfig'
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { UserProfileContext } from '../Providers/Context/UserProfileContext'
import { doc, getDoc } from 'firebase/firestore'
import UpdateLastSignIn from '../MainPage/Progress/components/LastLogin'
import { StylesContext } from '../Providers/Context/StylesContext'

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
      flexDirection: 'column',
      
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
      marginBottom: '5vh',
    },
    inputBar: {
      backgroundColor: 'whitesmoke',

      // borderBottomWidth: '5px',
      marginTop: 5,

      borderColor: 'whitesmoke',

      borderStyle: 'solid',
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      // borderColor: 'white',

      // borderWidth: '1px',
      // borderStyle: 'solid',
      color: 'white',

      backgroundColor: 'transparent',
      borderColor: 'transparent',
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
  const { userData, toggleItemState } = useContext(UserProfileContext)
  const { themeOptions, isLightMode, globalStyles, toggleLightMode } = useContext(StylesContext)
  const style = globalStyles()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence).then(async () => {
        return await signInWithEmailAndPassword(auth, user.email, user.password)
      })
      toggleItemState('LastSignIn', new Date())

      const userDocRef = doc(dbh, 'Users', auth.currentUser.uid)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        toggleItemState('All', userDocSnap.data() as object)
      }
      navigate('/progress')
    } catch (error) {
      alert(error.message)
    }
  }

  const classes = useStyles()

  const elements = [
    ['email', 'email address'],
    ['password', 'password'],
  ]

  return (
    <div className={style.authContainer}>
      <div className={classes.inputContainer}>
        {elements.map((component: object, idx) => {
          return (
            <div key={idx} className={classes.inputBar}>
              <TextField
                color="primary"
                variant="filled"
                label={`${component[1]}`}
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
      <div className={classes.ButtonsContainer}>
        <Button
          className={style.authButtons}
          onClick={() => {
            handleLogin()
          }}
        >
          Login
        </Button>
<div style={{color: 'white', fontSize: '16px'}}>Need to Sign Up?</div>
        <Button className={style.authButtons} href="/auth/Register">
          Create Account
        </Button>
      </div>
    </div>
  )
}

export default LoginScreen
