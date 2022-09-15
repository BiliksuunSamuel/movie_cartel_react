import DirectorModel from "../../model/DirectorModel";
import MovieModel from "../../model/MovieModel";

export interface IMoviesReducerState {
  movies: MovieModel[];
}

export interface IResponseReducerState {
  loading: boolean;
  error: any;
  message: any;
}

export interface IDirectorsReducerState {
  directors: DirectorModel[];
}
