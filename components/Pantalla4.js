import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.twitch.tv/neoalek/chat' }}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: 'white',
  },
});
