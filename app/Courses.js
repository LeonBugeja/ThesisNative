import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RenderPPT from '../components/common/RenderPPT';
import WebView from 'react-native-webview';
import DisplayVideo from '../components/common/DisplayVideo';
import { COLORS } from '../constants/index';

const Lessons = () => {
  const pptUri = 'https://drive.google.com/file/d/1DmuU6b0dpwqKYhjiPkKTPC0vrc90HKKt/preview';

  const videos = [
    "https://drive.google.com/file/d/1E-OrkN3iiZ3lmARhBkTzQa6O2_UQQHMS/preview",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Available Course - Digital Literacy</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Topic 1: Introduction to Digital Literacy</Text>
        <Text style={styles.cardText}>
          - Digital literacy is the ability to use technology to find, evaluate, create, and communicate information.
        </Text>
        <Text style={styles.cardText}>
          - Essential skills include understanding how to search for and assess information online.
        </Text>
        <Text style={styles.cardText}>
          - Digital tools can help improve learning, productivity, and communication.
        </Text>
        <RenderPPT pptUri={pptUri} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Topic 2: Evaluating Information Online</Text>
        <Text style={styles.cardText}>
          - Always check the credibility of sources: Who is the author? What is their expertise?
        </Text>
        <Text style={styles.cardText}>
          - Look for evidence supporting claims, and avoid websites with too many ads or biased content.
        </Text>
        <Text style={styles.cardText}>
          - Cross-reference information across multiple reliable sources to confirm its accuracy.
        </Text>
        {videos.map((video, index) => (
          <DisplayVideo key={index} videoSource={video} />
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Topic 3: Online Safety and Security</Text>
        <Text style={styles.cardText}>
          - Protect personal information: Use strong passwords and avoid sharing sensitive details online.
        </Text>
        <Text style={styles.cardText}>
          - Be cautious of phishing emails and suspicious links. Always verify the source.
        </Text>
        <Text style={styles.cardText}>
          - Use two-factor authentication to secure your accounts and data.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
    color: '#000043',
  },
  card: {
    backgroundColor: COLORS.lightWhite,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export default Lessons;
