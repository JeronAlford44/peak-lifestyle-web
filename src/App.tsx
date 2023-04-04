import React from 'react'
import logo from './logo.svg'
import './App.css'

import { makeStyles } from '@material-ui/core/styles'

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
  }),
  { name: 'App' }
)

const App = (props: object) => {
  const classes = useStyles(props)

  return (
    <div>
      <div className={classes.root}>HELLO2</div>
      <div className={classes.content}>WORLDM</div>
    </div>
  )
}

export default App
