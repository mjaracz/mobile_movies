import { Logo } from '@/components/logo';
import MovieCard from '@/components/movie-card';
import { images } from '@/constants/images';
import { fetchMovieDetails } from '@/services/api';
import { getSavedMovies } from '@/services/appwrite';
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

import { RemoveSavedBtn } from '@/components/remove-saved-btn';

interface EnricedMovie {
  movie: Movie;
  documentId: string;
}

const Saved = () => {
  const [movies, setMovies] = useState<EnricedMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const isFocused = useIsFocused();

  const loadSaved = useCallback(async () => {
    try {
      setLoading(true);
      const saved = await getSavedMovies(1);

      if (!saved || saved.length === 0) {
        setMovies([]);
        return;
      }

      const movieDetails = await Promise.all(
        saved.map((s) => fetchMovieDetails(String(s.movieId)))
      );

      const mappedCombined = saved.map((s, idx) => {
        const md = movieDetails[idx];
        const movie: Movie = {
          id: md.id,
          title: md.title,
          adult: md.adult,
          backdrop_path: md.backdrop_path ?? '',
          genre_ids: md.genres?.map((g) => g.id) ?? [],
          original_language: md.original_language,
          original_title: md.original_title,
          overview: md.overview ?? '',
          popularity: md.popularity,
          poster_path: md.poster_path ?? '',
          release_date: md.release_date ?? '',
          video: md.video,
          vote_average: md.vote_average,
          vote_count: md.vote_count,
        };

        return { movie, documentId: String(s.$id) };
      });

      setMovies(mappedCombined);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load saved movies')
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadSaved();
    }
  }, [isFocused, loadSaved]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={movies ?? []}
        renderItem={({ item }) => (
          <MovieCard
            {...item.movie}
            Action={
              <RemoveSavedBtn
                loadSaved={loadSaved}
                documentId={item.documentId}
              />
            }
          />
        )}
        keyExtractor={(item) => item.documentId}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Logo />
            </View>

            <View className="my-5 px-2">
              <Text className="text-xl text-white font-bold">Saved Movies</Text>
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                You have no saved movies yet.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Saved;
