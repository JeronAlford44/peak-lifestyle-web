import React, { createContext, useEffect } from 'react'

export interface UserDataType {
  // ProgressPage
  SignInStreak: Number

  // SettingsPage
  // Profile
  Name: string
  Email: string
  ProfileImgUrl: string
  Age: Number
  Weight: Number
  Height: Number
  ReasonForJoining: string
  RegisterDate: string
}

export const UserDataDefault: UserDataType = {
  // ProgressPage

  
  SignInStreak: 0,

  // SettingsPage
  // Profile
  Name: '',
  Email: '',
  ProfileImgUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
  Age: 0,
  Weight: 0,
  Height: 0,
  ReasonForJoining: '',
  RegisterDate: '',
}

interface UserProfileContextType {
  userData: UserDataType
  toggleItemState: (item: string, newValue: Number | string | UserDataType | object) => void
}

export const UserProfileContext = createContext<UserProfileContextType | null>(null)

const UserProfileContextProvider = (props: { children: React.ReactElement | any }) => {
    
  const [userData, setUserData] = React.useState(UserDataDefault)
  useEffect(() => {console.log(userData)}, [userData])

  const toggleItemState = (
    item: string,
    newValue: Number | string | UserDataType | object
  ): void => {
    const Value = newValue || null
    try {
      if (Value == null) {
        setUserData((prevState: UserDataType) => {
          return {
            ...prevState,
            [item]: !prevState[item],
          }
        })
      } else {
        if (item === 'All' && typeof newValue === 'object') {
           
          setUserData(newValue as UserDataType) // Type assertion
        } else {
         
          setUserData((prevState: UserDataType) => {
            return {
              ...prevState,
              [item]: Value,
            }
          })
        }
      }
      console.log('All', userData)
    } catch (err) {
     alert(err)
    }
  }

  return (
    <UserProfileContext.Provider value={{ userData, toggleItemState }}>
      {props.children}
    </UserProfileContext.Provider>
  )
}

export default UserProfileContextProvider
