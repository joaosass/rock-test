import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import styles from '../../styles';
import useHome from './useHome';
import {ActivityIndicator, IconButton, Text} from 'react-native-paper';
import RockCard from '../../components/RockCard';
import {RootStackParamList} from '../../types';

import {default as localStyles} from './styles';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps): React.JSX.Element {
  const {list, loading} = useHome();

  return (
    <SafeAreaView style={[styles.fullScreen, styles.backgroundAccent]}>
      <View style={styles.container}>
        <Text variant="headlineSmall">Bem vindo</Text>
      </View>
      <View style={[styles.roundContainer, styles.fullScreen]}>
        <View style={styles.spaceBetween}>
          <View>
            <Text variant="headlineSmall" style={styles.title}>
              Pedras
            </Text>
            <Text>Faça sua gestão de pedras</Text>
          </View>
          <IconButton
            icon="plus-circle"
            onPress={() => navigation.navigate('Form')}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView contentContainerStyle={localStyles.cardGap}>
            {list.map(rock => (
              <RockCard key={rock.id} {...rock} />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Home;
