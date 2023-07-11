import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Box, makeStyles } from '@material-ui/core'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import HomeIcon from '@mui/icons-material/Home'
import ChatIcon from '@mui/icons-material/Chat'
import SettingsIcon from '@mui/icons-material/Settings'
import * as React from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { auth, dbh } from '../firebaseConfig'
import { UserProfileContext } from '../Providers/Context/UserProfileContext'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { StylesContext } from '../Providers/Context/StylesContext'
import { onAuthStateChanged } from 'firebase/auth'

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
      backgroundColor: 'black',
    },
    nav: {
      position: 'absolute',
      top: '92vh',
      width: '100vw',
      height: '8vh',
      
      zIndex: 1,
    },
    bottomNav: {
      color: 'white !important',
      '& .Mui-selected': {
        borderBottom: '2px solid white',
      },
    },
  }),
  { name: 'App' }
)

const AppContainer = (props: any) => {
  const { themeOptions, isLightMode, globalStyles, toggleLightMode } =
    React.useContext(StylesContext)
  const style = globalStyles()
  const navigate = useNavigate()
  const classes = useStyles(props)
  const [value, setValue] = React.useState(0)
  const { userData, toggleItemState } = React.useContext(UserProfileContext)
  const handlePathName = () => {
    const loc = useLocation().pathname.replace('/', '').toUpperCase()

    if (loc == 'SETTINGS/MENU') {
      return 'SETTINGS'
    } else if (loc.startsWith('SETTINGS/MENU/')) {
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
      window.location.reload()
    }
  }, [onAuthStateChanged])

  React.useEffect(() => {
    const userDocRef = doc(dbh, 'Users', auth.currentUser.uid)
    const userDocSnap = getDoc(userDocRef).then(snap => console.log(snap.data()))

    const userDocSnapUpdate = setDoc(userDocRef, userData)
  }, [userData])

  return (
    <div style={{color:'white'}}>
      <AppBar
      color='secondary'
        style={{
          
          borderBottomColor: 'white !important',
          borderStyle: 'solid',
          marginBottom: '1vh',
          padding: '1vh',
          color: 'White',

          textAlign: 'center',
          // background: 'linear-gradient(90deg, #B2BEB5 30%, #A9A9A9 90%)',
        }}
      >
        {handlePathName()}
      </AppBar>

      <Outlet />
      <AppBar position="fixed" color="secondary" className={classes.nav}>
        
        <BottomNavigation
          showLabels
          value={value}
  
      style={{backgroundColor: 'transparent'}}
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
      </AppBar>
    </div>
  )
}

export default AppContainer
