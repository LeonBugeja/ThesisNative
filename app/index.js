import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/index';
import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BurgerMenu from '../components/common/BurgerMenu';

const Home = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const viewProfile = () => {
        router.push('Profile');
    };

    const handleSelect = (option) => {
        setDropdownVisible(false);
        if (option === 'Quiz Test') {
            router.push('Quiz');
        } else if (option === 'Courses') {
            router.push('Courses');
        }
    };

    const goToCourse = () => {
        router.push('Courses');
    };

    const goToQuiz = () => {
        router.push('Quiz');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: 'Home',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity onPress={toggleDropdown}>
                            <Ionicons name="menu" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={viewProfile}>
                            <Ionicons name="person-circle" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <BurgerMenu isVisible={isDropdownVisible} toggleDropdown={toggleDropdown} onSelect={handleSelect} />
            <View style={styles.card}>
                <Image source={require('../assets/banner.png')} style={styles.banner} />
                <View style={styles.cardPadding}>
                    <Text style={[styles.welcomeTxt, { marginBottom: 20 }]}>Welcome to your Virtual Learning Environment</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.customButton} onPress={goToCourse}>
                            <Text style={styles.buttonText}>Continue Learning</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.customButton} onPress={goToQuiz}>
                            <Text style={styles.buttonText}>Take Test</Text>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../assets/sec-banner.jpg')} style={styles.secondaryBanner} />
                    <Text style={[styles.txt, { marginBottom: 20 }]}>Track Your Progress, Learn at Your Pace.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: COLORS.lightWhite,
      margin: 10,
      borderRadius: 10,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      flex: 1,
      maxHeight: '560',
    },
    cardPadding: {
        padding: 16,
    },
    banner: {
        width: '100%',
        height: 150,
        marginBottom: 15,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    secondaryBanner: {
        width: '100%',
        height: 150,
        marginTop: 25,
        marginBottom: 15,
        borderRadius: 8,
    },
    txt: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'light',
        color: '#000',
      },
    welcomeTxt: {
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

export default Home;