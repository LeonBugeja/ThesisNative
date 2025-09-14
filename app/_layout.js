import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { showNotificationOnAppOpen } from '../utils/notifications';

const Layout = () => {
  useEffect(() => {
    showNotificationOnAppOpen();
  }, []);

  return <Stack />;
};

export default Layout;
