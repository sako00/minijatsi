import { Pressable, Text, View } from 'react-native';
import styles from '../style/style';
import { useEffect, useState } from 'react';
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
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


let board = [];

export default Gameboard = ({ navigation, route }) => {

  const [playerName, setPlayerName] = useState('');
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [showIcon, setShowIcon] = useState(true); // State to manage icon visibility
  const [totalPoints, setTotalPoints] = useState(0);

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


  //this useEffect will be used to reading scoreboards from the local storage

  //this useEffect will be handling the gameflow and checking the game status that it dont stop too early
  //and also checking the game status that it dont stop too early
  //trigger the game end status when the game is over


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
    return selectedDices[i] ? 'black' : 'steelblue';
  }

  function getDicePointsColor(i) {

    return (selectedDicePoints[i] && !gameEndStatus)
      ? 'black' : 'steelblue';
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
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal]
    selectedPoints[i] = true;

    let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
    points[i] = nbrOfDices * (i + 1);
    setDicePointsTotal(points);
    setSelectedDicePoints(selectedPoints);
    return points[i];
  }
  const calculateTotalPoints = () => {
    let totalPoints = 0;
    dicePointsTotal.forEach(points => {
      totalPoints += points;
    })
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

  // Function to check if the game has ended
  const checkGameEnd = () => {
    // Check if all categories have been selected or if the player decides to end the game
    if (selectedCategories.length === MAX_SPOT || playerDecidesToEnd) {
      setGameEndStatus(true);
      // Display game end message or navigate to end screen
    }
  }

  // Calculate the points needed for the bonus
  const pointsNeededForBonus = BONUS_POINTS_LIMIT - calculateTotalPoints();

  // Define a variable to hold the bonus message
  let bonusMessage = '';

  // Check if the player is eligible for the bonus
  if (pointsNeededForBonus > 0) {
    bonusMessage = `You are ${pointsNeededForBonus} points away from bonus.`;
  }



  return (
    <>
      <Header />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {showIcon && (
          <MaterialCommunityIcons name="dice-multiple" size={80} color="#8c1ae3fe" />)}
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
        <Pressable onPress={() => throwDices()}>
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
          <Text>{gameEndStatus ? 'Game Over!' : ''}</Text>

        </Pressable>


        <Text>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  )
}