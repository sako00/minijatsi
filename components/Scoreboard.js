// Scoreboard.js
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';

export default function Scoreboard({ navigation }) {
    return (
        <View style={styles.header}>
            <Text style={{ fontFamily: 'Ojuju', fontSize: 28, padding: 6 }}>Scoreboard</Text>
            <Text></Text>
         
        </View>
        
        
    );
}
