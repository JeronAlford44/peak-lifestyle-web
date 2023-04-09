import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import PressedHomeButton from './Home/HomeScreen'
import PressedChatButton from './Chat/ChatScreen'
import PressedSettingsButton from './Settings/SettingsScreen'

const Tab = createBottomTabNavigator()

const homeIcon = {
  name: 'homeIcon',
  uri: 'http://cdn.onlinewebfonts.com/svg/img_323101.png',
}
const chatIcon = {
  name: 'chatIcon',
  uri: 'https://icons.veryicon.com/png/o/miscellaneous/fs-icon/live-chat.png',
}
const settingsIcon = {
  name: 'settingsIcon',
  uri: 'https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png',
}

// interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const MainLayout = (props) => {
  

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveBackgroundColor: '#F8AFA6',

        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let image
          if (route.name === 'Home') {
            image = homeIcon.uri
          }
          if (route.name === 'Chat') {
            image = chatIcon.uri
          }
          if (route.name === 'Settings') {
            image = settingsIcon.uri
          }
          return (
            <img alt="icon" src={`${image}`} style={{ width: 20, height: 20, color: 'black' }} />
          )
        },
        tabBarLabelStyle: {
          color: 'black',
        },
      })}
    >
      <Tab.Screen name="Home" component={PressedHomeButton} />
      <Tab.Screen name="Chat" component={PressedChatButton} />
      <Tab.Screen name="Settings" component={PressedSettingsButton} />
    </Tab.Navigator>
  )
}

export {MainLayout}
