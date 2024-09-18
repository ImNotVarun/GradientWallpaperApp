import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PreviewScreen from './screens/PreviewScreen';
import GradientBuilderScreen from './screens/GradientBuilderScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    );
  };

  // Placeholder function for downloading wallpaper
  const downloadWallpaper = async (uri: string) => {
    console.log('Downloading wallpaper:', uri);
    Alert.alert('Download', 'Wallpaper download functionality will be implemented soon.');
    return true;
  };

  // Placeholder function for setting wallpaper
  const setWallpaper = async (uri: string, screen: 'HOME' | 'LOCK' | 'BOTH') => {
    console.log('Setting wallpaper:', uri, 'for screen:', screen);
    Alert.alert('Set Wallpaper', `Wallpaper setting functionality for ${screen} will be implemented soon.`);
    return true;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} favorites={favorites} toggleFavorite={toggleFavorite} />}
        </Stack.Screen>
        <Stack.Screen name="Preview">
          {props => (
            <PreviewScreen
              {...props}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              downloadWallpaper={downloadWallpaper}
              setWallpaper={setWallpaper}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="GradientBuilder" component={GradientBuilderScreen} />
        <Stack.Screen name="Favorites">
          {props => <FavoriteScreen {...props} favorites={favorites} toggleFavorite={toggleFavorite} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}