import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { WebImages } from 'react-native-nitro-web-image';
import { data } from '../components/data';
import { Item } from '../components/types';

type RootStackParamList = {
  OnBoard: undefined;
  Home: undefined;
};

type OnBoardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnBoard'
>;

const { width } = Dimensions.get('window');

// Pinterest-style onboard component
const OnBoard = () => {
  const navigation = useNavigation<OnBoardScreenNavigationProp>();

  // Animation values for floating cards
  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const card3Anim = useRef(new Animated.Value(0)).current;
  const card4Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate floating cards with staggered timing
    setTimeout(() => {
      Animated.stagger(150, [
        Animated.spring(card1Anim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(card2Anim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(card3Anim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(card4Anim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, []);

  useEffect(() => {
    navigation.preload('Home');

    data.forEach((item: Item) => {
        if(item.type === 'image') {
            if(item.url.includes('https')) {
              console.log("preloading image", item.url)
                WebImages.preload(item.url);
            }
        }
    });

  }, []);



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90'
          }}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.overlay} />
          
          {/* Pinterest-style floating cards preview */}
          <View style={styles.floatingCards}>
            <Animated.View 
              style={[
                styles.card, 
                styles.card1,
                {
                  opacity: card1Anim,
                  transform: [
                    { rotate: '-8deg' },
                    {
                      scale: card1Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                }
              ]}
            >
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.card, 
                styles.card2,
                {
                  opacity: card2Anim,
                  transform: [
                    { rotate: '12deg' },
                    {
                      scale: card2Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                }
              ]}
            >
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.card, 
                styles.card3,
                {
                  opacity: card3Anim,
                  transform: [
                    { rotate: '5deg' },
                    {
                      scale: card3Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                }
              ]}
            >
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.card, 
                styles.card4,
                {
                  opacity: card4Anim,
                  transform: [
                    { rotate: '-5deg' },
                    {
                      scale: card4Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                }
              ]}
            >
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              />
            </Animated.View>
          </View>


          <TouchableOpacity onPress={() => navigation.navigate('Home')}>    
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  floatingCards: {
    position: 'relative',
    width: width * 0.8,
    height: 200,
  },
  card: {
    position: 'absolute',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  card1: {
    width: 120,
    height: 160,
    top: 20,
    left: 20,
  },
  card2: {
    width: 110,
    height: 140,
    top: 0,
    right: 30,
  },
  card3: {
    width: 100,
    height: 130,
    bottom: 20,
    left: 50,
  },
  card4: {
    width: 115,
    height: 150,
    bottom: 0,
    right: 10,
  },
  cardImage: {
    flex: 1,
  },
  cardImageStyle: {
    borderRadius: 16,
  },
  button: {
    backgroundColor: '#E60023',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 24,
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnBoard;
