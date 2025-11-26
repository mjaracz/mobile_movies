import React, { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import TrendingCard from './trending-card';

const TrendingMovies: FC<{ movies: TrendingMovie[] }> = ({ movies }) => {
  return (
    <View className="mt-10">
      <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
        className="mb-4 mt-3"
        data={movies}
        renderItem={({ item, index }) => <TrendingCard movie={item} orderNr={index} />}
      />
    </View>
  );
};

export default TrendingMovies;
