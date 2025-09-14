import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { COLORS } from '../constants/index';
import { useRouter } from 'expo-router';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userState) => {
      setUser(userState);
      if (userState) {
        await fetchScore(userState.uid);
      } else {
        setScore(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchScore = async (userId) => {
    try {
      const scoreRef = doc(db, 'quizScores', userId);
      const scoreDoc = await getDoc(scoreRef);

      if (scoreDoc.exists()) {
        setScore(scoreDoc.data().score);
      } else {
        setScore(null);
      }
    } catch (error) {
      console.error('Error fetching score:', error);
      Alert.alert('Error', 'There was an issue fetching your score.');
    }
  };

  const goToSignup = () => {
    router.push('Signup');
  };

  const goToLogin = () => {
    router.push('Login');
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconTextContainer}>
        <Ionicons name="person-circle-outline" size={80} color="black" />
        {user ? (
          <Text style={styles.text}>Welcome, {user.displayName}</Text>
        ) : (
          <Text style={styles.text}>You are not signed in</Text>
        )}
      </View>

      {user && score !== null && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Course - Digital Literacy</Text>
          <Text></Text>
          <Text style={styles.scoreText}>Your Test Score: {score}%</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {user ? (
          <TouchableOpacity style={styles.customButton} onPress={() => auth.signOut()}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.customButton} onPress={goToSignup}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.customButton} onPress={goToLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightWhite,
    padding: 16,
    margin: 10,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
  },
  scoreContainer: {
    width: 240,
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#222730',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },  
});

export default Profile;