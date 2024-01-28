import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

// ** Third Party
import { Portal } from 'react-native-paper';
import { PanGestureHandler, PanGestureHandlerGestureEvent,HandlerStateChangeEvent, GestureHandlerRootView } from 'react-native-gesture-handler';

interface BottomSheetProps {
  show: boolean;
  onDismiss: () => void;
  height: number;
  enableBackdropDismiss: boolean;
  children: React.ReactNode;
  isTransparent?: boolean;
  isHeaderTransparent?:boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  show,
  onDismiss,
  enableBackdropDismiss,
  height,
  isTransparent,
  isHeaderTransparent,
  children,
}) => {
  const bottomSheetHeight = Dimensions.get('window').height *  height;
  const deviceWidth = Dimensions.get('window').width;
  const [open, setOpen] = useState(false);
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

  const onGesture = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = (event: HandlerStateChangeEvent<Record<string, unknown>>) => {
    const translationY = event.nativeEvent.translationY as number; // Cast to number
    if (translationY > bottomSheetHeight / 2) {
      onDismiss();
    } else {
      bottom.setValue(0);
    }
  };

  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [show]);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <GestureHandlerRootView style={{flex: 1}}>
        <Pressable
          onPress={enableBackdropDismiss ? onDismiss : undefined}
          style={styles.backDrop}
        ></Pressable>
        <Animated.View
          style={[
            styles.root,
            {
              height: bottomSheetHeight,
              bottom: bottom,
              shadowOffset: {
                width: 0, // Set width to 0 to disable horizontal shadow
                height: -3,
              },
            },
            styles.common,
          ]}
          className={isTransparent ? "bg-transparent" : "bg-white"}
        >
          <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
            <View
              style={[
                styles.header,
                // styles.common,
                {
                  shadowOffset: { 
                    width: 0, // Set width to 0 to disable horizontal shadow
                    height: 3,
                  },
                },
              ]}
              className={isHeaderTransparent ? "bg-transparent" : "bg-white"}
            >
              <View
                style={{
                  width: 60,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: '#ccc',
                  position: 'absolute',
                  top: 8,
                  left: (deviceWidth - 60) / 2,
                  zIndex: 10,
                }}
              />
            </View>
          </PanGestureHandler>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </GestureHandlerRootView>
    </Portal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    // backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  header: {
    height: 44,
  },
  common: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    paddingHorizontal: 18,
  },
});