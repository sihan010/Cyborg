import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { DefaultTheme,Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
  const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: '#212F3D',
      accent: '#0B5345',
    },
    fonts:{
      ...DefaultTheme.fonts,
      regular:"OverlockR",
      medium:"OverlockM",
      light:"OverlockL"
    }
  };
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
