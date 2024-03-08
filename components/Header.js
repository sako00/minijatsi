import { Text, View } from 'react-native';
import React from 'react';
import styles from '../style/style';
import { useFonts } from 'expo-font';

export default function Header() {

    const [loaded] = useFonts({
        Ojuju: require('../font/Ojuju-VariableFont_wght.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.header}>
            <Text style={{fontFamily:'Ojuju', fontSize:28, padding:6}}>Mini-Yahtzee</Text>
        </View>
    );
}
