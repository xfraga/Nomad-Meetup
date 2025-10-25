import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native';

// Define theme colors following React Native best practices
const AppTheme = {
  dark: false,
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    card: '#F2F2F7',
    text: '#000000',
    border: '#C6C6C8',
    notification: '#FF3B30',
  },
};

type AppState = 'loading' | 'ready' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('loading');

  useEffect(() => {
    // Initialize app dependencies
    const initializeApp = async () => {
      try {
        // Add initialization logic here:
        // - Load fonts
        // - Initialize services
        // - Setup analytics
        // - Check auth state
        
        // Simulate initialization delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAppState('ready');
      } catch (error) {
        console.error('App initialization error:', error);
        setAppState('error');
      }
    };

    initializeApp();
  }, []);

  // Splash/Loading Screen
  if (appState === 'loading') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.splashContainer}>
          <StatusBar style="auto" />
          <View style={styles.splashContent}>
            <Text style={styles.splashTitle}>Nomad Meetup</Text>
            <ActivityIndicator 
              size="large" 
              color={AppTheme.colors.primary} 
              style={styles.loader}
            />
            <Text style={styles.splashSubtitle}>Loading...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Error State
  if (appState === 'error') {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.errorContainer}>
          <StatusBar style="auto" />
          <View style={styles.errorContent}>
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorMessage}>
              Something went wrong. Please restart the app.
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Main App
  return (
    <SafeAreaProvider>
      <ThemeProvider value={AppTheme}>
        <NavigationContainer theme={AppTheme}>
          <StatusBar style="auto" />
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.welcomeText}>Welcome to Nomad Meetup</Text>
              <Text style={styles.descriptionText}>
                Your navigation and screens will be integrated here.
              </Text>
            </View>
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 12,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },

  // Error Screen Styles
  errorContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Main App Styles
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default App;