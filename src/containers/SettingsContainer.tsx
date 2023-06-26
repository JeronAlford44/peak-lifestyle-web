import * as React from 'react'
import { useState } from 'react'

import Toolbar from '@mui/material/Toolbar'

import AboutScreen from '../MainPage/Settings/components/AboutScreen/About'
import ProgressScreen from '../MainPage/Settings/components/ProfileScreen/Profile'
import NotificationsScreen from '../MainPage/Settings/components/NotificationsScreen/Notifications'
import VerifyEmailScreen from '../MainPage/Settings/components/VerifyEmailScreen/VerifyEmail'
import PasswordResetScreen from '../MainPage/Settings/components/PasswordResetScreen/PasswordReset'
import HelpScreen from '../MainPage/Settings/components/HelpScreen/Help'
import LogoutScreen from '../MainPage/Settings/components/LogoutScreen/Logout'
import DisplayScreen from '../MainPage/Settings/components/DisplayScreen/Display'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { makeStyles } from '@material-ui/core'

import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ChangeDisplayName from '../MainPage/Settings/components/ChangeDisplayNameScreen/ChangeDisplayName'
import { auth } from '../firebaseConfig'
import { SettingsMenuContext,} from '../Providers/Context/SettingsContext'



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
      // borderRadius: '16px',
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
      height: '80vh',
      backgroundColor: 'white',
      overflow: 'scroll',
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
      borderColor: 'white',
      borderLeftColor: 'transparent',
      // borderRadius: '16px',
      // borderTopLeftRadius: '0px',
      // borderBottomLeftRadius: '0px',
      borderStyle: 'solid',
      width: '80vw',
      borderBottomColor: 'transparent',
      // backgroundColor: '#d1d2d1',
    },
  }),
  { name: 'Settings' }
)

export default function SettingsContainer(props) {
  const classes = useStyles(props)
  const navigate = useNavigate()
  const {isMenuOpen, toggleMenu} = React.useContext(SettingsMenuContext)
   React.useEffect(() => {
     !isMenuOpen?  toggleMenu(): null
  
   }, [])
  

  //['Progress', 'Notifications','Display Options', 'Verify Email', 'Reset Password', 'About', 'Log Out']
  const elements = [
    'Profile',
    'Display Options',
    'Help',
    'About',
    'Notifications',
    'Change Display Name',
    !auth.currentUser.emailVerified ? 'Verify Email' : null,
    'Reset Password',
    'Log Out',
  ]

  // Using a function as state
  // https://stackoverflow.com/a/55621679

  return (
  
      <div className={classes.componentContainer}>
        {/* {menuOpen ? <div className={classes.settingsHeader}>Settings</div> : null} */}
        {!isMenuOpen ? (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ArrowBackIosIcon
              className={classes.ArrowBackIcon}
              onClick={() => {
                toggleMenu()
                navigate(-1)
                
              }}
            />
            <div style={{ color: '#007AFF' }}>Settings</div>
          </div>
        ) : null}
        {isMenuOpen? (
          <div className={classes.menuContainer}>
            <div
              style={{
                borderRadius: '16px',
                marginBottom: '5vh',

                backgroundColor: '#f2f2f2',
              }}
            >
              {elements.slice(0, 4).map((component: String | any, idx) => {
                if (component != null) {
                  // console.log(component.toLowerCase().replaceAll(' ', '-'))
                  return (
                    <div className={classes.menuBar} key={idx}>
                      <div
                        className={classes.tool}
                        onClick={() => {
                          navigate(`/settings/menu/${component.toLowerCase().replaceAll(' ', '-')}`)

                          toggleMenu()
                        }}
                      >
                        <Toolbar style={{ color: 'black' }}>
                          <div>{component}</div>
                        </Toolbar>
                      </div>
                      <ArrowForwardIosIcon
                        style={{ position: 'relative', top: '17px', color: 'black' }}
                      />
                    </div>
                  )
                }
              })}
            </div>

            <div>
              <div
                style={{
                  borderRadius: '16px',

                  backgroundColor: '#f2f2f2',
                }}
              >
                {elements.slice(4).map((component: String | any, idx) => {
                  // console.log(component.toLowerCase().replaceAll(' ', '-'))
                  if (component != null) {
                    return (
                      <div className={classes.menuBar} key={idx}>
                        <div
                          className={classes.tool}
                          onClick={() => {
                            navigate(
                              `/settings/menu/${component.toLowerCase().replaceAll(' ', '-')}`
                            )

                            toggleMenu()
                          }}
                        >
                          <Toolbar style={{ color: 'black' }}>
                            <div>{component}</div>
                          </Toolbar>
                        </div>
                        <ArrowForwardIosIcon
                          style={{ position: 'relative', top: '17px', color: 'black' }}
                        />
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        ) : null}
        {!isMenuOpen ? <Outlet /> : null}
      </div>

  )
}
