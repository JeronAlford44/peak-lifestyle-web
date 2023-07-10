import { Auth } from 'firebase/auth'
const domain = 'peak-lifestyle-web.firebaseapp.com'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'

import { sendEmailVerification } from 'firebase/auth'
import { useState } from 'react'

const auth = getAuth()
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  dynamicLinkDomain: 'example.page.link',
}
const VerifyEmailScreen = () => {
  const [emailVerified, setEmailVerified] = useState(false)
  return (
    <div>
      {!auth.currentUser.emailVerified ? (
        <div
          onClick={() => {
            
              console.log(auth.currentUser)
            

            sendEmailVerification(auth.currentUser)
              .then(() => {
                
                window.localStorage.setItem('emailForSignIn', auth.currentUser.email)
                setEmailVerified(true)
                alert("Verification Email Sent, Please check your inbox and spam folders")
                // ...
              })
              .catch(error => {
                const errorCode = alert(`Error: ${error.code}, Please try again later`)
                const errorMessage = alert(error.message)
                // ...
              })
          }}
        >
          Verify Email Test
        </div>
      ) : null}
      {auth.currentUser.emailVerified ? (
        <div>
          Thank you for verifying your email with us! {'\n'}
          There is nothing else that needs to be done here at the moment.
        </div>
      ) : null}
    </div>
  )
}
export default VerifyEmailScreen
