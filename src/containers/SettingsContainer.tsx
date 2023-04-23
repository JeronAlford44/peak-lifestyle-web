import * as React from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

import AboutScreen from '../MainPage/Settings/components/About'
import ProgressScreen from '../MainPage/Settings/components/Progress'
import NotificationsScreen from '../MainPage/Settings/components/Notifications'
import VerifyEmailScreen from '../MainPage/Settings/components/VerifyEmail'
import PasswordResetScreen from '../MainPage/Settings/components/PasswordReset'
import HelpScreen from '../MainPage/Settings/components/Help'
import LogoutScreen from '../MainPage/Settings/components/Logout'
import DisplayScreen from '../MainPage/Settings/components/Display'

import { Tab, makeStyles } from '@material-ui/core'
import Tabs from '@material-ui/core'
import { Stack } from '@mui/material'
import { useNavigate, useNavigation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
      
    },
    tool: {
      backgroundColor: 'transparent',
      // borderColor: 'black ',
      // borderWidth: 1,
      // borderBottomStyle: 'solid',
      
      alignSelf: 'center',
      alignItems: 'center',
      width: '80vw',
     
      

      
      opacity: '100'
    },
    ArrowBackIcon: {
      color: 'blue',
      width: '50px',
      height: '50px',
      borderBottomColor: 'blue',
      borderBottomStyle: 'solid'

    },
    componentContainer: {
      display: 'flex', 
      flexDirection: 'column',
      width: '90vw',
      height: '83vh',
      backgroundColor: 'white'

    },
    settingsHeader: {
alignSelf: 'center',
fontWeight: 'bold',
fontSize: '32px',
color: 'white'
    },
    menuBar: {
      display: 'flex', 
      flexDirection: 'row',
      borderColor: 'grey',
      borderRadius: '16px',
      borderStyle: 'solid',
      width: '80vw',
      marginTop: '5px',
      backgroundColor: '#680747'
    }
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
    ['Change Display Name', <ChangeDisplayName/>]
  ]
  type DisplayFunction = () => JSX.Element

  // Using a function as state
  // https://stackoverflow.com/a/55621679
  const [selected, setSelected] = React.useState<DisplayFunction>(() =>  {
    return <AboutScreen />
  })
  const [currComponent, setCurrComponent] = useState('About Test')

  return (
    <div className = {classes.componentContainer}>
      {menuOpen ? <div className={classes.settingsHeader}>Settings</div>: null}
      {!menuOpen ? <ArrowBackIcon className={classes.ArrowBackIcon}
      onClick= {()=> {
        setMenuOpen(true)
        navigate(-1)
        
      }}
      
      
      
      />: null}
      {menuOpen? (
      <div className={classes.menuContainer}>
        {elements.map((component: String | any, idx) => {
          console.log(component[0].toLowerCase().replaceAll(' ', '-'))
          return (
            <div className = {classes.menuBar}>
            <div
              className={classes.tool}
              onClick={() => {
                navigate(`/settings/${component[0].toLowerCase().replaceAll(' ', '-')}`)
                console.log('checked')
                console.log('menuopen:',menuOpen)
                setMenuOpen(false)
                
              }}
            >
              <Toolbar style={{ color: 'white' }}>
                <text>{component[0]}</text>
              </Toolbar>
            </div>
            <ArrowForwardIosIcon style = {{position: 'relative', top: '17px', color: 'white'}}/>
            </div>
          )
        })}
       
      </div>): null}
      {!menuOpen? <Outlet /> : null}
    </div>
  )
}
