import { Outlet } from 'react-router-dom'
import UserProfileContextProvider from './Context/UserProfileContext'

export default function UserProfileProvider() {
  return (
    <UserProfileContextProvider>
      <Outlet />
    </UserProfileContextProvider>
  )
}
