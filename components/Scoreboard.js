import React from 'react';
import { Text, View } from 'react-native';
import styles from '../style/style';
import Header from './Header';
import Footer from './Footer';

export default function Scoreboard({ navigation }) {
    return (
        <>
            <Header />
            <View>
                <Text style={styles.textscores}>Total Points:</Text>
                
            </View>
            <Footer />
        </>
    );
}
