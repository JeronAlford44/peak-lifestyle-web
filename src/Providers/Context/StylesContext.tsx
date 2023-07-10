import { ThemeOptions, makeStyles } from '@material-ui/core'
import React, { createContext, useEffect } from 'react'



export const StylesContext = createContext(null)



const StylesContextProvider = (props: { children: React.ReactElement | any }) => {

  const [isLightMode, setIsLightMode] = React.useState<boolean>(true)

  const toggleLightMode = (type: string) => {
    setIsLightMode(state => !state)
  }
  const globalStyles = makeStyles(theme => ({
    root: { backgroundColor: isLightMode ? '#aa00ff' : 'white' },
    authContainer: {
      backgroundColor: isLightMode ? '#aa00ff' : 'white',
    },
    authButtons: {
      marginBottom: '2vh',
      backgroundColor: isLightMode ? '#f73378' : 'white',
      color: isLightMode ? 'white' : 'black',
      borderColor: isLightMode ? 'white' : 'black',
      borderStyle: 'solid',
      width: '75%',
    },
  }))
  const themeOptions: ThemeOptions = {
    palette: {
      
      primary: {
        main: isLightMode ? '#ab47bc' : 'white',
      },
      secondary: {
        main: isLightMode ? '#ff4081' : 'white',
      },
    },
  }

  return (

    <StylesContext.Provider value={{ themeOptions, isLightMode, globalStyles, toggleLightMode}}>
      {props.children}
    </StylesContext.Provider>

  )
}
export default StylesContextProvider
