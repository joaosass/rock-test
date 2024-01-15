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
      handleClose();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {isLoading, isModalVisible, handleClose, handleDeleteRock};
};

export default useModal;
