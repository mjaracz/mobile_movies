import { Logo } from '@/components/logo';
import React from 'react';
import { Text, View } from 'react-native';

const Profile = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Logo />
        <Text className="text-gray-500 text-base">Save</Text>
      </View>
    </View>
  );
};

export default Profile;
