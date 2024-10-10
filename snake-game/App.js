import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './components/Board';

export default function App() {
    return (
        <View style={styles.container}>
            <Board />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
