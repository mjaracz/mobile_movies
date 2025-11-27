import React, { FC } from 'react';
import { Text, View } from 'react-native';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo: FC<MovieInfoProps> = ({ label, value }) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-white font-normal text-sm">{label}</Text>
      <Text className="text-white font-bold text-sm mt-2">{value || 'N/A'}</Text>
    </View>
  );
};

export default MovieInfo;
