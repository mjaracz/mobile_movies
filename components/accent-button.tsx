import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onPress: () => void;
  Icon: ReactNode;
  label: string;
}

const AccentButton: FC<Props> = ({ onPress, Icon, label }) => {
  return (
    <TouchableOpacity onPress={onPress} className="absolute bottom-10 left-0 right-0 mx-6 z-50" activeOpacity={0.85}>
      <View className="w-full rounded-xl overflow-hidden">
        <LinearGradient colors={['#155dfc', '#104e64']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <View className="w-full py-3.5 flex-row justify-center items-center gap-x-2">
            {Icon}
            <Text className="text-white font-semibold">{label}</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default AccentButton;
