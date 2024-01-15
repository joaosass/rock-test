import {del} from 'aws-amplify/api';
import {useState} from 'react';

import {apiName, path} from '../../constants';
import useStore from '../../store';

const useModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    editingRock,
    isModalVisible,
    token,
    setEditingRock,
    setIsModalVisible,
    setRefetchListKey,
    setSnackbar,
  } = useStore();

  const handleClose = () => {
    setEditingRock();
    setIsModalVisible(false);
  };

  const handleDeleteRock = async () => {
    setIsLoading(true);
    try {
      const {response} = del({
        apiName,
        path: `${path}?id=${editingRock?.id || ''}`,
        options: {
          headers: {
            Authorization: token,
          },
        },
      });

      await response;
      setRefetchListKey();
      setIsLoading(false);
      setSnackbar({
        isVisible: true,
        message: 'Pedra excluída com sucesso',
        type: 'success',
      });
      handleClose();
    } catch (error) {
      setSnackbar({
        isVisible: true,
        message: 'Erro ao excluir pedra',
        type: 'error',
      });
      setIsLoading(false);
    }
  };

  return {isLoading, isModalVisible, handleClose, handleDeleteRock};
};

export default useModal;
