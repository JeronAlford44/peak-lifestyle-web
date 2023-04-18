import { Button, makeStyles } from '@material-ui/core'
import { useState } from 'react'

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
      backgroundColor: '#F79489',
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
      backgroundColor: 'white',

      borderRadius: '32px',
      marginTop: 5,
      padding: '20px',
      borderColor: ''
    },
    input: {
      borderColor: 'transparent',
    },
    registerButton: {
      backgroundColor: 'white',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
  }),
  { name: 'App' }
)

const RegisterScreen = () => {

  const handleSignup = () => {
    return
  }

  interface RegisterUser {
    name: string
    email: string
    password: string
    retypePassword: string
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
  const [user, setUser] = useState<RegisterUser>({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
  })

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
[component[0]] : text
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
      
      <button className={classes.registerButton} onClick={()=> {
        console.log(user)
      }}>
        <text>register</text>
      </button>
    </div>
  )
  
 
}

export default RegisterScreen
