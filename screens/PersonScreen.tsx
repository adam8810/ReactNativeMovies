import React, { useEffect } from "react";
import { View, Text } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import useGetPersonById from "../hooks/movies/usePersonSearch";
import { Image, ScrollView, StyleSheet } from "react-native";
import HorizontalListComponent from "../components/HorizontalList";
import MoviePosterComponent from "../components/MoviePoster";
import Error from '../components/ErrorComponent';
import Loading from "../components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.top}>
            <Image
              style={styles.profile}
              source={{ uri: `https://image.tmdb.org/t/p/w185${person.profile_path}` }}
            />
            <Text>Born: {person.birthday}</Text>
            {person.deathday && (<Text> - {person.deathday}</Text>)}
          </View>
          <Text style={styles.bio}>{person.bio}</Text>

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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  scrollView: {
    height: '100%',
    paddingHorizontal: 0,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
  },
  bio: {
    marginVertical: 20,
    marginLeft: 5,
  },
  profile: {
    width: 89,
    height: 137,
    marginLeft: 3,
    marginRight: 10,
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