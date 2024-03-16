import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';
import Header from './Header';
import Footer from './Footer';

export default function Scoreboard({ navigation,route }) {
    // Retrieve player's name and total points from navigation params
    const playerName = route.params?.playerName;
    const totalPoints = route.params?.totalPoints;

    return (
        <>
            <Header />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textscores}>Player: {playerName}</Text>
                <Text style={styles.textscores}>Total Points: {totalPoints}</Text>
            </View>
            <Footer />
        </>
    );
}