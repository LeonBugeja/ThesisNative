import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, ScrollView, Text, Button, TouchableOpacity } from 'react-native';
import QuestionWithOptions from '../components/common/FormQuestion';
import SubmitButton from '../components/common/SubmitButton';
import Modal from '../components/common/Modal';
import {Stack, router} from 'expo-router';
import { COLORS } from '../constants/index';
import { auth } from '../utils/firebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState(null);
  
  const goToLogin = () => {
    router.push('Login');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userState) => {
      setUser(userState);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <View style={styles.card}>
        <View style={styles.centerContainer}>
          <Ionicons name="warning" size={24} color="black" />
          <Text style={styles.centerText}>You are not currently Logged in</Text>
          <Text style={styles.centerText}>In order to take this Test, you must be logged in!</Text>
          <TouchableOpacity>
            <Button title="Login" onPress={goToLogin} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const questions = [
    {
      id: 1,
      question: 'What is Digital Literacy?',
      options: ['The ability to play video games', 'The ability to effectively use digital tools and critically assess information', 'The ability to use a mobile phone only for calling', 'The ability to read and write digital text files only'],
      correctAnswer: 'The ability to effectively use digital tools and critically assess information',
    },
    {
      id: 2,
      question: 'Which of the following is an example of a digital skill?',
      options: ['Speaking multiple languages fluently', 'Using a search engine to find information', 'Making physical documents', 'Writing letters in cursive'],
      correctAnswer: 'Using a search engine to find information',
    },
    {
      id: 3,
      question: 'What is online safety?',
      options: ['Playing games online', 'Protecting personal information and avoiding cyber threats', 'Using social media for entertainment', 'Sending emails to friends'],
      correctAnswer: 'Protecting personal information and avoiding cyber threats',
    },
    {
      id: 4,
      question: 'Which of the following is a good practice to maintain online privacy?',
      options: ['Sharing passwords with others', 'Using the same password for all accounts', 'Adjusting privacy settings on social media', 'Posting personal information online'],
      correctAnswer: 'Adjusting privacy settings on social media',
    },
    {
      id: 5,
      question: 'What does the term "cybersecurity" refer to?',
      options: ['Protecting digital systems from unauthorized access or attacks', 'Sharing personal data freely', 'Watching movies online', 'Posting personal information on blogs'],
      correctAnswer: 'Protecting digital systems from unauthorized access or attacks',
    },
    {
      id: 6,
      question: 'Which of the following is NOT a part of digital literacy?',
      options: ['Understanding how to search for information online', 'Recognizing fake news and misinformation', 'Using digital tools to communicate effectively', 'Writing a traditional letter'],
      correctAnswer: 'Writing a traditional letter',
    },
    {
      id: 7,
      question: 'What is phishing?',
      options: ['A fishing technique used in real life', 'A type of digital artwork', 'A type of online scam where attackers impersonate legitimate entities to steal information', 'A technique to improve online game scores'],
      correctAnswer: 'A type of online scam where attackers impersonate legitimate entities to steal information',
    },
    {
      id: 8,
      question: 'Why is it important to use strong passwords?',
      options: ['To make the computer run faster', 'To protect your online accounts from unauthorized access', 'To make your email look professional', 'To make websites load quicker'],
      correctAnswer: 'To protect your online accounts from unauthorized access',
    },
    {
      id: 9,
      question: 'What is an example of a digital tool that supports digital literacy?',
      options: ['A smartphone used for calling', 'A pen and notebook', 'A digital photo album', 'A word processing software'],
      correctAnswer: 'A word processing software',
    },
    {
      id: 10,
      question: 'What is meant by the term "digital footprint"?',
      options: ['The physical trail left behind when you walk with a digital device', 'The record of your activities and information shared online', 'The amount of space a website takes on your device', 'The digital clock on your phone'],
      correctAnswer: 'The record of your activities and information shared online',
    },
  ];

  const handleSelect = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
    setSubmitted(true);
    setShowResults(true);

    await saveScoreToFirestore(percentage);
  };

  const saveScoreToFirestore = async (score) => {
    try {
      if (user) {
        const scoreDocRef = doc(collection(db, 'quizScores'), user.uid);
        await setDoc(scoreDocRef, {
          score,
          timestamp: new Date(),
        });
        console.log('Score saved to Firestore');
      }
    } catch (error) {
      console.error('Error saving score to Firestore: ', error);
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {questions.map((q) => (
          <QuestionWithOptions
            key={q.id}
            questionNumber={q.id}
            question={q.question}
            options={q.options}
            selectedOption={answers[q.id]}
            correctAnswer={q.correctAnswer}
            isSubmitted={submitted}
            onSelect={(option) => handleSelect(q.id, option)}
          />
        ))}
        <SubmitButton onSubmit={handleSubmit} isSubmitted={submitted} />
        <Modal
          isVisible={showResults}
          score={score}
          onClose={handleCloseResults}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    padding: 20,
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
    margin: 10,
  },
  centerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Quiz;
