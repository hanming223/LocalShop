
import {
    Dimensions,
} from 'react-native';

const deviceHeight = Dimensions.get("window").height;

export default {

    TextInputContainer: {
        height: 45,
        width: '100%', 
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: 'gray',
        shadowRadius: 5,
        shadowOpacity: 0.3
    },

    TextInputStyle: {
        height: 45,
        marginLeft: 10,
        flex: 1
    },

    signInStyle: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold'
    },

    iconStyle: {
        width: 15, 
        height: 17, 
        marginLeft: 10
    }
};