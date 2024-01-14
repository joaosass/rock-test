import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import React from 'react';
import {Amplify} from 'aws-amplify';
import config from './amplifyconfiguration.json';

import ConfirmationCode from './screens/ConfirmationCode';
import CreateUser from './screens/CreateUser';
import Home from './screens/Home';
import Login from './screens/Login';
import theme from './theme';

export type RootStackParamList = {
  ConfirmationCode: undefined;
  CreateUser: undefined;
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

Amplify.configure(config);

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
          <Stack.Screen name="CreateUser" component={CreateUser} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
