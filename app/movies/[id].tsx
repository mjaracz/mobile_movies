import AccentButton from '@/components/accent-button';
import MovieInfo from '@/components/movie-info';
import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import { saveMovie } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!movie) {
      Alert.alert('Error', 'Movie not loaded yet');
      return;
    }

    try {
      setSaving(true);
      await saveMovie({ userId: 1, movieId: movie.id });
      Alert.alert('Saved', 'Movie saved for later');
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Error',
        err instanceof Error ? err.message : 'Failed to save movie'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="bg-primary flex-1">
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="mt-10 self-center"
        />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>

          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {movie?.release_date?.split('-')[0]}
              </Text>
              <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
            </View>

            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} />
              <Text className="text-white font-bold text-sm">
                {Math.round(movie?.vote_average ?? 0)}
              </Text>
              <Text className="text-light-200">{movie?.vote_count} votes</Text>
            </View>

            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={movie?.genres?.map((g) => g.name).join(' -') || 'N/A'}
            />
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget! / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue! / 1_000_000)} million`}
            />

            <MovieInfo
              label="Production Companies"
              value={
                movie?.production_companies.map((c) => c.name).join('-') ||
                'N/A'
              }
            />

            <View className="mt-4">
              <AccentButton
                fullWidth={false}
                onPress={handleSave}
                Icon={
                  <Image
                    source={icons.save}
                    className="size-4 mr-1"
                    tintColor="white"
                  />
                }
                label={saving ? 'Saving...' : 'Save'}
                gradientColors={['#0a0a0a', '#052f4a']}
              />
            </View>
          </View>
        </ScrollView>
      )}

      <AccentButton
        onPress={router.back}
        Icon={
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor="#fff"
          />
        }
        label="Go back"
      />
    </View>
  );
};

export default MovieDetails;
