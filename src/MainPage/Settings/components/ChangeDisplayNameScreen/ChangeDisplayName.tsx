import { makeStyles } from '@material-ui/core'
import * as React from 'react'
import { useState } from 'react'
import { Auth } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { UserProfileContext } from '../../../../Providers/Context/UserProfileContext'

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      margin: theme.spacing(3),
      backgroundColor: '#680747',
      zIndex: 1,
      width: '95vw',
      height: '90vh',
    },

    formLayout: {
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column'
    //   backgroundColor: 'black'
    },
    nameInput: {
        borderColor: 'transparent',
        backgroundColor: 'grey',
        width: '60vw'
        
    },
    nameSection: {
        borderRadius: '32px',
        backgroundColor: '#680747',
        marginBottom: '10vh',
        padding: '5vw',
        width: '80vw'

    }
  }),
  { name: 'ChangeDisplayName' }
)

export default function ChangeDisplayName() {
  const classes = useStyles()
  const [newName, setNewName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()
  const {userData, toggleItemState} = React.useContext(UserProfileContext)

  const handleUserNameUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: newName
      }).then(()=> {
         // update the display name in state
      toggleItemState('Name', newName)
      
      // window.location.reload()
     
      // navigate('/settings/change-display-name')
      })
      
    } catch (error) {
      alert(error)
      
      // ...
    }
  }
  
  
  
  React.useEffect(() => {
    setDisplayName(auth.currentUser.displayName) // initialize the display name in state
  }, [auth.currentUser])

  return (
    <div className={classes.formLayout}>
      <div className = {classes.nameSection}>
        <div style={{color:'white', marginBottom: '20px'}}>Current Display Name</div>
        <div style={{color:'white'}}>{displayName}</div>
      </div>
      <div className={classes.nameSection}>
        <div style={{color:'white', marginBottom: '20px'}}>New Display Name</div>
        <input
          style={{color:'black', backgroundColor: 'white'}}
          className={classes.nameInput}
          placeholder="Enter new display name here"
          value={newName} // bind the input field to state
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <button onClick={handleUserNameUpdate}>Submit</button>
    </div>
  )
}
