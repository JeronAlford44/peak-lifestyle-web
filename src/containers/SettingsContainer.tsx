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

import { makeStyles } from '@material-ui/core'
import { Stack } from '@mui/material'
import { useNavigate, useNavigation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

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
      backgroundColor: 'white',
      borderBottomColor: 'black ',
      borderWidth: 4,
      borderBottomStyle: 'solid',
    },
  }),
  { name: 'Settings' }
)

export default function SettingsContainer(props) {
  const classes = useStyles(props)
  const navigate = useNavigate()

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
  ]
  type DisplayFunction = () => JSX.Element

  // Using a function as state
  // https://stackoverflow.com/a/55621679
  const [selected, setSelected] = React.useState<DisplayFunction>(() => () => {
    return <AboutScreen />
  })
  const [currComponent, setCurrComponent] = useState('About Test')

  return (
    <div>
      <Stack className={classes.menuContainer}>
        {elements.map((component: String | any, idx) => {
          console.log(component[0].toLowerCase().replace(' ', '-'))
          return (
            <div
              className={classes.tool}
              onClick={() => {
                navigate(`/${component[0].toLowerCase().replace(' ', '-')}`)
                console.log('checked')
              }}
            >
              <Toolbar style={{ color: 'black' }}>
                <text>{component[0]}</text>
              </Toolbar>
            </div>
          )
        })}
      </Stack>
      <Outlet />
    </div>
  )
}
