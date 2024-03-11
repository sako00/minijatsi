import {Text, View} from 'react-native';
import styles from '../style/style';
import { useFonts } from 'expo-font';


export default function Footer() {

    const [loaded] = useFonts({
        Ojuju: require('../font/Ojuju-VariableFont_wght.ttf')
    });

    if (!loaded) {
        return null;
    }
    
    return (
        <View style={styles.footer}>
        <Text style={styles.author}>Sanna</Text>
        </View>
    )
}