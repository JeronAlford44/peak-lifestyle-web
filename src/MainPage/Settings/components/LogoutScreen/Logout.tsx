import { signOut } from "firebase/auth"
import { auth } from "../../../../firebaseConfig"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { SettingsMenuContext } from "../../../../Providers/Context/SettingsContext"

 
export function LogoutScreen() {
    const {isMenuOpen, toggleMenu} = useContext(SettingsMenuContext)
  const navigate = useNavigate()
  

  useEffect(() => {
    const logoutIntent = confirm('Are you sure you want to log out?')

    const logout = async () => {
      if (logoutIntent) {
        await signOut(auth)
        navigate('../../../auth/login')
      } else {
        toggleMenu()
      }
    }

    logout()
  }, [navigate])

  return <div>Logout Screen</div>
}

export default LogoutScreen
