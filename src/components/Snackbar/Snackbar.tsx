import React from 'react';
import {Portal, Snackbar} from 'react-native-paper';
import useSnackbar from './useSnackbar';

function SnackbarComponent(): React.JSX.Element {
  const {isVisible, message, typeStyle, typeButtonStyle, handleClose} =
    useSnackbar();

  return (
    <Portal>
      <Snackbar
        duration={5000}
        action={{label: 'Fechar', textColor: typeButtonStyle}}
        visible={isVisible}
        onDismiss={handleClose}
        style={typeStyle}>
        {message}
      </Snackbar>
    </Portal>
  );
}

export default SnackbarComponent;
