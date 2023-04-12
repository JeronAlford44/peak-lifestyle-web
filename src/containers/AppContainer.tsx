import { Outlet } from 'react-router-dom'
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
  }),
  { name: 'App' }
)

const AppContainer = (props: any) => {
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <div>HEADER</div>
      <Outlet />
    </div>
  )
}

export default AppContainer
