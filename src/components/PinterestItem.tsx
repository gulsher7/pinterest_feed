import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PinterestImageItem from './PinterestImageItem';
import PinterestVideoItem from './PinterestVideoItem';
import { Item } from './types';

const GAP = 8;
const COLS = 2;
const W = Dimensions.get('window').width;
const COL_WIDTH = (W - GAP * 3) / COLS;

interface PinterestItemProps {
  item: Item;
  isVisible: boolean;
}

const PinterestItem: React.FC<PinterestItemProps> = ({ item, isVisible }) => {
  const itemHeight = COL_WIDTH * (item.h / item.w);
  const [videoVisible, setVideoVisible] = useState(false);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setVideoVisible(visible);
  }, []);

  return (
    <TouchableOpacity style={styles.itemContainer} activeOpacity={0.9}>
      {item.type === 'video' ? (
        <PinterestVideoItem 
          item={item} 
          itemHeight={itemHeight} 
          isVisible={isVisible && videoVisible}
          onVisibilityChange={handleVisibilityChange}
        />
      ) : (
        <PinterestImageItem item={item} itemHeight={itemHeight} />
      )}
      
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>•••</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    margin: GAP / 2,
  },
  overlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  moreButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -4,
  },
});

export default  React.memo(PinterestItem);
