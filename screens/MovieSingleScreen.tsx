import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Image, Platform, ScrollView, StyleSheet } from 'react-native';
import useGetMovieById from '../hooks/movies/useMovieById';

import { Text, View } from '../components/Themed';
import HorizontalListComponent from '../components/HorizontalList';
import MoviePosterComponent from '../components/MoviePoster';
import Error from '../components/ErrorComponent';
import Loading from '../components/Loading';

export default function MovieSingleScreen({ route, navigation }: any) {
  const [loading, error, movie] = useGetMovieById(route.params.selectedMovieId)
  const pan = useRef(new Animated.ValueXY()).current;


  function onCastItemPress(personId: number) {
    navigation.push('Person', { personId })
  }

  function onSimilarMovieItemPress(selectedMovieId: number) {
    navigation.push('MovieSingle', { selectedMovieId })
  }

  return loading ? <Loading /> : error ? <Error message={error?.message} /> : (
    <View style={styles.container}>
      <Animated.Image
        resizeMode="cover"
        style={[styles.backdrop, {
          transform: [
            {
              translateY: pan.y.interpolate({
                inputRange: [-10000, 0],
                outputRange: [-100, 0],
                extrapolate: 'clamp',
              }),
            },
            {
              scale: pan.y.interpolate({
                inputRange: [-30000, 0],
                outputRange: [20, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }]}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}` }}
      >
      </Animated.Image>
      <ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: pan.y } } }],
          {
            useNativeDriver: false,
          }
        )}
        style={styles.mainView}>
        <View style={{ height: 200, width: 0 }} />
        <View>
          <MoviePosterComponent
            title={movie?.title}
            style={styles.poster}
            size="w154"
            posterPath={movie?.poster_path}
          />
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.tagline}>{movie?.tagline}</Text>
          <View style={{ height: 0, width: '100%', marginVertical: 30 }} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={styles.overview}>{movie?.overview}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <View style={styles.horizontal_section}>
            <HorizontalListComponent
              heading="Cast"
              data={movie?.cast}
              onItemPress={(item) => onCastItemPress(item.id)}
              renderItem={({ item }) => (
                <View style={styles.horizontal_item}>
                  <Image
                    style={styles.cast_profile}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w185${item?.profile_path}`
                    }}
                  />
                  <Text>{item.name}</Text>
                  <Text>{item.character}</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.horizontal_section}>
            <HorizontalListComponent
              heading="Similar Movies"
              data={movie?.similar}
              onItemPress={(item) => onSimilarMovieItemPress(item.id)}
              renderItem={({ item }) => (
                <View style={styles.horizontal_item}>
                  <Image
                    style={styles.cast_profile}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w185${item.poster_path}`
                    }}
                  />
                  <Text>{item?.title}</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

          <View style={styles.provider_section}>
            {movie?.providers.flatrate.length > 0 ? (
              <HorizontalListComponent
                heading="Streaming"
                data={movie?.providers.flatrate}
                onItemPress={(item) => onSimilarMovieItemPress(item.id)}
                renderItem={({ item }) => (
                  <View style={styles.provider}>
                    <Image
                      style={styles.provider}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w92${item.logo_path}`
                      }}
                    />
                    <Text>{item.logo_path}</Text>
                  </View>
                )}
              />
            ) : <Text>Not Streaming Anywhere</Text>}
          </View>
        </View>
      </ScrollView >

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      < StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  backdrop: {
    position: 'absolute',
    height: 200,
    width: '100%',
  },
  mainView: {
    flex: 1,
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
    marginBottom: 5,
    height: 1,
    width: '100%',
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
  },
  horizontal_section: {
    marginBottom: 15,
    marginLeft: 8,
  },
  horizontal_item: {
    width: 108,
    marginLeft: 5,
    marginRight: 10,
  },
  cast_profile: {
    height: 165,
    borderRadius: 10,
    width: 108,
  },
  provider_section: {
    marginLeft: 0,
  },
  provider: {
    borderRadius: 100,
    height: 45,
    marginLeft: 4,
    width: 45,
  }
});
