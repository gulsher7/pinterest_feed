import { FlashList, FlashListRef } from "@shopify/flash-list";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StatusBar,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { data } from '../components/data';
import Header from '../components/Header';
import PinterestItem from '../components/PinterestItem';
import { Item } from '../components/types';
import { WebImages } from "react-native-nitro-web-image";


const GAP = 8;
const COLS = 2;

export default function Home() {
  const items = useMemo(() => data, []);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  const flashListRef = useRef<FlashListRef<Item>>(null);


  const renderItem = ({ item }: { item: Item }) => {
    const isVisible = visibleItems.has(item.id);
    return <PinterestItem item={item} isVisible={isVisible} />;
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    const visibleIds = new Set<string>(viewableItems.map((item: any) => item.item.id as string));
    setVisibleItems(visibleIds);
  }, []);

  const viewabilityConfig = useMemo(() => ({
    itemVisiblePercentThreshold: 50, // Item is considered visible when 50% is visible
    minimumViewTime: 100, // Minimum time in ms an item should be visible
  }), []);


  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlashList
        ref={flashListRef}
        data={items}
        renderItem={renderItem}
        masonry
        numColumns={COLS}
        optimizeItemArrangement={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.8}
        ListHeaderComponent={() => <Header />}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    padding: GAP,
    paddingBottom: 20,
  },
});
