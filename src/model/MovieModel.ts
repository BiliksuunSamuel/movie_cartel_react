export default interface MovieModel {
  director: number;
  name: string;
  id: number;
  release_year: number;
}

export const InitialMovieInfo: MovieModel = {
  director: 0,
  name: "",
  id: 0,
  release_year: 0,
};
