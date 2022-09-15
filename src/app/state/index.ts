import {
  IDirectorsReducerState,
  IMoviesReducerState,
  IResponseReducerState,
} from "./IState";

export const MoviesReducerState: IMoviesReducerState = {
  movies: [],
};

export const ResponseReducerState: IResponseReducerState = {
  loading: false,
  error: null,
  message: null,
};

export const DirectorsReducerState: IDirectorsReducerState = {
  directors: [],
};
