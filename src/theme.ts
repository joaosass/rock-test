import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    inversePrimary: '#212121',
    primary: '#1EC677',
    surfaceVariant: '#fff',
  },
};

export default theme;
