import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native'
import { auth } from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('MainLayout')
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    console.log(auth)
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        console.log(phoneNumber)
        const user = userCredentials.user
        updateProfile(auth.currentUser, {
          displayName: name, phoneNumber: phoneNumber
        })
          .then(() => {
            console.log('Profile updated!')
            // ...
          })
          .catch(error => {
            alert(error.message)
            // ...
          })
          .then(() => {
            console.log(user)
            console.log('Logged in with:', user.email)
            console.log('Welcome', user.displayName)
            console.log(userCredentials)
          })
      })
      .catch(error => alert(error.message))
  }

  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.heartImage}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/505/848/original/medical-heart-illustration-png.png',
          }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <View style={styles.logo}>
        <Text style={styles.logoText}> Peak Lifestyle</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          // value={email}
          onChangeText={text => setName(text)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
        <TextInput
          placeholder="Phone Number"
          // value={password}
          onChangeText={(text) => {
    setPhoneNumber(text.replace(/\s/g, ''))
  }}
          style={styles.input}
        
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
        <TextInput
          placeholder="Email"
          // value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
        <TextInput
          placeholder="Password"
          // value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={[styles.registerButton]}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            width: Dimensions.get('window').width,
          }}
        >
          Already Signed Up?{' '}
        </Text>
        <TouchableOpacity
      style={styles.loginButton}
      onPress={() => navigation.navigate('LoginScreen')}
    >
      <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

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
  loginButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  registerButtonText: {
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
    marginTop: 20,
    
  },
  registerButton: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    
    marginBottom: 20,
  },
  heartImage: {
    position: 'absolute',
    top: 75,
    right: 40,
  },

  loadAppText: {
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

  logoText: {
    color: 'black',
    fontSize: 30,

    flexDirection: 'column',

    textShadowRadius: 10,
    textShadowColor: '#F9F1F0',
    fontFamily: 'Avenir Next',
  },
})
