import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Dropdown = ({ isVisible, toggleDropdown, onSelect }) => {
    if (!isVisible) return null;

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelect('Courses')}>
                <Ionicons name="grid" size={18} color="black" />
                <Text style={styles.dropdownText}>Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelect('Quiz Test')}>
                <Ionicons name="clipboard" size={18} color="black" />
                <Text style={styles.dropdownText}>Quiz Test</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        right: 5,
        backgroundColor: 'white',
        paddingVertical: 0,
        borderRadius: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 1000,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,
    },
});

export default Dropdown;
