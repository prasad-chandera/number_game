import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
    const { width, height } = useWindowDimensions();

    const generateRandomBetween = (min, max, exclude) => {
        const rndNum = Math.floor(Math.random() * (max - min)) + min;

        if (rndNum === exclude) {
            return generateRandomBetween(min, max, exclude);
        } else {
            return rndNum;
        }
    };

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds?.length);
        }
    }, [currentGuess, onGameOver, userNumber]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    const nextGuessHandler = (direction) => {
        //direction => 'lower' or 'greater'
        console.log(direction, currentGuess, userNumber);

        if (
            (direction === "lower" && currentGuess < userNumber) ||
            (direction === "higher" && currentGuess > userNumber)
        ) {
            Alert.alert("This is a lie!");
            return;
        }
        if (direction === "lower") {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );
        setCurrentGuess(newRndNumber);
        setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
    };

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Text style={styles.instructionText}>Higher or Lower ?</Text>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <PrimaryButton
                            onPress={() => nextGuessHandler("lower")}
                        >
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color={"white"}
                            />
                        </PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton
                            onPress={() => nextGuessHandler("higher")}
                        >
                            <Ionicons name="md-add" size={24} color={"white"} />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    if (width > height) {
        content = (
            <>
                <Text style={styles.instructionText}>Higher or Lower ?</Text>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.button}>
                        <PrimaryButton
                            onPress={() => nextGuessHandler("lower")}
                        >
                            <Ionicons
                                name="md-remove"
                                size={24}
                                color={"white"}
                            />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.button}>
                        <PrimaryButton
                            onPress={() => nextGuessHandler("higher")}
                        >
                            <Ionicons name="md-add" size={24} color={"white"} />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={[styles.screen]}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds?.map((guessRound) => (
                    <Text key={guessRound}>{guessRound}</Text>
                ))} */}
                <FlatList
                    data={guessRounds}
                    // renderItem={(itemData) => <Text>{itemData?.item}</Text>}
                    renderItem={(itemData) => (
                        <GuessLogItem
                            roundNumber={guessRounds?.length - itemData?.index}
                            guess={itemData?.item}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: "center",
        marginTop: 30,
    },
    instructionText: {
        fontSize: 24,
        color: "yellow",
    },
    buttons: {
        marginTop: 12,
        flexDirection: "row",
    },
    button: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
        paddingRight: 20,
    },
    buttonsContainerWide: {
        flexDirection: "row",
        alignItems: "center",
    },
});
