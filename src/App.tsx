import 'react-native-gesture-handler';
import React from 'react';

import { DataProvider } from './hooks';
import AppNavigation from './navigation/App';

export default function App() {
  return (
    <DataProvider>
      <AppNavigation />
    </DataProvider>
  );
}
