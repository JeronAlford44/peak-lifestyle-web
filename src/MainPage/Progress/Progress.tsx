import { makeStyles } from '@material-ui/core'
import { Auth, getAuth } from 'firebase/auth'

const useStyles = makeStyles(
  theme => ({
    root: { backgroundColor: '', overflow: 'scroll' },
    menuContainer: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      marginTop: '5vh',
    },
    tool: {
      backgroundColor: 'white !important',
      borderColor: 'black ',
      borderWidth: 1,
      borderBottomStyle: 'solid',

      opacity: '100',
    },
    ArrowBackIcon: {
      color: '#1a0dab',
      width: '50px',
      height: '50px',
      borderBottomColor: '#1a0dab',
      borderBottomStyle: 'solid',
    },
    componentContainer: {
      display: 'flex',
      // position: 'absolute',
      flexDirection: 'column',
      width: '90vw',
      height: '82vh',
      backgroundColor: 'white',
    },
    settingsHeader: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: '32px',
    },
  }),
  { name: 'Home' }
)
const ProgressScreen = () => {
  const auth = getAuth()
  const classes = useStyles()
  return (
    <div className={classes.root}>
    
      <div className={classes.componentContainer}>
        <div style = {{color: 'black'}}>
          Welcome {auth.currentUser.displayName ? auth.currentUser.displayName.split(' ')[0] : null}
          !
        </div>
      </div>
    </div>
  )
}
export default ProgressScreen
