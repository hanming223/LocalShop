
import {
    Dimensions,
} from 'react-native';

const deviceHeight = Dimensions.get("window").height;

export default {
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },

    TextInputContainer: {
        height: 45,
        width: '90%', 
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 0.1,
        marginTop: 10,
        shadowColor: 'gray',
        shadowRadius: 5,
        shadowOpacity: 0.3
    },

    TextInputStyle: {
        height: 45, 
        width: '100%', 
        paddingLeft: 20, 
        paddingRight: 20
    },

    signInStyle: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold'
    }
    
};