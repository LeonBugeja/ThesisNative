import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const showNotificationOnAppOpen = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    console.log('Notification permissions status:', status);

    if (status !== 'granted') {
      Alert.alert("Permission Required", "Enable notifications to receive alerts.");
      return;
    }

    await Notifications.presentNotificationAsync({
      title: "Welcome Back!",
      body: "Dont forget to take the test!",
    });
  } catch (error) {
    console.error("Error showing notification:", error);
  }
};
