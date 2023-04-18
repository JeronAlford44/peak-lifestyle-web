import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'


import AppContainer from './containers/AppContainer'
import MainLayout from './containers/MainLayout'
import BasicTable from './examples/mui/BasicTable'
import DataGridDemo from './examples/mui/DataGridDemo'
import AuthContainer from './containers/AuthContainer'
import RegisterScreen from './auth/Register'
import { makeStyles } from '@material-ui/core'
import ChatScreen from './MainPage/Chat'
import HomeScreen from './MainPage/Home'
import SettingsScreen from './MainPage/Settings'
import LoginScreen from './auth/Login'


const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      margin: theme.spacing(3),
      backgroundColor: '#680747',
      zIndex: 1,
      width: '95vw',
      height: '90vh'
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
      margin: '50px',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20vh',
      flexDirection: 'column'
      
    },
    inputBar: {
    padding: '10px',
    fontSize: '32px',
    fontFamily: 'Courier',
      borderColor: "#861388",
      borderWidth: '5px',
      borderRadius: '32px',
      marginBottom: '10vh'
    }
  }),
  { name: 'App' }
)
const App = props => {
  const classes = useStyles()
  return (
    <div className = {classes.root}>
      <Router>
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route path="home" element={<HomeScreen />} />
            <Route path="chat" element={<ChatScreen/>} />
            <Route path = 'settings' element = {<SettingsScreen/>}/>
          </Route>
          {/* <Route path="test" element={<BasicTable />} /> */}
          <Route path = 'auth'  element = {<AuthContainer/>}>

            <Route path = 'register'  element = {<RegisterScreen/>} />
            <Route path = 'login'  element = {<LoginScreen/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
