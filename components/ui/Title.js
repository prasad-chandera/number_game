import { Text, StyleSheet } from "react-native";
import Colors from "../../Theme/colors";
const Title = ({ children }) => {
    return <Text style={styles.title}>{children} </Text>;
};

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
        maxWidth: "80%",
        width: 300,
    },
});
