import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import useMovieList, { MovielistEnum } from '../hooks/movies/useMovieList';
import Error from './ErrorComponent';
import Loading from './Loading';
import MovieListItem from './MovieListItem';

import { View } from './Themed';

export type PropTopes = {
  type: MovielistEnum;
  onItemPress: (idx: number) => void;
};

export default function MovieList(props: PropTopes) {
  const [loading, error, data] = useMovieList(props.type);

  return (
    <View style={styles.container}>
      {loading ? <Loading /> : error ? <Error message={error.message} /> : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MovieListItem
              movie={item}
              onItemPress={props.onItemPress}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    width: '100%',
  },
});
