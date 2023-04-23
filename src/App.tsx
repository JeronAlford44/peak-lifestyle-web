import { Routes, Route,  BrowserRouter as Router,Navigate } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import AuthContainer from './containers/AuthContainer';
import RegisterScreen from './auth/Register';
import { makeStyles } from '@material-ui/core';
import ChatScreen from './MainPage/Chat/Chat';
import HomeScreen from './MainPage/Home/Home';
import LoginScreen from './auth/Login';
import AboutScreen from './MainPage/Settings/components/About';
import DisplayScreen from './MainPage/Settings/components/Display';
import HelpScreen from './MainPage/Settings/components/Help';
import LogoutScreen from './MainPage/Settings/components/Logout';
import NotificationsScreen from './MainPage/Settings/components/Notifications';
import PasswordResetScreen from './MainPage/Settings/components/PasswordReset';
import ProgressScreen from './MainPage/Settings/components/Progress';
import VerifyEmailScreen from './MainPage/Settings/components/VerifyEmail';
import SettingsContainer from './containers/SettingsContainer';
import ChangeDisplayName from './MainPage/Settings/components/ChangeDisplayName';


const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#680747',
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
);

const App = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace={true} />} />
          <Route path="/" element={<AppContainer />}>
            <Route path="home" element={<HomeScreen />} />
            <Route path="chat" element={<ChatScreen />} />
            <Route path="settings" element={<SettingsContainer/>}>
              <Route path="about" element={<AboutScreen />} />
              <Route path="display-options" element={<DisplayScreen />} />
              <Route path="help" element={<HelpScreen />} />
              <Route path="log-out" element={<LogoutScreen />} />
              <Route path="notifications" element={<NotificationsScreen />} />
              <Route path="reset-password" element={<PasswordResetScreen />} />
              <Route path="progress" element={<ProgressScreen />} />
              <Route path="verify-email" element={<VerifyEmailScreen />} />
              <Route path="change-display-name" element={<ChangeDisplayName/>} />
            </Route>
          </Route>
          <Route path="auth" element={<AuthContainer />}>
            <Route path="register" element={<RegisterScreen />} />
            <Route path="login" element={<LoginScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
