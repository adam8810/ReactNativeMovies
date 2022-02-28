import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import MovieList from '../components/MovieList';

type PropTypes = {
  route: any;
  navigation: any
}

export default function TabOneScreen({ route, navigation }: PropTypes) {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  useEffect(() => {
    if (selectedMovieId !== null) {
      navigation.navigate('MovieSingle', { selectedMovieId })
      setSelectedMovieId(null);
    }
  }, [navigation, selectedMovieId]);

  return (
    <View style={styles.container}>
      <MovieList
        type={route.params.type}
        onItemPress={(id: number) => { setSelectedMovieId(id) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
