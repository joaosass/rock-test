import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: theme.roundness,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default styles;
