import { Outlet } from 'react-router-dom'
import SettingsContainer from '../containers/SettingsContainer'
import SettingsMenuContextProvider from './Context/SettingsContext'

export default function SettingsProvider() {
  return (
    <SettingsMenuContextProvider>
      <Outlet />
    </SettingsMenuContextProvider>
  )
}
