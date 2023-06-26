import React, { createContext } from "react"


export const UserProfileContext = createContext(null)
interface UserDataType {
    //ProgressPage
    SignInStreak: Number,
  
  //SettingsPage
    //Profile
      Name: String
      Email: String
      ProfileImgUrl: String
      Age: Number
      Weight: Number
      Height: Number
      ReasonForJoining: String
      RegisterDate: String
    
  
}
export const UserDataDefault: UserDataType = {
  //ProgressPage
  SignInStreak: 0,

  //SettingsPage
  //Profile
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

const UserProfileContextProvider = (props: { children: React.ReactElement | any }) => {
  const [userData, setUserData] = React.useState(UserDataDefault)

  const toggleItemState = (

    //TAKES IN 1 or AT MOST 2 ARGUMENTS, THE ITEM TO TOGGLE AND THE NEW VALUE WITHIN THE userDATA OBJECT
    //DATA IS UPDATED WITH FIRESTORE in LOGIN.tsx to grab the data assocaited with the user email
    item: string,
    newValue: Number | String | UserDataType | object
  ): void => {
    const Value = newValue || null
    try {
      if (Value == null) {
        setUserData((prevState: any) => {
          return {
            ...prevState,
            [item]: !prevState[item],
          }
        })
      } else {
        if (item === 'All' && typeof newValue === 'object') {
          setUserData(newValue as UserDataType) // Type assertion
        } else {
          setUserData((prevState: any) => {
            return {
              ...prevState,
              [item]: Value,
            }
          })
        }
      }
      console.log('All', userData)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <UserProfileContext.Provider value={{ userData, toggleItemState }}>
      {props.children}
    </UserProfileContext.Provider>
  )
}
export default UserProfileContextProvider
