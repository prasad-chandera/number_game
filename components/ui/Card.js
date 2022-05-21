import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../Theme/colors";

const Card = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 25,
        backgroundColor: Colors.primary700,
        borderRadius: 8,
        //Android box-shadow
        elevation: 4,

        //ios box-shadow
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});
