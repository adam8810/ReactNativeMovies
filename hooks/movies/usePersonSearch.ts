import { ApolloError, gql, useQuery } from '@apollo/client';
import { Person } from '../../types/movie';

const GET_SINGLE_PERSON_DETAILS = gql`
  query Query($personId: Int!) {
    person(personId: $personId) {
      id
      name
      bio
      profile_path
      movies {
        id
        title
        poster_path
      }
    }
  }
`;

export default function useGetPersonById(
  personId: number
): [boolean, ApolloError | undefined, Person] {
  const { loading, error, data } = useQuery(GET_SINGLE_PERSON_DETAILS, {
    variables: { personId },
  });

  return [loading, error, data?.person || null];
}