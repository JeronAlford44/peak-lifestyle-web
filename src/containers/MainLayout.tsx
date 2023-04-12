import { makeStyles } from '@material-ui/core'

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
    ButtonsContainer: {
display: 'flex',
flexDirection: 'row',
position: 'absolute',
bottom: 100,
alignItems: 'center'
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
}
    
  }),
  { name: 'App' }
)
const homeIcon = {
    name: 'homeIcon',
    uri: 'http://cdn.onlinewebfonts.com/svg/img_323101.png',
  }
  const chatIcon = {
    name: 'chatIcon',
    uri: 'https://icons.veryicon.com/png/o/miscellaneous/fs-icon/live-chat.png',
  }
  const settingsIcon = {
    name: 'settingsIcon',
    uri: 'https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png',
  }

const MainLayout = props => {
    const classes = useStyles(props)
    return(
  <div className={classes.ButtonsContainer}>
    <button className={classes.buttonComponents} onClick = {null}>
        <img className={classes.imageSize}alt = 'home' src = {homeIcon.uri}/>
      <text>Home</text>
    </button>

    <button className={classes.buttonComponents}>
    <img className={classes.imageSize} alt = 'chat' src = {chatIcon.uri}/>
      <text>Chat</text>
    </button>
    <button className={classes.buttonComponents} >
    <img className={classes.imageSize} alt = 'settings' src = {settingsIcon.uri}/>
      <text>Settings</text>
    </button>
  </div>
    )
}

export default MainLayout
