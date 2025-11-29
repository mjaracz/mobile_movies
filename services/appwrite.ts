import { SavedMovies, TrendingMovie } from '@/interfaces/movies';
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const METRIC_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_METRIC_COLLECTION_ID!;
const SAVED_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updatedSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      METRIC_COLLECTION_ID,
      [Query.equal('searchTerm', query)]
    );

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        METRIC_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        METRIC_COLLECTION_ID,
        ID.unique(),
        {
          count: 1,
          searchTerm: query,
          movieID: movie.id,
          title: movie.title,
          posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTradingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      METRIC_COLLECTION_ID,
      [Query.limit(5), Query.orderDesc('count')]
    );

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSavedMovies = async (
  userId: number
): Promise<SavedMovies[]> => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal('userId', userId)]
    );

    return result.documents as unknown as SavedMovies[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface SaveMovieParams {
  userId: number;
  movieId: number;
}

export const saveMovie = async ({ userId, movieId }: SaveMovieParams) => {
  try {
    const existing = await database.listDocuments(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      [Query.equal('userId', userId), Query.equal('movieId', movieId)]
    );

    if (existing.documents.length > 0) {
      return existing.documents[0] as unknown as SavedMovies;
    }

    const newSaved = await database.createDocument(
      DATABASE_ID,
      SAVED_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        movieId,
      }
    );

    return newSaved as unknown as SavedMovies;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeSavedMovie = async (documentId: string) => {
  try {
    await database.deleteDocument(DATABASE_ID, SAVED_COLLECTION_ID, documentId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
