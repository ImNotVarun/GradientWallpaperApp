import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ColorPicker from 'react-native-wheel-color-picker';

type GradientDirection = {
    label: string;
    value: string;
    icon: keyof typeof Ionicons.glyphMap;  // Ensures icon is a valid Ionicon name
};

export default function GradientBuilderScreen({ navigation }) {
    const [color1, setColor1] = useState('#FF0000');
    const [color2, setColor2] = useState('#0000FF');
    const [direction, setDirection] = useState('to right');
    const [activeColor, setActiveColor] = useState<'color1' | 'color2'>('color1');

    const gradientDirections: GradientDirection[] = [
        { label: 'Horizontal', value: 'to right', icon: 'arrow-forward' },
        { label: 'Vertical', value: 'to bottom', icon: 'arrow-down' },
        { label: 'Diagonal', value: 'to bottom right', icon: 'arrow-forward' },
    ];

    const getGradientColors = () => {
        return [color1, color2];
    };

    const onColorChange = (color: string) => {
        if (activeColor === 'color1') {
            setColor1(color);
        } else {
            setColor2(color);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text><Ionicons name="arrow-back" size={24} color="white" /></Text>
                </TouchableOpacity>
                <Text style={styles.title}>Gradient Builder</Text>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.previewContainer}>
                    <LinearGradient
                        colors={getGradientColors()}
                        start={{ x: 0, y: 0 }}
                        end={direction === 'to right' ? { x: 1, y: 0 } : direction === 'to bottom' ? { x: 0, y: 1 } : { x: 1, y: 1 }}
                        style={styles.gradientPreview}
                    />
                </View>

                <View style={styles.colorPickerContainer}>
                    <ColorPicker
                        color={activeColor === 'color1' ? color1 : color2}
                        onColorChange={onColorChange}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={true}
                        row={false}
                    />
                    <View style={styles.colorSwitcher}>
                        <TouchableOpacity
                            style={[styles.colorButton, activeColor === 'color1' && styles.activeColorButton]}
                            onPress={() => setActiveColor('color1')}
                        >
                            <View style={[styles.colorPreview, { backgroundColor: color1 }]} />
                            <Text style={styles.colorButtonText}>Color 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.colorButton, activeColor === 'color2' && styles.activeColorButton]}
                            onPress={() => setActiveColor('color2')}
                        >
                            <View style={[styles.colorPreview, { backgroundColor: color2 }]} />
                            <Text style={styles.colorButtonText}>Color 2</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.directionContainer}>
                    <Text style={styles.sectionTitle}>Gradient Direction</Text>
                    <View style={styles.directionButtons}>
                        {gradientDirections.map((dir) => (
                            <TouchableOpacity
                                key={dir.value}
                                style={[styles.directionButton, direction === dir.value && styles.selectedDirection]}
                                onPress={() => setDirection(dir.value)}
                            >
                                <Text><Ionicons name={dir.icon} size={24} color={direction === dir.value ? '#BA55D3' : 'white'} /></Text>
                                <Text style={[styles.directionText, direction === dir.value && styles.selectedDirectionText]}>{dir.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
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
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    saveButton: {
        backgroundColor: '#BA55D3',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    previewContainer: {
        aspectRatio: 16 / 9,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
    },
    gradientPreview: {
        flex: 1,
    },
    colorPickerContainer: {
        marginBottom: 20,
    },
    colorSwitcher: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    colorButton: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeColorButton: {
        borderColor: '#BA55D3',
    },
    colorPreview: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 8,
    },
    colorButtonText: {
        color: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12,
    },
    directionContainer: {
        marginBottom: 20,
    },
    directionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    directionButton: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    selectedDirection: {
        backgroundColor: '#444',
    },
    directionText: {
        color: 'white',
        marginTop: 4,
    },
    selectedDirectionText: {
        color: '#BA55D3',
    },
});
