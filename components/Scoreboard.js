
import React from 'react';
import {Text, View} from 'react-native';
import styles from '../style/style';
import { useFonts } from 'expo-font';


export default function Scoreboard({navigation}) {

    const [loaded] = useFonts({
        Ojuju: require('../font/Ojuju-VariableFont_wght.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.header}>
        <Text style={{fontFamily:'Ojuju', fontSize:28, padding:6}}>Scoreboard</Text>
        </View>
    )
}