import { ApolloError, gql, useQuery } from '@apollo/client';
import { MovieItem } from '../../types/movie';

const GET_SINGLE_MOVIE_DETAILS = gql`
  query Query($movieId: Int!) {
    moviesById(id: $movieId) {
      title
      tagline
      overview
      release_date
      runtime
      poster_path
      backdrop_path
      cast {
        id
        name
        character
        profile_path
      }
    }
  }
`;

export default function useGetMovieById(movieId: number): [boolean, ApolloError | undefined, MovieItem] {
  const { loading, error, data } = useQuery(GET_SINGLE_MOVIE_DETAILS, {
    variables: { movieId },
  });

  return [loading, error, data?.moviesById || null];
}