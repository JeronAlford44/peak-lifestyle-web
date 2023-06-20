import React, { createContext, useState } from 'react'

// interface SettingsMenuContextProps {
//   isMenuOpen: boolean
//   setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
// }

// const toggleMenu = () => {

// }
// const SettingsMenuContext = createContext<SettingsMenuContextProps | any> (null)

// interface MenuProviderProps {
//   children: React.ReactNode
// }

// export const SettingsMenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const menuContextValue: SettingsMenuContextProps = {
//     isMenuOpen,
//     setIsMenuOpen,
//   }

//   return <SettingsMenuContext.Provider value={menuContextValue}>{children}</SettingsMenuContext.Provider>
// }

// export default SettingsMenuContext

export const SettingsMenuContext = createContext(null)

const SettingsMenuContextProvider = (props: { children: React.ReactElement | any }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true)

  const toggleMenu = () => {
    setIsMenuOpen(state => !state)
  }

  return (
    <SettingsMenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {props.children}
    </SettingsMenuContext.Provider>
  )
}
export default SettingsMenuContextProvider
