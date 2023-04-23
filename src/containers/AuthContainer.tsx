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
    },
    heartImage: {
      width: '200px',
      height: '200px',
      alignSelf: 'center',
     
    },
    logoText: {
      '-webkit-text-stroke': '2px #FADCD9',
  '-webkit-text-fill-color': '#F8AFA6',
  fontSize: '64px',
  
  alignSelf: 'center',
  
    },
    logoComponents: {
      display: 'flex',
      flexDirection: 'column'
    }
  }),
  { name: 'App' }
)

const AuthContainer = () => {
  const classes = useStyles()
  return(  
    
    <div >
        <div >Header2 test</div>
        <div className={classes.logoComponents}>
        <img src = 'https://static.vecteezy.com/system/resources/previews/008/505/848/original/medical-heart-illustration-png.png' className = {classes.heartImage}/>
        <text className={classes.logoText}>Peak Lifestyle</text>
        </div>
        <Outlet/>

    </div>

  )
}

export default AuthContainer
