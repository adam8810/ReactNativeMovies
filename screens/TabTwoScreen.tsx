import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import MovieSearch from '../components/MovieSearch';
import { View } from '../components/Themed';

type PropTypes = {
  navigation: any
}

export default function TabTwoScreen({ navigation }: PropTypes) {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  useEffect(() => {
    if (selectedMovieId !== null) {
      navigation.navigate('Modal', { selectedMovieId })
      setSelectedMovieId(null);
    }
  }, [navigation, selectedMovieId]);
  return (
    <View>
      <MovieSearch onItemPress={movieId => setSelectedMovieId(movieId)} />
    </View>
  );
}

const styles = StyleSheet.create({
});
