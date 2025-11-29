import { removeSavedMovie } from '@/services/appwrite';
import Feather from '@expo/vector-icons/Feather';
import { FC, useCallback } from 'react';
import { Alert } from 'react-native';
import AccentButton from './accent-button';

interface Props {
  documentId: string;
  loadSaved: () => Promise<void>;
}

export const RemoveSavedBtn: FC<Props> = ({ documentId, loadSaved }) => {
  const handleRemove = useCallback(
    (documentId: string) => {
      Alert.alert('Remove', 'Remove this saved movie?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeSavedMovie(documentId);
              await loadSaved();
            } catch (err) {
              console.log(err);
              Alert.alert(
                'Error',
                err instanceof Error ? err.message : 'Failed to remove'
              );
            }
          },
        },
      ]);
    },
    [loadSaved]
  );

  return (
    <AccentButton
      iconOnly
      fullWidth={false}
      onPress={() => handleRemove(documentId)}
      Icon={<Feather name="trash" size={20} color="#151312" />}
      gradientColors={['#7C3AED', '#155dfc']}
      className="w-20 mx-auto"
    />
  );
};
