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

import AboutScreen from './components/About'
import ProgressScreen from './components/Progress'
import NotificationsScreen from './components/Notifications'
import VerifyEmailScreen from './components/VerifyEmail'
import PasswordResetScreen from './components/PasswordReset'
import HelpScreen from './components/Help'
import LogoutScreen from './components/Logout'
import DisplayScreen from './components/Display'

import { makeStyles } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles(
  theme => ({
    root: {},
  }),
  { name: 'Settings' }
)

export default function Settings(props) {
  const classes = useStyles(props)

  //['Progress', 'Notifications','Display Options', 'Verify Email', 'Reset Password', 'About', 'Log Out']
  const elements = [
    ['Progress', <ProgressScreen />],
    ['Notifications', <NotificationsScreen />],
    ['Display', <DisplayScreen />],
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
    <Box sx={{ display: 'flex' }} className={classes.root}>
      <CssBaseline />
      <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {elements.map((component, index) => {
            // debugger
            console.log(component[1])

            return (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  // setSelected(component[1])
                  // setCurrComponent(component[0])
                  console.log(component[0])
                }}
              >
                <ListItemButton style={{ marginBottom: '50px' }}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={component[0]} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />

        <AboutScreen />
      </Box>
    </Box>
  )
}
