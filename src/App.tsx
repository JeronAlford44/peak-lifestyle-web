import 'react-native-gesture-handler'
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { makeStyles } from '@material-ui/core/styles'
// import LoginScreen from './components/auth/LoginScreen'
// import RegisterScreen from './components/auth/RegisterScreen'
// import MainLayout from './components/pages/MainLayout'
import Layout from './Layout'

// import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native'
// import { createNavigationContainerRef, StackActions, useNavigation } from '@react-navigation/native'
import './App.css'
// import { NavigationContainer } from '@react-navigation/native'

// const Stack = createNativeStackNavigator()

// const useStyles = makeStyles(
//   theme => ({
//     root: {
//       fontWeight: 'bold',
//       padding: theme.spacing(1),
//       margin: theme.spacing(1),
//     },

//     content: {
//       color: 'red',
//       fontWeight: 'bold',
//       margin: '5rem',
//     },
//   }),
//   { name: 'App' }
// )

const App = (props: object) => {
  // const classes = useStyles(props)

  return <Layout/>
}

export default App
