import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeIcon from '@mui/icons-material/Home'
import ChatIcon from '@mui/icons-material/Chat'
import SettingsIcon from '@mui/icons-material/Settings'
import * as React from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { auth } from '../firebaseConfig'

// createStyles (old) vs makeStyles (new)
// https://smartdevpreneur.com/material-ui-makestyles-usestyles-createstyles-and-withstyles-explained/
const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      margin: theme.spacing(3),
    },
    nav: {
      position: 'absolute',
      top: '90vh',
      width: '90vw',
      backgroundColor: 'transparent',
      zIndex: 1,
    },
    bottomNav: {
      color: 'grey !important',
      '& .Mui-selected': {
        borderBottom: '2px solid grey',
      },
    },
  }),
  { name: 'App' }
)

const AppContainer = (props: any) => {
  const navigate = useNavigate()
  const classes = useStyles(props)
  const [value, setValue] = React.useState(0)
  const handlePathName = () => {
    const loc = useLocation().pathname.replace('/', '').toUpperCase()
  
    if (loc == 'SETTINGS/MENU'){
      return 'SETTINGS'
    }
    else if (loc.startsWith('SETTINGS/MENU/')) {
      return useLocation()
        .pathname.replace('/', '')
        .toUpperCase()
        .replace('SETTINGS/MENU/', '')
        .replaceAll('-', ' ')
    }
    return loc
  }
  React.useEffect(() => {
    if (auth.currentUser == null) {
      alert('You have been signed out. Please log in again to continue')
      navigate('/auth/login')
    }
  }, [handlePathName()])

  return (
    <div className={classes.root}>
      <div
        style={{
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'grey !important',
          borderStyle: 'solid',
          marginBottom: '2vh',
          color: 'grey',

          textAlign: 'center',
          // background: 'linear-gradient(90deg, #B2BEB5 30%, #A9A9A9 90%)',
        }}
      >
        {handlePathName()}
      </div>

      <Outlet />
      <BottomNavigation
        className={classes.nav}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue)
          setValue(newValue)
        }}
      >
        {/* onClick={handleClick} color={flag ? "green" : "red"} */}
        <BottomNavigationAction
          label="Progress"
          icon={<AutorenewIcon />}
          onClick={() => {
            navigate('/progress')
          }}
          className={classes.bottomNav}
        />
        <BottomNavigationAction
          label="Chat"
          icon={<ChatIcon />}
          onClick={() => {
            navigate('/chat')
          }}
          className={classes.bottomNav}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon />}
          onClick={() => {
            navigate('/settings/menu')
          }}
          className={classes.bottomNav}
        />
      </BottomNavigation>
    </div>
  )
}

export default AppContainer
