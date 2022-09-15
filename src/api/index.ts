export const baseURL = "http://192.168.80.31:1929/api";

export enum PostRoutes {
  add_director = "director/add",
  add_movie = "movie/add",
}

export const GetRoutes = {
  get_movies: "movies/get",
  get_movies_by_year: (year: number) => `movie/release_year/year?year=${year}`,
  get_directors: "directors/get",
  get_director: (id: number) => `director/get/id?id=${id}`,
  get_movie: (id: number) => `movie/get/id?id=${id}`,
};

export enum PutRoutes {
  update_director = "director/update",
  update_movie = "movie/update",
}
