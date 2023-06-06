import * as React from 'react'
import { useState } from 'react'

import Toolbar from '@mui/material/Toolbar'

import AboutScreen from '../MainPage/Settings/components/About'
import ProgressScreen from '../MainPage/Settings/components/Progress'
import NotificationsScreen from '../MainPage/Settings/components/Notifications'
import VerifyEmailScreen from '../MainPage/Settings/components/VerifyEmail'
import PasswordResetScreen from '../MainPage/Settings/components/PasswordReset'
import HelpScreen from '../MainPage/Settings/components/Help'
import LogoutScreen from '../MainPage/Settings/components/Logout'
import DisplayScreen from '../MainPage/Settings/components/Display'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { makeStyles } from '@material-ui/core'

import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ChangeDisplayName from '../MainPage/Settings/components/ChangeDisplayName'

const drawerWidth = 240

const useStyles = makeStyles(
  theme => ({
    root: {},
    menuContainer: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      marginTop: '5vh',
      overflowY: 'scroll',
      
    },
    tool: {
      backgroundColor: 'transparent',
      // borderColor: 'black ',
      // borderWidth: 1,
      // borderBottomStyle: 'solid',

      alignSelf: 'center',
      alignItems: 'center',
      width: '80vw',

      opacity: '100',
    },
    ArrowBackIcon: {
      color: '#007AFF',
      width: '50px',
      height: '50px',
      borderBottomColor: '#007AFF',
      borderBottomStyle: 'solid',
    },
    componentContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '90vw',
      height: '83vh',
      backgroundColor: 'black',
    },
    settingsHeader: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: '32px',
      color: 'white',
    },
    menuBar: {
      display: 'flex',
      flexDirection: 'row',
      borderColor: 'grey',
      borderLeftColor: 'transparent',
      borderRadius: '16px',
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
      borderStyle: 'solid',
      width: '80vw',
      marginTop: '5px',
      backgroundColor: '#680747',
    },
  }),
  { name: 'Settings' }
)

export default function SettingsContainer(props) {
  const classes = useStyles(props)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(true)

  //['Progress', 'Notifications','Display Options', 'Verify Email', 'Reset Password', 'About', 'Log Out']
  const elements = [
    ['Progress', <ProgressScreen />],
    ['Notifications', <NotificationsScreen />],
    ['Display Options', <DisplayScreen />],
    ['Verify Email', <VerifyEmailScreen />],
    ['Reset Password', <PasswordResetScreen />],
    ['About', <AboutScreen />],
    ['Log Out', <LogoutScreen />],
    ['Help', <HelpScreen />],
    ['Change Display Name', <ChangeDisplayName />],
  ]
  type DisplayFunction = () => JSX.Element

  // Using a function as state
  // https://stackoverflow.com/a/55621679

  return (
    <div className={classes.componentContainer}>
      {/* {menuOpen ? <div className={classes.settingsHeader}>Settings</div> : null} */}
      {!menuOpen ? (
        <div style = {{display: 'flex', flexDirection:'row'}}>
          <ArrowBackIosIcon
            className={classes.ArrowBackIcon}
            onClick={() => {
              setMenuOpen(true)
              navigate(-1)
            }}
          />
          <div style = {{color: '#007AFF'}}>Settings</div>
        </div>
      ) : null}
      {menuOpen ? (
        <div className={classes.menuContainer}>
          {elements.map((component: String | any, idx) => {
            console.log(component[0].toLowerCase().replaceAll(' ', '-'))
            return (
              <div className={classes.menuBar} key={idx}>
                <div
                  className={classes.tool}
                  onClick={() => {
                    navigate(`/settings/${component[0].toLowerCase().replaceAll(' ', '-')}`)
                  
                    setMenuOpen(false)
                  }}
                >
                  <Toolbar style={{ color: 'white' }}>
                    <div>{component[0]}</div>
                  </Toolbar>
                </div>
                <ArrowForwardIosIcon
                  style={{ position: 'relative', top: '17px', color: 'white' }}
                />
              </div>
            )
          })}
        </div>
      ) : null}
      {!menuOpen ? <Outlet /> : null}
    </div>
  )
}
