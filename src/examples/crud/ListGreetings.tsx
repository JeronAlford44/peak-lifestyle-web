/**
 * https://v4.mui.com/components/tables/#basic-table
 */
import { makeStyles } from '@material-ui/core/styles'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbh } from '../../firebaseConfig'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
  },

  table: {
    minWidth: 650,
  },
})

console.log('LIST')

export const ListGreetings = () => {
  const classes = useStyles()

  const [greetings, setGreetings] = useState([])

  useEffect(() => {
    console.log('HELLO')
    const retrieveData = async () => {
      const coll = collection(dbh, 'greetings')
      const querySnapshot = await getDocs(coll)

      const newGreetings = []
      querySnapshot.forEach(async doc => {
        console.log(doc.id, ' => ', doc)
        const data = doc.data()

        const item = {
          id: doc.id,
          text: data.text,
        }
        newGreetings.push(item)

        // const greetingColl = collection(dbh, 'greetings', doc.id)
      })

      setGreetings(newGreetings)
    }

    retrieveData()
  }, [])

  return (
    <div className={classes.root}>
      LIST GOES HERE
      {greetings.map((item, index) => {
        return <div key={index}>{item.text}</div>
      })}
    </div>
  )
}
