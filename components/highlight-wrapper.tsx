import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';

interface HighlightProps {
  children: ReactNode;
  gradientColors?: [string, string];
  className?: string;
}

const HighlightWrapper: FC<HighlightProps> = ({
  children,
  gradientColors = ['#7C3AED', '#4F46E5'],
  className = 'flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden',
}) => {
  return (
    <View className={className}>
      <LinearGradient
        colors={[gradientColors[0], gradientColors[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, borderRadius: 9999 }}
      >
        <View className="flex-1 flex-row justify-center items-center">
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

export default HighlightWrapper;
