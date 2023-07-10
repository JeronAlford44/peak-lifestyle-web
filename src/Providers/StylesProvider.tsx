import { Outlet } from 'react-router-dom'

import StylesContextProvider from './Context/StylesContext'

export default function StylesProvider() {
  return (
    <StylesContextProvider>
      <Outlet />
    </StylesContextProvider>
  )
}
