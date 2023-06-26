import { useContext, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { app } from '../../../../../firebaseConfig'
import { UserProfileContext } from '../../../../../Providers/Context/UserProfileContext'

const ProfileImageUpload = () => {
  const storage = getStorage(app)


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
            .then(url => {
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
      
      <input
        style={{ color: 'black' }}
        placeholder="Upload Image Here"
        type="file"
        onChange={handleFileSelected}
        
      />
    </div>
  )
}

export default ProfileImageUpload
