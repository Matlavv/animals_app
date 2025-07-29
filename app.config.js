import 'dotenv/config';

export default {
  expo: {
    name: 'animals_app',
    slug: 'animals_app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.gerbizz.animals_app',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-font',
        {
          fonts: ['./assets/fonts/RobotoMono.ttf'],
        },
      ],
    ],
    extra: {
      firebaseConfig: {
        apiKey: 'AIzaSyCS048UK1tiUPxyrq0BCRcNJSxgmVfHSN8',
        authDomain: 'animalzz-35e64.firebaseapp.com',
        projectId: 'animalzz-35e64',
        storageBucket: 'animalzz-35e64.appspot.com',
        messagingSenderId: '197197222649',
        appId: '1:197197222649:web:e3c103fda9068e34c00828',
        measurementId: 'G-DGDQVHHZGW',
      },
      eas: {
        projectId: '1e91337a-2b06-4fee-ae91-e0a6d367ad70',
      },
    },
  },
};
