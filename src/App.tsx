import { Routes, Route, BrowserRouter as Router, Navigate, useNavigate } from 'react-router-dom'
import AppContainer from './containers/AppContainer'
import AuthContainer from './containers/AuthContainer'
import RegisterScreen from './auth/Register'
import { CssBaseline, ThemeProvider, createTheme, makeStyles } from '@material-ui/core'
import ChatScreen from './MainPage/Chat/Chat'
import HomeScreen from './MainPage/Progress/Progress'
import LoginScreen from './auth/Login'
import AboutScreen from './MainPage/Settings/components/AboutScreen/About'
import DisplayScreen from './MainPage/Settings/components/DisplayScreen/Display'
import HelpScreen from './MainPage/Settings/components/HelpScreen/Help'

import NotificationsScreen from './MainPage/Settings/components/NotificationsScreen/Notifications'
import PasswordResetScreen from './MainPage/Settings/components/PasswordResetScreen/PasswordReset'

import VerifyEmailScreen from './MainPage/Settings/components/VerifyEmailScreen/VerifyEmail'
import SettingsContainer from './containers/SettingsContainer'
import ChangeDisplayName from './MainPage/Settings/components/ChangeDisplayNameScreen/ChangeDisplayName'

import ProfileScreen from './MainPage/Settings/components/ProfileScreen/Profile'
import ProgressScreen from './MainPage/Progress/Progress'
import { auth } from './firebaseConfig'
import LogoutScreen from './MainPage/Settings/components/LogoutScreen/Logout'
import SettingsProvider from './Providers/SettingsProvider'
import SettingsMenuContextProvider from './Providers/Context/SettingsContext'
import UserProfileProvider from './Providers/UserProfileProvider'
import StylesProvider from './Providers/StylesProvider'


const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      //backgroundColor: '#680747',
      backgroundColor: '#aa00ff',
      zIndex: 1,
      width: '100vw',
      height: '100vh',
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
      flexDirection: 'column',
    },
    inputBar: {
      padding: '10px',
      fontSize: '32px',
      fontFamily: 'Courier',
      borderColor: '#861388',
      borderWidth: '5px',
      borderRadius: '32px',
      marginBottom: '10vh',
    },
  }),
  { name: 'App' }
)

const App = props => {
  const classes = useStyles()
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#ab47bc',
      },
      secondary: {
        main: '#ff4081',
        
      },
     
    },
  })

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
        <div className={classes.root}>
          <Router>
            <Routes>
              <Route path="/" element={<UserProfileProvider />}>
                <Route path="/" element={<StylesProvider />}>
                  <Route path="/" element={<Navigate to="/auth/login" replace={true} />} />

                  <Route path="/" element={<AppContainer />}>
                    <Route path="progress" element={<ProgressScreen />} />
                    <Route path="chat" element={<ChatScreen />} />
                    <Route path="settings" element={<SettingsProvider />}>
                      <Route path="menu" element={<SettingsContainer />}>
                        <Route path="about" element={<AboutScreen />} />
                        <Route path="display-options" element={<DisplayScreen />} />
                        <Route path="help" element={<HelpScreen />} />
                        <Route path="log-out" element={<LogoutScreen />} />
                        <Route path="notifications" element={<NotificationsScreen />} />
                        <Route path="reset-password" element={<PasswordResetScreen />} />
                        <Route path="profile" element={<ProfileScreen />} />
                        <Route path="verify-email" element={<VerifyEmailScreen />} />
                        <Route path="change-display-name" element={<ChangeDisplayName />} />
                      </Route>
                    </Route>
                  </Route>

                  <Route path="auth" element={<AuthContainer />}>
                    <Route path="register" element={<RegisterScreen />} />
                    <Route path="login" element={<LoginScreen />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </Router>
        </div>
 
    </ThemeProvider>
  )
}

export default App
