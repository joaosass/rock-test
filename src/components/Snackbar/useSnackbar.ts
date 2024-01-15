import useStore from '../../store';
import theme from '../../theme';
import styles from './styles';

const useSnackbar = () => {
  const {
    snackbar: {isVisible, message, type},
    setSnackbar,
  } = useStore();

  const handleClose = () => setSnackbar({isVisible: false});

  const typeButtonStyle =
    type === 'success' ? theme.colors.inversePrimary : '#fff';

  const typeStyle =
    type === 'success'
      ? styles.successSnackbar
      : type === 'error'
      ? styles.errorSnackbar
      : styles.transparentSnackbar;

  return {
    isVisible,
    message,
    handleClose,
    typeButtonStyle,
    typeStyle,
  };
};

export default useSnackbar;
