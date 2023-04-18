import { Button, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
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

const LoginScreen = () => {
  const navigate = useNavigate()
  
//   useEffect(() => {
    
//     const unsubscribe = auth.onAuthStateChanged(user => {
//      if (user) {
//        console.log('tried')
//        console.log('User detected.')
//        //WHY IS ROUTES NOT POPPING UP?
//        //WHY IS useEffect NOT WORKING?
//        navigate('/home')
       
//      } 
//    })
//    return unsubscribe
//  },[navigate]);
  
 
  interface RegisterUser {
    
    email: string
    password: string
    
  }
  const [user, setUser] = useState<RegisterUser>({
    
    email: '',
    password: '',
    
  })
  
const handleLogin = () =>{
  console.log(user.email, user.password)
 
  signInWithEmailAndPassword(auth, user.email, user.password).then(userCredentials => {
        console.log('logged in')
        //console.log('Phone Number:', newUser.phoneNumber)
      }).then(()=> {navigate('/home')})
      .catch(error => alert(error.message))
    
  }

  

  const elements = [
    
    ['email', 'email address'],
    ['password', 'password'],
    
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

                  
                    setUser(prevInfo => ({
...prevInfo, 
[component[0]] : text.target.value
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
      
      <Button className = {classes.registerButton} onClick={()=>{
        handleLogin()
      }}>Login</Button>
<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
<text>Haven't signed up??</text>
<Button className = {classes.registerButton} href="/auth/Register">Register</Button>
</div>
    </div>
  )
  
 
}

export default LoginScreen
