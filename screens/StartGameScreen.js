import {
    TextInput,
    View,
    StyleSheet,
    Alert,
    Text,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";

import Colors from "../Theme/colors";

export default StartGameScreen = ({ onPickNumber }) => {
    const { width, height } = useWindowDimensions();

    const [enteredNumber, setEnteredNumber] = useState("");
    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText);
    };

    const resetInputHandler = () => {
        setEnteredNumber("");
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number!",
                "Number has to be between 1 and 99.",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        } else {
            onPickNumber(chosenNumber);
        }
    };

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View
                    style={[
                        styles.rootContainer,
                        { marginTop: height < 380 ? 30 : 100 },
                    ]}
                >
                    <View>
                        <Title>Guess My Number</Title>
                    </View>
                    <Card>
                        <Text style={styles.instructionText}>
                            Enter a number
                        </Text>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>
                                    Reset
                                </PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>
                                    Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: "center",
    },

    instructionText: {
        fontSize: 24,
        color: "yellow",
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
    },
});
