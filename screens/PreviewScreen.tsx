import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type PreviewScreenProps = {
    route: RouteProp<any, 'Preview'>;
    navigation: StackNavigationProp<any, 'Preview'>;
    favorites: number[];
    toggleFavorite: (id: number) => void;
    downloadWallpaper: (uri: string) => Promise<boolean>;
    setWallpaper: (uri: string, screen: 'HOME' | 'LOCK' | 'BOTH') => Promise<boolean>;
};

export default function PreviewScreen({
    route,
    navigation,
    favorites,
    toggleFavorite,
    downloadWallpaper,
    setWallpaper
}: PreviewScreenProps) {
    const { wallpaper } = route.params;

    const handleDownload = async () => {
        const success = await downloadWallpaper(wallpaper.image);
        if (success) {
            Alert.alert('Success', 'Wallpaper downloaded successfully!');
        } else {
            Alert.alert('Error', 'Failed to download wallpaper. Please try again.');
        }
    };

    const handleSetWallpaper = async () => {
        Alert.alert(
            'Set Wallpaper',
            'Choose where to set the wallpaper:',
            [
                {
                    text: 'Home Screen',
                    onPress: async () => {
                        const success = await setWallpaper(wallpaper.image, 'HOME');
                        if (success) {
                            Alert.alert('Success', 'Wallpaper set as home screen!');
                        } else {
                            Alert.alert('Error', 'Failed to set wallpaper. Please try again.');
                        }
                    },
                },
                {
                    text: 'Lock Screen',
                    onPress: async () => {
                        const success = await setWallpaper(wallpaper.image, 'LOCK');
                        if (success) {
                            Alert.alert('Success', 'Wallpaper set as lock screen!');
                        } else {
                            Alert.alert('Error', 'Failed to set wallpaper. Please try again.');
                        }
                    },
                },
                {
                    text: 'Both',
                    onPress: async () => {
                        const success = await setWallpaper(wallpaper.image, 'BOTH');
                        if (success) {
                            Alert.alert('Success', 'Wallpaper set on both screens!');
                        } else {
                            Alert.alert('Error', 'Failed to set wallpaper. Please try again.');
                        }
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.previewContainer}>
            <Image source={{ uri: wallpaper.image }} style={styles.previewImage} />
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.previewBottomNav}>
                <TouchableOpacity style={styles.previewButton} onPress={handleDownload}>
                    <Ionicons name="download-outline" size={24} color="white" />
                    <Text style={styles.previewButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.previewButton} onPress={handleSetWallpaper}>
                    <Ionicons name="home-outline" size={24} color="white" />
                    <Text style={styles.previewButtonText}>Set Wallpaper</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.previewButton} onPress={() => toggleFavorite(wallpaper.id)}>
                    <Ionicons
                        name={favorites.includes(wallpaper.id) ? "heart" : "heart-outline"}
                        size={24}
                        color={favorites.includes(wallpaper.id) ? "red" : "white"}
                    />
                    <Text style={styles.previewButtonText}>Favorite</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// ... (styles remain the same)
const styles = StyleSheet.create({
    previewContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    previewImage: {
        width: width,
        height: height,
        resizeMode: 'cover',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    previewBottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    previewButton: {
        alignItems: 'center',
    },
    previewButtonText: {
        color: 'white',
        marginTop: 4,
    },
});