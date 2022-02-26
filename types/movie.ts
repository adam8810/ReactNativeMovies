export type MovieListItem = {
  id: number;
  title: string;
}

export type MovieCredit = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export type Person = {
  id: number;
  name: string;
  bio: string;
  profile_path: string;
  movies: Array<{ id: number, title: string, poster_path: string }>
};

export type MovieItem = {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number;
  poster_path: string;
  backdrop_path: string;
  cast: Array<MovieCredit>;
}

