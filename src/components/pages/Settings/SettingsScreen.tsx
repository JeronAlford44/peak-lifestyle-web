import 'react-native-gesture-handler';
import { makeStyles } from '@material-ui/core/styles';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GeneralSettings from './components/General';
import DisplaySettings from './components/Display';
import NotificationsSettings from './components/Notifications';
import AboutSettings from './components/About';
import LogoutSettings from './components/Logout';

const Drawer = createDrawerNavigator();
const useStyles = makeStyles(
    theme => ({
      root: {
        fontWeight: 'bold',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
      },
  
      content: {
        color: 'red',
        fontWeight: 'bold',
        margin: '5rem',
      },
      black: {
        color: 'black'
      }
    }),
    { name: 'App' }
  )
const PressedSettingsButton = () =>{
 return (<Drawer.Navigator> 
<Drawer.Screen name="General" component={GeneralSettings} />
<Drawer.Screen name="Display" component={DisplaySettings} />
<Drawer.Screen name="Notifications" component={NotificationsSettings} />
<Drawer.Screen name="About" component={AboutSettings} />
<Drawer.Screen name="Log Out" component={LogoutSettings} />

 </Drawer.Navigator>)
}
export default PressedSettingsButton