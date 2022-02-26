import React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import useSearchMovies from '../hooks/movies/useMoviesSearch';
import MovieListItem from './MovieListItem';

import { View, TextInput } from './Themed';

export type PropTopes = {
  onItemPress: (movieId: number) => void
};

export default function MovieList(props: PropTopes) {
  const [searchText, setSearchText] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string | null>(null);
  const [loading, error, data] = useSearchMovies(currentSearch);

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
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MovieListItem
            movie={item}
            onItemPress={props.onItemPress}
          />
        )
        }
      />
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
