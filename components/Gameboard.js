import { Pressable, Text, View } from 'react-native';
import styles from '../style/style';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useFonts } from 'expo-font';

import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS
} from '../constants/Game';
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

let board = [];

export default Gameboard = ({ navigation, route }) => {

  const [loaded] = useFonts({
    Ojuju: require('../font/Ojuju-VariableFont_wght.ttf')
  });

  if (!loaded) {
    return null;
  }

  const [playerName, setPlayerName] = useState('');
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [showIcon, setShowIcon] = useState(true); // State to manage icon visibility
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [bonusAwarded, setBonusAwarded] = useState(false);
  const [allPointsSelected, setAllPointsSelected] = useState(false);

  const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));

  const [diceSpots, setDiceSpots] =
    useState(new Array(NBR_OF_DICES).fill(0));

  const [selectedDicePoints, setSelectedDicePoints] =
    useState(new Array(MAX_SPOT).fill(false));

  const [dicePointsTotal, setDicePointsTotal] =
    useState(new Array(MAX_SPOT).fill(0));




  //this is one way to create the player name and set it to the state
  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }

  }, []);

  useEffect(() => {
    checkGameEnd();
  }, [selectedCategories]);

  useEffect(() => {
    checkAllPointsSelected();
  }, [selectedDicePoints]);

  // Function to check if the game has ended
  const checkGameEnd = () => {
    if (selectedCategories.length === MAX_SPOT && nbrOfThrowsLeft === 0) {
      setGameEndStatus(true);
    }
  }

  // Function to check if all points 1 through 6 have been selected
  const checkAllPointsSelected = () => {
    const allPointsSelected = selectedDicePoints.every(point => point);
    setAllPointsSelected(allPointsSelected);
    if (allPointsSelected) {
      setGameEndStatus(true);
    }
  }

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={'dice' + dice}>
        <Pressable
          onPress={() => selectDice(dice)}
          key={'dice' + dice}>
          <MaterialCommunityIcons
            name={board[dice]}
            key={"dice" + dice}
            size={50}
            color={getDiceColor(dice)}
          >
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={'buttonsRow' + diceButton}>
        <Pressable
          key={'buttonsRow' + diceButton}
          //onpress will be here selecting the points
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={'numeric-' + (diceButton + 1) + '-circle'}
            key={'buttonRow' + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          //pressable here for getting the color of icon
          >

          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );

  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {

    pointsRow.push(
      <Col key={'pointsRow' + spot}>
        <Text key={'pointsRow' + spot}>
          {getSpotTotal(spot)}
        </Text>
      </Col>
    );
  }


  //call the function for calculating points inside text component 
  function getDiceColor(i) {
    return selectedDices[i] ? 'black' : '#8e3b7e';
  }

  function getDicePointsColor(i) {

    return (selectedDicePoints[i] && !gameEndStatus)
      ? 'black' : 'skyblue';
  }



  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);

    }
    else {
      setStatus('you have to throw the dices first');
    }

  }
  const throwDices = () => {
    setShowIcon(false);
    if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
      setStatus('Select your points before next row');
      return 1;

    }
    else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
      setGameEndStatus(false);
      diceSpots.fill(0);
      dicePointsTotal.fill(0);
    }


    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    setDiceSpots(spots);
    setStatus('Select and throw dices again');

  }


  function getSpotTotal(i) {
    return dicePointsTotal[i];

  }

  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selected = [...selectedDices];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal]
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;

        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        return points[i];
      }
      else {
        setStatus('You have already selected points for ' + (i + 1));
      }
    }
    else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points");
    }
  }

  const calculateTotalPoints = () => {
    let totalPoints = 0;
    dicePointsTotal.forEach(points => {
      totalPoints += points;
    });

    const pointsInCategories1To6 = [1, 2, 3, 4, 5, 6].reduce((total, category) => {
      return total + calculateCategoryPoints(category);
    }, 0);

    let bonusPoints = 0;
    if (pointsInCategories1To6 >= BONUS_POINTS_LIMIT && !bonusAwarded) {
      bonusPoints = BONUS_POINTS;
      totalPoints += bonusPoints; // Adding bonus points to total
      setStatus('Congratulations! Bonus points (50) added.'); // Update status to notify user
      setBonusAwarded(true); // Mark bonus as awarded
    }

    return totalPoints;
  }



  // Function to handle selecting points
  const selectPointsCategory = (category) => {
    // Check if the category has already been selected
    if (!selectedCategories.includes(category)) {
      // Add the category to the list of selected categories
      setSelectedCategories([...selectedCategories, category]);

      // Calculate the points for the selected category and update the total points
      const categoryPoints = calculateCategoryPoints(category);
      setTotalPoints(totalPoints + categoryPoints);

      // Check for bonus points if applicable
      if (totalPoints + categoryPoints >= BONUS_POINTS_LIMIT && !bonusAwarded) {
        setTotalPoints(totalPoints => totalPoints + BONUS_POINTS);
        setBonusAwarded(true);
      }
    }
  }

  // Function to calculate points for a selected category
  const calculateCategoryPoints = (category) => {
    let categoryPoints = 0;
    // Calculate points based on the number of spots on the dice
    // For example, if the category is 3, calculate the sum of all dice with 3 spots
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (diceSpots[i] === category) {
        categoryPoints += category;
      }
    }
    return categoryPoints;
  }



  // Calculate the points needed for the bonus
  const pointsNeededForBonus = BONUS_POINTS_LIMIT - calculateTotalPoints();

  // Define a variable to hold the bonus message
  let bonusMessage = '';

  // Check if the player is eligible for the bonus
  if (pointsNeededForBonus > 0 && !bonusAwarded) {
    bonusMessage = `You are ${pointsNeededForBonus} points away from bonus.`;
  } else if (bonusAwarded) {
    bonusMessage = 'Bonus points (50) awarded!';
  }







  return (
    <>
      <Header />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {showIcon && (
          <MaterialCommunityIcons name="dice-multiple" size={80} color="#d7b3d0" />)}
        <Container fluid>
          <Row>{dicesRow}</Row>
        </Container>
        <Text>Throws left:{nbrOfThrowsLeft}</Text>
        <Text>{status}</Text>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        <Pressable style={{ alignItems: 'center' }} onPress={() => throwDices()}>
          <Text style={styles.button}>Throw Dices</Text>
          <Text>Total: {calculateTotalPoints()}</Text>
          <Text>{bonusMessage}</Text>
          <Container fluid>
            <Row>
              {[1, 2, 3, 4, 5, 6].map(category => (
                <Col key={`category-${category}`}>
                  <Pressable onPress={() => selectPointsCategory(category)}>
                    <Text>{category}</Text>
                  </Pressable>
                </Col>
              ))}
            </Row>
          </Container>
          {gameEndStatus && allPointsSelected && (
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
              Game Over - All points selected!
            </Text>
          )}
        </Pressable>
       
      </View>
 

      <Footer />
    </>
  )
}