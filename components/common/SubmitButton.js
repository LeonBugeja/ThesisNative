import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubmitButton = ({ onSubmit, isSubmitted }) => {
  return isSubmitted ? (
    <TouchableOpacity style={styles.submitButtonDisabled}>
      <Text style={styles.submitTextDisabled}>Submitted</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitText}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#00c954',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#d4d4d4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitTextDisabled: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubmitButton;