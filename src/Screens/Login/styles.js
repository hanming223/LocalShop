
import {
    Dimensions,
} from 'react-native';

const deviceHeight = Dimensions.get("window").height;

export default {
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },

    safeArea: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    TextInputContainer: {
        height: 45,
        width: '100%', 
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 0.2
    },

    TextInputStyle: {
        height: 45, 
        width: '100%', 
        paddingLeft: 20, 
        paddingRight: 20
    },

    TouchableOpacityStyle: {
        width: '50%', 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    signInStyle: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold'
    }
};