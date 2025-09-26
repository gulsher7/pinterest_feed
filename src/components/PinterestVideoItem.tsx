import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import { Item } from './types';

interface PinterestVideoItemProps {
  item: Item;
  itemHeight: number;
  isVisible: boolean;
  onVisibilityChange: (visible: boolean) => void;
}

const PinterestVideoItem: React.FC<PinterestVideoItemProps> = ({ 
  item, 
  itemHeight, 
  isVisible, 
  onVisibilityChange 
}) => {
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<View>(null);

  // Auto-play logic: play when visible AND not manually paused
  const shouldPlay = isVisible && !manuallyPaused && isLoaded;

  const handlePress = () => {
    setManuallyPaused(!manuallyPaused);
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const onLayout = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.measure((x, y, width, height, pageX, pageY) => {
        const screenHeight = Dimensions.get('window').height;
        const isInViewport = pageY + height > 0 && pageY < screenHeight;
        onVisibilityChange(isInViewport);
      });
    }
  }, [onVisibilityChange]);

  return (
    <View 
      ref={videoRef}
      style={[styles.videoContainer, { height: itemHeight }]}
      onLayout={onLayout}
    >
      <Video
        source={{ uri: item.url }}
        style={{ width: '100%', height: itemHeight }}
        resizeMode="cover"
        paused={!shouldPlay}
        muted={true}
        repeat={true}
        onLoad={() => {
          console.log('Video loaded:', item.title);
          setIsLoaded(true);
        }}
        onError={(error) => console.log('Video error:', error)}
        onBuffer={(buffer) => console.log('Video buffering:', buffer.isBuffering)}
      />
      
      {/* Video Controls Overlay */}
      <TouchableOpacity 
        style={styles.videoOverlay}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {(!shouldPlay || showControls) && (
          <View style={styles.playButton}>
            <Text style={styles.playButtonText}>
              {shouldPlay ? '⏸️' : '▶️'}
            </Text>
          </View>
        )}
        
        {/* Loading indicator */}
        {!isLoaded && (
          <View style={styles.loadingIndicator}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Video Info */}
      {item.subtitle && (
        <View style={styles.videoInfo}>
          <Text style={styles.videoSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        </View>
      )}

      {/* Auto-play indicator */}
      {shouldPlay && (
        <View style={styles.autoPlayIndicator}>
          <Text style={styles.autoPlayText}>●</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  videoSubtitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  loadingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  autoPlayIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoPlayText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default  React.memo(PinterestVideoItem);
