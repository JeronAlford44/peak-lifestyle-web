import { makeStyles } from '@material-ui/core/styles';
import { Dimensions } from 'react-native/types';
const useStyles = makeStyles(
    theme => ({
      root: {
        fontWeight: 'bold',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
      },
  
      content: {
        color: 'red',
        fontWeight: 'bold',
        margin: '5rem',
      },
      black: {
        color: 'black'
      },
      homeContainer: {
        position: 'absolute',
    
        top: 125,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 125,
        backgroundColor: 'white',
        color: 'black',
        zIndex: 2,
      },
    
      homeContainerText: {
        color: 'black',
      },
    }),
    
    { name: 'App' }
  )
const PressedHomeButton = () => {
    // const {showHome} = props
    const classes = useStyles();
  
    return (
      <div className={classes.homeContainer}>
        <text className={classes.homeContainerText}>Here will display some user information and possible To-DO list design </text>
        {/* <Home_Layout/> */}
      </div>
    )
  }
  
  export default PressedHomeButton;