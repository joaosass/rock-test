import React from 'react';
import {View} from 'react-native';
import {Icon, IconButton, Text} from 'react-native-paper';

import {Rock} from '../../types';

import styles from './styles';

function RockCard({name}: Rock): React.JSX.Element {
  return (
    <View style={[styles.card, styles.row]}>
      <View style={styles.row}>
        <Icon size={24} source="diamond-stone" />
        <Text>{name}</Text>
      </View>
      <View style={styles.row}>
        <IconButton icon="pencil" />
        <IconButton icon="delete" />
      </View>
    </View>
  );
}

export default RockCard;
