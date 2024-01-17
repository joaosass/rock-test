import React from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';

interface ButtonProps {
  isDisabled?: boolean;
  isLoading: boolean;
  onPress: () => void;
  text: string;
}

function ButtonComponent({
  isDisabled,
  isLoading,
  onPress,
  text,
}: ButtonProps): React.JSX.Element {
  return (
    <Button
      disabled={isDisabled || isLoading}
      mode="contained"
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" testID="button-loading" />
      ) : (
        text
      )}
    </Button>
  );
}

export default ButtonComponent;
