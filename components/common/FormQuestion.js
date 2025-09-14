import React from 'react';
import { COLORS } from '../../constants/index';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FormQuestion = ({questionNumber, question, options, selectedOption, correctAnswer, isSubmitted, onSelect}) => {
    const getOptionStyle = (option) => {
        if (isSubmitted) {
            if (option === selectedOption && option === correctAnswer) {
                return styles.correctOption;
            }
            if (option === selectedOption && option !== correctAnswer) {
                return styles.incorrectOption;
            }

            return styles.optionButton;
        }

        if (option === selectedOption) {
            return styles.selectedOption;
        }

        return styles.optionButton;
    };
  
    return (
      <View style={styles.card}>
        <Text style={styles.questionNum}>Question {questionNumber}</Text>
        <Text style={styles.questionText}>{question}</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={getOptionStyle(option)}
            onPress={() => onSelect(option)}
            disabled={isSubmitted}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
};
  

const styles = StyleSheet.create({
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
    questionNum: {
        fontSize: 12,
        marginBottom: 10,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
    },
    optionButton: {
        backgroundColor: '#e6e6e6',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    selectedOption: {
        backgroundColor: '#ababab',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    correctOption: {
        backgroundColor: '#00c853',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    incorrectOption: {
        backgroundColor: '#ff2121',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    optionText: {
        fontSize: 16,
    },
});

export default FormQuestion;
