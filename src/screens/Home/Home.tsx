import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';

import styles from '../../styles';

function Home(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

export default Home;
