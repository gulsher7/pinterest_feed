import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { NitroImage } from 'react-native-nitro-image';
import { Item } from './types';

interface PinterestImageItemProps {
  item: Item;
  itemHeight: number;
}

const PinterestImageItem: React.FC<PinterestImageItemProps> = ({ item, itemHeight }) => (
  <View style={[styles.imagePlaceholder, { height: itemHeight }]}>
    <NitroImage
      image={{ url: item.url }}
      style={{ width: '100%', height: itemHeight }}
    />
  </View>
);

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: '100%',
    backgroundColor: '#1a1a1a', // Consistent placeholder color for better UX
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default React.memo(PinterestImageItem);
