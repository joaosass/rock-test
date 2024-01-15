import React from 'react';
import {View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';

import {default as globalStyles} from '../../styles';

import styles from './styles';
import useModal from './useModal';

function ModalComponent(): React.JSX.Element {
  const {isLoading, isModalVisible, handleClose, handleDeleteRock} = useModal();

  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={handleClose}
        contentContainerStyle={styles.content}>
        <Text variant="bodyLarge" style={globalStyles.title}>
          Deseja mesmo excluir esta pedra?
        </Text>
        <View style={styles.buttonsContainer}>
          <Button onPress={handleClose}>Cancelar</Button>
          <Button
            disabled={isLoading}
            mode="contained"
            onPress={handleDeleteRock}>
            {isLoading ? <ActivityIndicator /> : 'Excluir'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

export default ModalComponent;
