import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from './screens/launch_screen';
import SignInScreen from './screens/signin_screen';
import SignUpScreen from './screens/signup_screen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeDashboard from './screens/home_dashboard';
import StepTrackerScreen from './screens/Step_Tracker_Screen';
import AllHealthDataScreen from './screens/All_Health_Data_Screen';
import SleepTracker from './screens/Sleep_Tracker';
import CycleTracker from './screens/Cycle_Tracker';
import NutritionTracker from './screens/Nutrition_Tracker';
import SharingScreen from './screens/Sharing_Screen';
import ExploreScreen from './screens/Explore_Screen';
import { UserProvider } from './context/UserContext';
import AdminDashboard from './screens/AdminDashboard';
import UserDetail from './screens/UserDetail';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LaunchScreen">
          <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeDashboard" component={HomeDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="StepTrackerScreen" component={StepTrackerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AllHealthDataScreen" component={AllHealthDataScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SleepTracker" component={SleepTracker} options={{ headerShown: false }} />
          <Stack.Screen name="CycleTracker" component={CycleTracker} options={{
            headerShown: false
          }} />
          <Stack.Screen name="NutritionTracker" component={NutritionTracker} options={{ headerShown: false }} />
          <Stack.Screen name="SharingScreen" component={SharingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="UserDetail" component={UserDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
