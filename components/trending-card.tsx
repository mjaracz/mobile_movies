import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TrendingCard: FC<{ movie: TrendingMovie; orderNr: number }> = ({ movie: { title, posterURL }, orderNr }) => {
  return (
    <Link href={`/movies/${title}`}>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image source={{ uri: posterURL }} className="w-32 h-48 rounded-lg" resizeMode="cover" />

        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView maskElement={<Text className="font-bold text-blue-400 text-6xl">{orderNr + 1}</Text>}>
            <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
          </MaskedView>
        </View>

        <Text className="text-sm font-bold mt-2 text-light-200" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
