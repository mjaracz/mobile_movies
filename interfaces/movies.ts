export interface TrendingMovie {
  searchTerm: string;
  movieID: number;
  title: string;
  count: number;
  posterURL: string;
}

export interface SavedMovies {
  $id: number;
  userId: number;
  movieId: number;
  $createdAt: string;
  $updatedAt: string;
}
