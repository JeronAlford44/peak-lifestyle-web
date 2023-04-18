import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

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
      backgroundColor: '#F79489'
    },
    ButtonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      bottom: 100,
      alignItems: 'center',
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
    },
    inputContainer: {
      display: 'flex',
      margin: '50px',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20vh',
      flexDirection: 'column'
      
    },
    inputBar: {
    padding: '10px',
    fontSize: '32px',
    fontFamily: 'Courier',
      borderColor: "#861388",
      borderWidth: '5px',
      borderRadius: '32px',
      marginBottom: '10vh'
    }
  }),
  { name: 'App' }
)

const AuthContainer = () => {
  const classes = useStyles()
  return(  
    
    <div >
        <div >Header2</div>
        <Outlet/>

    </div>

  )
}

export default AuthContainer
