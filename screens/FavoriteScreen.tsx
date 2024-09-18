import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

type FavoriteScreenProps = {
    navigation: StackNavigationProp<any, 'Favorites'>;
    favorites: number[];
    toggleFavorite: (id: number) => void;
};

const wallpapers = [
    { id: 720, title: 'Droid Beauty', image: 'https://picsum.photos/id/1015/400/800' },
    { id: 719, title: 'Droid Beauty', image: 'https://picsum.photos/id/1016/400/800' },
    { id: 718, title: 'Droid Beauty', image: 'https://picsum.photos/id/1018/400/800' },
    { id: 717, title: 'Droid Beauty', image: 'https://picsum.photos/id/1019/400/800' },
    { id: 716, title: 'Droid Beauty', image: 'https://picsum.photos/id/1020/400/800' },
    { id: 715, title: 'Droid Beauty', image: 'https://picsum.photos/id/1021/400/800' },
];

export default function FavoriteScreen({ navigation, favorites, toggleFavorite }: FavoriteScreenProps) {
    const favoriteWallpapers = wallpapers.filter(wallpaper => favorites.includes(wallpaper.id));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Text>
                </TouchableOpacity>
                <Text style={styles.title}>Favorites</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {favoriteWallpapers.map((wallpaper) => (
                    <TouchableOpacity
                        key={wallpaper.id}
                        style={styles.wallpaperItem}
                        onPress={() => navigation.navigate('Preview', { wallpaper })}
                    >
                        <Image source={{ uri: wallpaper.image }} style={styles.wallpaperImage} />
                        <View style={styles.wallpaperInfo}>
                            <Text style={styles.wallpaperId}>{wallpaper.id}</Text>
                            <Text style={styles.wallpaperTitle}>{wallpaper.title}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.heartIcon}
                            onPress={() => toggleFavorite(wallpaper.id)}
                        >
                            <Text>
                                <Ionicons name="heart" size={24} color="red" />
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    scrollView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 8,
    },
    wallpaperItem: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    wallpaperImage: {
        width: '100%',
        height: '100%',
    },
    wallpaperInfo: {
        position: 'absolute',
        bottom: 8,
        left: 8,
    },
    wallpaperId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    wallpaperTitle: {
        fontSize: 14,
        color: 'white',
    },
    heartIcon: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
});