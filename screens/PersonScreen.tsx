import React, { useEffect } from "react";
import { View, Text } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import useGetPersonById from "../hooks/movies/usePersonSearch";
import { Image, ScrollView, StyleSheet } from "react-native";
import HorizontalListComponent from "../components/HorizontalList";
import MoviePosterComponent from "../components/MoviePoster";
import Error from '../components/ErrorComponent';
import Loading from "../components/Loading";

export default function PersonScreen({ navigation, route }: RootStackScreenProps<'Person'>) {
  const [loading, error, person] = useGetPersonById(route.params.personId);
  useEffect(() => {
    navigation.setOptions({ headerTitle: '' });
  });
  useEffect(() => {
    if (!loading && person?.name) {
      navigation.setOptions({ headerTitle: person.name });
    }
  }, [navigation, loading, person]);
  function onItemPress(selectedMovieId: number) {
    navigation.push('MovieSingle', { selectedMovieId })
  }

  return loading ? <Loading /> : error ? <Error message={error?.message} /> : (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.profile}
            source={{ uri: `https://image.tmdb.org/t/p/w185${person.profile_path}` }}
          />
          <Text>Born: {person.birthday}</Text>
          {person.deathday && (<Text> - {person.deathday}</Text>)}
        </View>
        <Text>{person.bio}</Text>

        <HorizontalListComponent
          heading="Movies"
          data={person.movies}
          onItemPress={(item) => onItemPress(item.id)}
          renderItem={({ item }) => (
            <View style={styles.movie_item}>
              <MoviePosterComponent
                title={item.title}
                posterPath={item.poster_path}
                size="w185"
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: '100%'
  },
  top: {
    display: 'flex',
    flexDirection: 'row'
  },
  profile: {
    width: 89,
    height: 137,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 3,
  },
  movieList: {
    marginBottom: 30,
    paddingBottom: 160,
  },
  movie_item: {
    width: '100%',
    marginLeft: 5,
    marginRight: 10,
  },
});