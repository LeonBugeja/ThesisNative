import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const RenderPPT = ({ pptUri }) => {
  if (Platform.OS === 'web') {
    return (
      <iframe
        src={pptUri}
        style={styles.webIframe}
        title="PPT Viewer"
      />
    );
  }

  return <WebView source={{ uri: pptUri }} style={styles.webView} />;
};

const styles = StyleSheet.create({
  webIframe: {
    width: '100%',
    height: 200,
    border: 'none',
  },
  webView: {
    width: '100%',
    height: 200,
  },
});

export default RenderPPT;
