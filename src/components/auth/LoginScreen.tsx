import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native/types'


import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth'
import RegisterScreen from './RegisterScreen'
import { Dimensions } from 'react-native/types'
import { makeStyles } from '@material-ui/core/styles'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Main')
      }
    })

    return unsubscribe
  }, [])

  // const handleSignUp = () => {
  //   console.log(auth)
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(userCredentials => {
  //       const user = userCredentials.user
  //       user.displayName = name
  //       console.log('Registered with:', user.email)
  //     })
  //     .catch(error => alert(error.message))
  // }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredentials: object) => {
      console.log(userCredentials)
      const user = userCredentials.user;
      console.log(user)
      console.log('Logged in with:', user.email);
      console.log('Welcome', user.displayName)
      console.log('Phone Number:', user.phoneNumber)
    })
    .catch(error => alert(error.message))
  }
  
  return (
    <div style={styles.container} > 
    {/* behavior="padding" */}
      <div style={styles.heartImage}>
        <image
          href ='https://static.vecteezy.com/system/resources/predivs/008/505/848/original/medical-heart-illustration-png.png'
          
          style={{ width: 100, height: 100 }}
        />
      </div>
      <div style={styles.logo}>
        <text style={styles.logoText}> Peak Lifestyle</text>
      </div>
      <div style={styles.inputContainer}>
        <input
          placeholder="Name"
          // value={email}
          onChange={text => setName(`${text}`)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={'false'}
          autoComplete="off"
        />
        
        <input
          placeholder="Email"
          // value={email}
          onChange={text => setEmail(`${text}`)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={'false'}
          autoComplete="off"
        />
        <input
          placeholder="Password"
          // value={password}
          onChange={text => setPassword(`${text}`)}
          style={styles.input}
          // secureTextEntry
          autoCapitalize="none"
          autoCorrect={'false'}
          autoComplete="off"
        />
      </div>

      <div style={styles.buttonContainer}>
        <button onClick={handleLogin} style={styles.loginButton}>
          <text style={styles.loginButtonText}>Login</text>
        </button>
        <text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            width: Dimensions.get('window').width,
          }}
        >
          Don't have an account?{' '}
        </text>
        <button
      style={styles.registerButton}
      onClick={() => navigation.navigate('Register')}
    >
      <text style={styles.registerButtontext}>Register</text>
    </button>
    
      </div>
    </div>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F79489',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#B95C50',
    borderWidth: 2,
  },
  loginButtontext: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  registerButtontext: {
    color: '#B95C50',
    fontWeight: '700',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#B95C50',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  heartImage: {
    position: 'absolute',
    top: 75,
    right: 40,
  },

  loadApptext: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 300,
  },

  logo: {
    position: 'absolute',
    top: 100,
    right: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logotext: {
    color: 'black',
    fontSize: 30,

    flexDirection: 'column',

    textShadowRadius: 10,
    textShadowColor: '#F9F1F0',
    fontFamily: 'Avenir Next',
  },
})
