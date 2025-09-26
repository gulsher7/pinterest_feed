import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Header = () => {
  // Get current date
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.dateText}>Today's {getCurrentDate()}</Text>
          <Text style={styles.welcomeText}>Welcome, User</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeSection: {
    flex: 1,
  },
  dateText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  notificationButton: {
    padding: 8,
  },
  bellIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellShape: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellBody: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    borderBottomWidth: 3,
    backgroundColor: 'transparent',
  },
  bellHandle: {
    width: 4,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    position: 'absolute',
    top: -2,
  },
});

export default React.memo(Header);
