import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';

interface CustomSafeAreaViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const CustomSafeAreaView: React.FC<CustomSafeAreaViewProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.safeArea, style]}>
           <View style={[styles.safeArea, style]}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // You can customize the background color
    },
});

export default CustomSafeAreaView;