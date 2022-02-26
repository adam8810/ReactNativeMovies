import { ApolloError, gql, useQuery } from '@apollo/client';
import { MovieListItem } from '../../types/movie';

const GET_MOVIE_SEARCH = gql`
  query Query($query: String!) {
    movieSearch(query: $query) {
      id
      title
      poster_path
    }
  }
`;

export default function useSearchMovies(
  query: string | null
): [boolean, ApolloError | undefined, Array<MovieListItem>] {
  const { loading, error, data } = useQuery(GET_MOVIE_SEARCH, {
    variables: { query },
    skip: query === null,
  });

  return [loading, error, data?.movieSearch || []];
}