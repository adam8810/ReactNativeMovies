import React from 'react';
import { StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { View, Text } from './Themed';
import { MovieItem } from '../types/movie';
import MoviePosterComponent from './MoviePoster';

export type PropTypes = {
  movie: MovieItem;
  onItemPress: any
}

export default function MovieListComponent({ movie, onItemPress }: PropTypes) {
  return (
    <TouchableWithoutFeedback onPress={() => onItemPress(movie.id)}>
      <View style={styles.container}>
        <MoviePosterComponent
          title={movie.title}
          posterPath={movie.poster_path}
          size="w92"
          style={styles.poster}
        />
        <View>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.title}>{movie.release_date}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: "row", // main axis
    justifyContent: "flex-start", // main axis
    alignItems: "center", // cross axis
    padding: 8,
    alignContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  poster: {
    flex: 0,
    width: 52,
    height: 80,
    marginRight: 20,
    borderRadius: 2,
    borderWidth: 1,
  },
});