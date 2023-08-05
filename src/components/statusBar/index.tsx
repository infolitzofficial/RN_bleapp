import React from 'react';
import {Platform, StatusBar, View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hasNotch} from 'react-native-device-info';
import {useIsFocused} from '@react-navigation/native';

const CustomStatusBar: React.FC<{
  color: string;
  barStyle: 'light-content' | 'dark-content';
}> = ({color, barStyle}) => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  return Platform.OS === 'ios' ? (
    <View
      style={{
        ...styles.header,
        backgroundColor: color,
        height: hasNotch()
          ? Math.max(insets.top, 40)
          : Math.max(insets.top, 24),
      }}>
      {isFocused && (
        <StatusBar
          backgroundColor={color}
          barStyle={barStyle}
          animated
          translucent
        />
      )}
    </View>
  ) : (
    <StatusBar
      backgroundColor={color}
      barStyle={barStyle}
      animated
      translucent
    />
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 0,
    zIndex: 10,
  },
});

export default React.memo(CustomStatusBar);
