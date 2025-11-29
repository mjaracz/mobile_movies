import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onPress: () => void;
  label?: string;
  Icon?: ReactNode;
  fullWidth?: boolean;
  gradientColors?: [string, string];
  iconOnly?: boolean;
  className?: string;
}

const AccentButton: FC<Props> = ({
  onPress,
  Icon,
  label,
  fullWidth = true,
  iconOnly = false,
  gradientColors: propColors,
  className = '',
}) => {
  const [gradientColors, setGradientColors] = useState<[string, string]>([
    '#155dfc',
    '#0f0D23',
  ]);

  useEffect(() => {
    if (propColors) setGradientColors(propColors as [string, string]);
  }, [propColors]);

  if (iconOnly) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} className="z-50">
        <View className={`${className} rounded-full p-1 overflow-hidden`}>
          <LinearGradient
            colors={[gradientColors[0], gradientColors[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 9999 }}
          >
            <View className="h-9 rounded-full justify-center items-center overflow-hidden">
              {Icon}
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }

  if (!fullWidth) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className="self-start z-50"
      >
        <View className={`${className} rounded-xl overflow-hidden`}>
          <LinearGradient
            colors={[gradientColors[0], gradientColors[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View className="px-4 py-2 flex-row items-center justify-center gap-x-2">
              {Icon}
              <Text className="text-white font-semibold">{label}</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-10 left-0 right-0 mx-6 z-50"
      activeOpacity={0.85}
    >
      <View className={`${className} w-full rounded-xl overflow-hidden`}>
        <LinearGradient
          colors={[gradientColors[0], gradientColors[1]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
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
