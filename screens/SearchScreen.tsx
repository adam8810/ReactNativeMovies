import React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import useSearchMovies from '../hooks/movies/useMoviesSearch';
import MovieListItem from '../components/MovieListItem';

import { View, TextInput } from '../components/Themed';
import Loading from '../components/Loading';
import Error from '../components/ErrorComponent';

export type PropTopes = {
  navigation: any;
};

export default function MovieList({ navigation }: PropTopes) {
  const [searchText, setSearchText] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [loading, error, data] = useSearchMovies(currentSearch);

  useEffect(() => {
    if (selectedMovieId !== null) {
      navigation.push('MovieSingle', { selectedMovieId })
      setSelectedMovieId(null);
    }
  }, [navigation, selectedMovieId]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          placeholder='Search'
          blurOnSubmit
          clearButtonMode="while-editing"
          returnKeyType="search"
          enablesReturnKeyAutomatically
          style={styles.searchBox}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={() => setCurrentSearch(searchText)}
        />
      </View>
      {loading ? <Loading /> : error ? <Error message={error?.message} /> : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MovieListItem
              movie={item}
              onItemPress={(item: number) => setSelectedMovieId(item)}
            />
          )
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: 22,
    width: '100%',
  },
  searchBox: {
    flex: 0,
    fontSize: 20,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  movieList: {
    flex: 1,
    backgroundColor: 'red',
  }
});
