import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Icon, IconButton, Text} from 'react-native-paper';

import useStore from '../../store';
import {Rock, RootStackParamList} from '../../types';

import styles from './styles';

function RockCard({name, price, id}: Rock): React.JSX.Element {
  const {setEditingRock, setIsModalVisible} = useStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleEditRock = () => {
    setEditingRock({name, price, id});
    navigation.navigate('Form');
  };

  const handleDeleteRock = () => {
    setEditingRock({id} as Rock);
    setIsModalVisible(true);
  };

  return (
    <View style={[styles.card, styles.row]}>
      <View style={styles.row}>
        <Icon size={24} source="diamond-stone" />
        <Text>{name}</Text>
      </View>
      <View style={styles.row}>
        <IconButton
          testID="rock-card-edit"
          icon="pencil"
          onPress={handleEditRock}
        />
        <IconButton
          testID="rock-card-delete"
          icon="delete"
          onPress={handleDeleteRock}
        />
      </View>
    </View>
  );
}

export default RockCard;
