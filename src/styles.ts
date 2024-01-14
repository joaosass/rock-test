import {StyleSheet} from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  backgroundAccent: {
    backgroundColor: theme.colors.primary,
  },
  container: {
    justifyContent: 'center',
    padding: 48,
    gap: 56,
  },
  fullScreen: {
    flex: 1,
  },
  inputsContainer: {
    gap: 16,
  },
  roundContainer: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    gap: 24,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default styles;
