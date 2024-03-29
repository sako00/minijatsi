import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import styles from '../style/style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';

import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS
} from '../constants/Game';

export default Home = ({ navigation }) => {

    

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <>
            <Header />
            <View>
                <MaterialCommunityIcons
                style={styles.infologo}
                    name='information'
                    size={55}
                    color='#d7b3d0'
                />
                {!hasPlayerName ?
                    <>
                        <Text style={{textAlign:'center'}}>For scoreboard enter your name</Text>
                        <TextInput style={styles.input}
                            onChangeText={setPlayerName}
                            autoFocus={true} />
                        <Pressable
                        style={{alignItems:'center'}}
                            onPress={() => handlePlayerName(playerName)}>
                            <Text style={styles.button} >OK</Text>

                        </Pressable>
                    </>

                    :
                    <>
                        <Text style={styles.rulesheader}>Rules of game</Text>
                        <Text multiline='true' style={styles.textline}>
                            THE GAME: Upper section of the classic Yahtzee
                            dice game. You have {NBR_OF_DICES} dices and
                            for the every dice you have {NBR_OF_THROWS}
                            throws. After each throw you can keep dices in
                            order to get same dice spot counts as many as
                            possible. In the end of the turn you must select
                            your points from {MIN_SPOT} to {MAX_SPOT}.
                            Game ends when all points have been selected.
                            The order for selecting those is free.</Text>
                        <Text multiline='true' style={styles.textline}>POINTS: After each turn game calculates the sum
                            for the dices you selected. Only the dices having
                            the same spot count are calculated. Inside the
                            game you can not select same points from
                            {MIN_SPOT} to {MAX_SPOT} again.</Text>
                        <Text multiline='true' style={styles.textline}>GOAL: To get points as much as possible.
                            {BONUS_POINTS_LIMIT} points is the limit of
                            getting bonus which gives you {BONUS_POINTS}
                            points more.</Text>
                        <Text style={styles.textline}>Good luck, {playerName}</Text>
                        <Pressable style={{alignItems:'center'}}
                            onPress={() => navigation.navigate('Gameboard', { player: playerName })}>
                            <Text style={styles.button}>PLAY</Text>
                        </Pressable>

                    </>
                }
            </View>
            <Footer />
        </>
    )
}
