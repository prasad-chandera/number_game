import { useState } from "react";

import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./Theme/colors";

import { StatusBar } from "expo-status-bar";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    const pickedNumberHandler = (pickedNumber) => {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    };
    const gameOverHandler = (numberOfRounds) => {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    };
    const startNewGameHandler = () => {
        setUserNumber(null);
        setGuessRounds(0);
    };

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

    if (userNumber) {
        screen = (
            <GameScreen
                userNumber={userNumber}
                onGameOver={(numberOfRounds) => gameOverHandler(numberOfRounds)}
            />
        );
    }
    if (gameIsOver && userNumber) {
        screen = (
            <GameOverScreen
                userNumber={userNumber}
                roundsNumber={guessRounds}
                onStartNewGame={startNewGameHandler}
            />
        );
    }
    return (
        <>
            <StatusBar style="light" />
            <LinearGradient
                colors={[Colors.primary700, Colors.accent500]}
                style={styles.rootScreen}
            >
                <ImageBackground
                    source={require("./assets/images/background.png")}
                    resizeMode="cover"
                    style={styles.rootScreen}
                    imageStyle={styles.backgroundImage}
                >
                    <SafeAreaView style={styles.rootScreen}>
                        {screen}
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
