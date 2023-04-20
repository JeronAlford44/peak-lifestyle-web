import { Outlet, useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import * as React from 'react'

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
      top: '85vh',
      width: '90vw',
      backgroundColor: 'transparent'
      
    },
    bottomNav: {
      color: 'white !important',
      "& .Mui-selected": {
        borderBottom: "2px solid white"
      },
      
      
    }
  }),
  { name: 'App' }
)

const AppContainer = (props: any) => {
  const navigate = useNavigate()
  const classes = useStyles(props)
  const [value, setValue] = React.useState(0);
 
  
  

  return (
    <div className={classes.root}>
      <div>Root header</div>
      
      <Outlet />
      <BottomNavigation className={classes.nav}
  showLabels
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
>
  {/* onClick={handleClick} color={flag ? "green" : "red"} */}
  <BottomNavigationAction label="Home" icon={<HomeIcon/>} onClick={() => {navigate('/home')} } className = {classes.bottomNav} />
  <BottomNavigationAction label="Chat" icon={<ChatIcon/>} onClick={() => {navigate('/chat')} } className = {classes.bottomNav}/>
  <BottomNavigationAction label="Settings" icon={<SettingsIcon/>} onClick = {() => {navigate('/settings')}}className = {classes.bottomNav} />
</BottomNavigation>
    </div>
  )
}

export default AppContainer
