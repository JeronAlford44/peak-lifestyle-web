import {  makeStyles } from '@material-ui/core'
import { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { StylesContext } from '../Providers/Context/StylesContext'
import Box from '@mui/material/Box'

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
    },
    heartImage: {
      width: '40vw',
      height: '20vh',
      alignSelf: 'center',
     
    },
    logoText: {
      '-webkit-text-stroke': '2px #FADCD9',
  '-webkit-text-fill-color': '#F8AFA6',
  fontSize: '52px',
  
  alignSelf: 'center',
  
    },
    logoComponents: {
      marginTop: '5vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }),
  { name: 'App' }
)

const AuthContainer = () => {
  const classes = useStyles()
  const { themeOptions, isLightMode, globalStyles, toggleLightMode } = useContext(StylesContext)
  const style = globalStyles()
  return (
    <div className={style.authContainer}>
      
        <div className={classes.logoComponents}>
          <img
          color = 'secondary'
            src="https://static.vecteezy.com/system/resources/previews/008/505/848/original/medical-heart-illustration-png.png"
            className={classes.heartImage}
          />
          <div className={classes.logoText}>Peak Lifestyle</div>
        </div>
        <Outlet />
  
    </div>
  )
}

export default AuthContainer
