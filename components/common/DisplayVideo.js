import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const DisplayVideo = ({ videoSource }) => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        src={`${videoSource}?embedded=true`}
        style={styles.webIframe}
        title="Video Renderer"
        allowFullScreen
      />
    );
  }

  return (
    <WebView 
      source={{ uri: `${videoSource}?embedded=true` }} 
      style={styles.videoPlayer}
      allowsFullscreenVideo
      javaScriptEnabled
      domStorageEnabled
      hideLoaders={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  webIframe: {
    width: '100%',
    height: 200,
    border: 'none',
  },
  videoPlayer: {
    width: '100%',
    height: 200,
  },
});

export default DisplayVideo;
