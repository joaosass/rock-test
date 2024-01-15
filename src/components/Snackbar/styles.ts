import {StyleSheet} from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  errorSnackbar: {
    backgroundColor: theme.colors.error,
  },
  successSnackbar: {
    backgroundColor: theme.colors.primary,
  },
  transparentSnackbar: {
    backgroundColor: 'transparent',
  },
});

export default styles;
