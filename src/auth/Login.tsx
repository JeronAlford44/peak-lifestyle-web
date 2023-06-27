import { Button, makeStyles } from '@material-ui/core'
import { useContext, useState } from 'react'
import { auth, dbh } from '../firebaseConfig'
import {
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
  const { userData, toggleItemState } = useContext(UserProfileContext)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence)
      await signInWithEmailAndPassword(auth, user.email, user.password)
      console.log('logged in')
      const userDocRef = doc(dbh, 'Users', auth.currentUser.uid)
      const userDocSnap = await getDoc(userDocRef)
      console.log('data,', userDocSnap.data())
      if (userDocSnap.exists()) {
        toggleItemState('All', userDocSnap.data() as object)
        console.log(userData)
      }
      navigate('/progress')
      console.log(userData)
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
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        {elements.map((component: object, idx) => {
          return (
            <div key={idx} className={classes.inputBar}>
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
        <div
          style={{
            fontSize: '15px',
            display: 'inline',
            flexWrap: 'wrap',
            width: '60vw',
            color: 'white',
          }}
        >
          Haven't signed up??
        </div>
        <Button className={classes.registerButton} href="/auth/Register">
          Create Account
        </Button>
      </div>
    </div>
  )
}

export default LoginScreen
