import { icons } from '@/constants/icons';
import { Image } from 'react-native';

export const Logo = () => {
  return <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />;
};
