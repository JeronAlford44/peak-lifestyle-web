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
  }),
  { name: 'App' }
)

const App = (props: object) => {
  const classes = useStyles(props)

  return <section className={classes.root}>HELLO</section>
}

export default App
