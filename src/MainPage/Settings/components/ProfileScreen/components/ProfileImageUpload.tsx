import { useContext, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { app, auth, dbh } from '../../../../../firebaseConfig'
import { UserProfileContext } from '../../../../../Providers/Context/UserProfileContext'
import { doc, updateDoc } from 'firebase/firestore'
import { Button } from '@material-ui/core'
import BackupIcon from '@mui/icons-material/Backup'

const ProfileImageUpload = () => {
  const storage = getStorage(app)
  const hiddenFileInput = useRef(null)
  const handleClick = () => {
    hiddenFileInput.current.click()
  }


  const [imageFile, setImageFile] = useState<File | null>(null)
  const { userData, toggleItemState } = useContext(UserProfileContext)

  const handleFileSelected = e => {
    const file = e.target.files[0]

    if (file) {
      const imageRef = ref(storage, 'ProfileImages/' + file.name)
      uploadBytes(imageRef, file)
        .then(snapshot => {
          console.log('File upload successful', snapshot)
          getDownloadURL(snapshot.ref)
            .then(async (url)=> {
                
              toggleItemState('ProfileImgUrl', url)
              console.log(userData)
            })
            .catch(error => {
              console.log('Error retrieving download URL:', error)
            })
        })
        .catch(error => {
          console.log('Error uploading file:', error)
        })
    }
  }

  return (
    <div>
      <Button variant="outlined" startIcon={<BackupIcon />} onClick={handleClick}>
        UPLOAD
      </Button>
      <input
        style={{ display: 'none', }}
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileSelected}
      />
    </div>
  )
}

export default ProfileImageUpload
