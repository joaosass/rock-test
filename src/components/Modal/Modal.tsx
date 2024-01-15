import React from 'react';
import {View} from 'react-native';
import {Button as ButtonPaper, Modal, Portal, Text} from 'react-native-paper';

import {default as globalStyles} from '../../styles';

import styles from './styles';
import useModal from './useModal';
import Button from '../Button';

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
          <ButtonPaper onPress={handleClose}>Cancelar</ButtonPaper>
          <Button
            isLoading={isLoading}
            text="Excluir"
            onPress={handleDeleteRock}
          />
        </View>
      </Modal>
    </Portal>
  );
}

export default ModalComponent;
