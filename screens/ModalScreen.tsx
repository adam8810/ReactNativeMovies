import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import useGetMovieById from '../hooks/movies/useMovieById';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '../components/Themed';
import HorizontalListComponent from '../components/HorizontalList';
import MoviePosterComponent from '../components/MoviePoster';

export default function ModalScreen({ route }: any) {
  const [loading, error, movie] = useGetMovieById(route.params.selectedMovieId)
  const navigation = useNavigation();

  function onItemPress(personId: number) {
    navigation.goBack();
    navigation.navigate('Person', { personId })
  }

  return loading || (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backdrop}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}` }}
      />
      <ScrollView
        style={styles.mainView}>
        <View>
          <MoviePosterComponent
            title={movie.title}
            style={styles.poster}
            size="w154"
            posterPath={movie?.poster_path}
          />
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.tagline}>{movie?.tagline}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.overview}>{movie?.overview}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <HorizontalListComponent
            heading="Cast"
            data={movie?.cast}
            onItemPress={(item) => onItemPress(item.id)}
            renderItem={({ item }) => (
              <View style={styles.cast_item}>
                <Image
                  style={styles.cast_profile}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w185${item.profile_path}`
                  }}
                />
                <Text>{item.name}</Text>
                <Text>{item.character}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainView: {
    paddingTop: 205
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 105,
  },
  tagline: {
    fontSize: 16,
    marginLeft: 105,
  },
  overview: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  backdrop: {
    height: 200,
    width: '100%',
    position: 'absolute'
  },
  poster: {
    width: 89,
    height: 137,
    position: 'absolute',
    marginTop: -50,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
    backgroundColor: 'red',
  },
  castList: {
    marginBottom: 30,
    paddingBottom: 160,
  },
  cast_item: {
    width: 180 * .6,
    marginLeft: 5,
    marginRight: 10,
  },
  cast_profile: {
    height: 275 * .6,
    borderRadius: 10,
    width: 180 * .6,
  },
});
