import { Button, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { unsubscribe } from 'diagnostics_channel'

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
      backgroundColor: 'white',
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
      borderColor: ''
    },
    input: {
      borderColor: 'transparent',
      borderBottomColor: 'black',
      borderWidth: '1px'
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

    }
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
  
const handleRegister = () =>{
  console.log(user.password, user.retypePassword)
 if (user.password !== user.retypePassword){
  alert('Passwords do not match')
 }
 else{
  createUserWithEmailAndPassword(auth, user.email, user.password).then(userCredentials => {
        const newUser = userCredentials.user;
        console.log(newUser)
        console.log('Logged in with:', newUser.email);
        console.log('Welcome', newUser.displayName)
        //console.log('Phone Number:', newUser.phoneNumber)
      }).then(()=> {navigate('/home')})
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
  // const {name, setName} = useState('')
  // const {email, setEmail} = useState('')
  // const {password, setPassword} = useState('')
  

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, prop : string) => {
//     const { name, value } = e.target
//     setUser(prevUser => ({
//       ...prevUser,
//       [name]: value,
//     }))
//     return prop
//   }
  // const [givenInfo, setGivenInfo] = useState<string>('');
  
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
                onChange={(text) => {

                  if (component[1] === 'confirm password'){
                  console.log(component)
                  setUser(prevInfo =>({...prevInfo, retypePassword : text.target.value}))
                  }
                  else{
                    setUser(prevInfo => ({
...prevInfo, 
[component[0]] : text.target.value
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
      
      <Button className = {classes.registerButton} onClick={()=>{
        handleRegister()
      }}>Register</Button>
<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
<text>Already have an account?</text>
<Button className = {classes.registerButton} href="/auth/Login">Login</Button>
</div>
    </div>
  )
  
 
}

export default RegisterScreen
