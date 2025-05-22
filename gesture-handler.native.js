import 'react-native-gesture-handler';

configureGestureHandler: ({ gesture }) => {
    return gesture.enableTrackpadTwoFingerGesture(true);
  }