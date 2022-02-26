import { ApolloError, gql, useQuery } from '@apollo/client';
import { MovieListItem } from '../../types/movie';

const GET_MOVIELIST = gql`
  query Query($type: MovielistType!) {
    movieList(type: $type) {
      id
      title
      poster_path
    }
  }
`;

export enum MovielistEnum {
  Popular = 'POPULAR',
  Upcoming = 'UPCOMING',
  TopRated = 'TOP_RATED',
}

export default function useMovieList(type: MovielistEnum): [boolean, ApolloError | undefined, Array<MovieListItem>] {
  const { loading, error, data } = useQuery(GET_MOVIELIST, {
    variables: { type },
  });

  return [loading, error, data?.movieList || []];
}